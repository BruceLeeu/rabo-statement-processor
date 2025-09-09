import { isStatement, Statement } from "#types/statement.js";
import { parse } from "csv-parse";
import fs from "node:fs";

export const processCsvFile = () => {
  const columnNames: Record<keyof Statement, string> = {
    accountNumber: "Account Number",
    description: "Description",
    endBalance: "End Balance",
    mutation: "Mutation",
    reference: "Reference",
    startBalance: "Start Balance",
  };

  const records: Statement[] = [];
  return new Promise<Statement[]>((resolve, reject) => {
    fs.createReadStream(`src/assets/records.csv`).pipe(
      parse({
        autoParse: true,
        cast: true,
        columns: (header) =>
          header.map((column) => {
            let key: keyof Statement;
            for (key in columnNames) {
              if (columnNames[key] === column) {
                return key;
              }
            }
            throw new Error(`Mapping for column '${column}' not found`);
          }),
        encoding: "utf8",
      })
        .on("data", (record: unknown) => {
          if (!isStatement(record)) {
            // TODO: handle error?
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
