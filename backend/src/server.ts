import { processCsvFile } from "#services/csv-to-statement.js";
import { validateStatements } from "#services/statement-processor.js";
import { processXmlFile } from "#services/xml-to-statement.js";
import cors from "cors";
import express from "express";

const app = express();
const port = "3000";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors({}));

app.get("/validate/:fileType", async (req, res) => {
  if (req.params.fileType === "xml") {
    const result = validateStatements(await processXmlFile());
    res.status(200).send({
      fileType: req.params.fileType,
      result,
    });
    return;
  }
  if (req.params.fileType === "csv") {
    const result = validateStatements(await processCsvFile());
    res.status(200).send({
      fileType: req.params.fileType,
      result,
    });
    return;
  }
  res.status(400).send(`Invalid file type '${req.params.fileType}'. Please use 'csv' or 'xml'`);
});

app.listen(port, () => {
  console.info(`App listening on port ${port} with CORS allowed for all origins`);
});
