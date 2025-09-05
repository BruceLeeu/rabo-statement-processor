import { Statement } from "#models/statement.js";
import { parse } from "csv-parse";
import fs from "node:fs";

export const processFile = () => {
  const columnNames: Record<keyof Statement, string> = {
    description: "Description",
    endBalance: "End Balance",
    IBAN: "Account Number",
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
          throw new Error(`Typing for column '${column}' not found`);
          //throw error because no column found (incomplete typing)
          return;
        }),
    })
      .on("data", (row: Statement) => {
        console.log(row);
        if (typeof row.reference !== "number") {
          // throw error, add to failed transactions
          console.log(`Statement validation failed because "reference" was not typed correctly: ${JSON.stringify(row, null, 2)}`);
          return;
        }
        if (typeof row.startBalance !== "number") return;
        if (typeof row.mutation !== "number") return;
        if (typeof row.endBalance !== "number") return;
        records.push(row); // Handle `data` event
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
