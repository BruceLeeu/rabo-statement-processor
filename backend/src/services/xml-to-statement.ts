import { isStatement, Statement } from "#models/statement.js";
import { XMLParser } from "fast-xml-parser";
import fs from "node:fs";

export const processXmlFile = () => {
  const records: Statement[] = [];
  fs.createReadStream(`src/assets/records.xml`, "utf8")
    .on("data", (chunk) => {
      const parser = new XMLParser({
        attributeNamePrefix: "",
        ignoreAttributes: false,
        parseAttributeValue: true,
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const obj = parser.parse(chunk);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      for (const record of obj.records.record) {
        if (!isStatement(record)) {
          // Throw error
          console.error(record);
          continue;
        }
        records.push(record);
        console.log(record);
      }
    })
    .on("end", () => {
      console.log(`XML file successfully processed. ${records.length.toString()} records added.`);
    })
    .on("error", (error: Error) => {
      console.error("An error occurred:", error.message); // Handle `error` event
    });
  return records;
};
