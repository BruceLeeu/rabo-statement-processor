import { isStatement, Statement } from "#models/statement.js";
import { XMLParser } from "fast-xml-parser";
import fs from "node:fs";

export const processXmlFile = () => {
  const records: Statement[] = [];
  return new Promise<Statement[]>((resolve, reject) => {
    fs.createReadStream(`src/assets/records.xml`, "utf8")
      .on("data", (chunk) => {
        const parser = new XMLParser({
          attributeNamePrefix: "",
          ignoreAttributes: false,
          parseAttributeValue: true,
        });

        const obj: unknown = parser.parse(chunk);

        if (
          !obj ||
          typeof obj !== "object" ||
          !("records" in obj) ||
          !obj.records ||
          typeof obj.records !== "object" ||
          !("record" in obj.records) ||
          !Array.isArray(obj.records.record)
        ) {
          throw new Error(`Parsed XML object is not structured correctly to contain an array in 'records.record'`);
        }

        for (const record of obj.records.record) {
          if (!isStatement(record)) {
            // TODO: handle error?
            console.error("The following record is not of type Statement:", record);
            continue;
          }
          records.push(record);
        }
      })
      .on("end", () => {
        console.info(`XML file successfully processed. ${records.length.toString()} records extracted.`);
        resolve(records);
      })
      .on("error", (error: Error) => {
        console.error("An error occurred:", error.message);
        reject(error);
      });
  });
};
