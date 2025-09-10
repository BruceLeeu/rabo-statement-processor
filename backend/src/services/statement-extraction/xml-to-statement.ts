import { isStatement, Statement } from "#types/statement.js";
import { XMLParser } from "fast-xml-parser";
import fs from "node:fs";

import { hasNestedRecordArray } from "./util/types.js";

export const processXmlFile = (url: string) => {
  const records: Statement[] = [];
  const parser = new XMLParser({
    attributeNamePrefix: "",
    ignoreAttributes: false,
    parseAttributeValue: true,
  });

  return new Promise<Statement[]>((resolve, reject) => {
    fs.createReadStream(url, { encoding: "utf8" })
      .on("data", (chunk) => {
        const obj: unknown = parser.parse(chunk);

        if (!hasNestedRecordArray(obj)) {
          throw new Error(
            `Parsed XML object is not structured correctly to contain an array in 'records.record'. Cannot continue processing records.`,
          );
        }

        for (const record of obj.records.record) {
          if (!isStatement(record)) {
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
