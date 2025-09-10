import { processCsvFile } from "#services/statement-extraction/csv-to-statement.js";
import { processXmlFile } from "#services/statement-extraction/xml-to-statement.js";
import { validateStatements } from "#services/statement-processor.js";
import cors from "cors";
import express from "express";

const app = express();
const port = process.env.PORT;

app.use(cors({}));

app.get("/validate/:fileType", async (req, res) => {
  switch (req.params.fileType) {
    case "csv":
      res.status(200).send(validateStatements(await processCsvFile(`src/assets/records.csv`)));
      break;

    case "xml":
      res.status(200).send(validateStatements(await processXmlFile(`src/assets/records.xml`)));
      break;

    default:
      res.status(400).send({ error: `Invalid file type '${req.params.fileType}'. Please use 'csv' or 'xml'` });
      break;
  }
});

app.listen(port, () => {
  console.info(`App listening on port ${port ?? "NOT SET"} with CORS allowed for all origins`);
});
