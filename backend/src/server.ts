import { processCsvFile } from "#services/csv-to-statement.js";
import { processXmlFile } from "#services/xml-to-statement.js";
import express from "express";

const app = express();
const port = "3000";

app.get("/validate/:fileType", (req, res) => {
  if (req.params.fileType === "xml") {
    const result = processXmlFile();
    console.log(result);
    res.status(200).send({
      fileType: req.params.fileType,
      result: "Hello World",
    });
  }
  if (req.params.fileType === "csv") {
    const result = processCsvFile();
    console.log(result);
    res.status(200).send({
      fileType: req.params.fileType,
      result: "Hello World",
    });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
