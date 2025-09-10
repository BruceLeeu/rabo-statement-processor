import { isStatement, Statement } from "#types/statement.js";
import { parse } from "csv-parse";
import fs from "node:fs";

import { mapStatementColumnsToKeys } from "./util/mappers.js";

export const processCsvFile = (url: string) => {
  const records: Statement[] = [];
  return new Promise<Statement[]>((resolve, reject) => {
    fs.createReadStream(url, { encoding: "utf8" }).pipe(
      parse({
        autoParse: true,
        cast: true,
        columns: mapStatementColumnsToKeys,
      })
        .on("data", (record: unknown) => {
          if (!isStatement(record)) {
            console.error("The following record is not of type Statement:", record);
            return;
          }
          records.push(record);
        })
        .on("end", () => {
          console.info(`CSV file successfully processed. ${records.length.toString()} records extracted.`);
          resolve(records);
        })
        .on("error", (error: Error) => {
          console.error("An error occurred:", error.message);
          reject(error);
        }),
    );
  });
};
