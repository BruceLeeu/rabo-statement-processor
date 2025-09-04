import express from "express";

const app = express();
const port = "3000";

app.get("/validate/:fileType", (req, res) => {
  res.status(200).send({
    result: "Hello World",
    fileType: req.params.fileType,
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
