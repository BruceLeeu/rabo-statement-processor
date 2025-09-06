import { isStatement, Statement } from "#models/statement.js";
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
  fs.createReadStream(`src/assets/records.csv`).pipe(
    parse({
      // CSV options if any
      cast: true,
      columns: (header) =>
        header.map((column) => {
          let key: keyof Statement;
          for (key in columnNames) {
            if (columnNames[key] === column) {
              return key;
            }
          }
          //throw error because no column found (incomplete typing)
          throw new Error(`Mapping for column '${column}' not found`);
        }),
    })
      .on("data", (row: unknown) => {
        if (!isStatement(row)) {
          // TODO: handle error
          console.error(row);
          return;
        }
        records.push(row); // Handle `data` event
        console.log(row);
      })
      .on("end", () => {
        console.log(`CSV file successfully processed. ${records.length.toString()} records added.`);
      })
      .on("error", (error: Error) => {
        console.error("An error occurred:", error.message); // Handle `error` event
      }),
  );
  return records;
};
