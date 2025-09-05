import { processFile } from "#services/csv-to-statement.js";
import express from "express";

const app = express();
const port = "3000";

app.get("/validate/:fileType", async (req, res) => {
  const result = processFile();
  console.log(result);
  res.status(200).send({
    fileType: req.params.fileType,
    result: "Hello World",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
