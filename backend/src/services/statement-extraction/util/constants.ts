import { Statement } from "#types/statement.js";

export const statementColumnNames: Record<keyof Statement, string> = {
  accountNumber: "Account Number",
  description: "Description",
  endBalance: "End Balance",
  mutation: "Mutation",
  reference: "Reference",
  startBalance: "Start Balance",
};
