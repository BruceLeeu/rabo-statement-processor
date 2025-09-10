import { Statement } from "#types/statement.js";

import { statementColumnNames } from "./constants.js";

export const mapStatementColumnsToKeys = (header: string[]) =>
  header.map((column) => {
    let key: keyof Statement;
    for (key in statementColumnNames) {
      if (statementColumnNames[key] === column) {
        return key;
      }
    }
    console.error(`Mapping for column '${column}' not found`);
  });
