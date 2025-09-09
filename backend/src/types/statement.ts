export interface Statement {
  accountNumber: string;
  description: string;
  endBalance: number;
  mutation: number;
  reference: number;
  startBalance: number;
}

export const isStatement = (obj: unknown): obj is Statement => {
  if (!obj) {
    console.error(`Value is null`);
    return false;
  }
  if (typeof obj !== "object") {
    console.error(`Value is not an object`);
    return false;
  }
  if (!("accountNumber" in obj) || typeof obj.accountNumber !== "string") {
    console.error(`Property 'accountNumber' of Statement is missing or of incorrect data type`);
    return false;
  }
  if (!("description" in obj) || typeof obj.description !== "string") {
    console.error(`Property 'description' of Statement is missing or of incorrect data type`);
    return false;
  }
  if (!("endBalance" in obj) || typeof obj.endBalance !== "number") {
    console.error(`Property 'endBalance' of Statement is missing or of incorrect data type`);
    return false;
  }
  if (!("mutation" in obj) || typeof obj.mutation !== "number") {
    console.error(`Property 'mutation' of Statement is missing or of incorrect data type`);
    return false;
  }
  if (!("reference" in obj) || typeof obj.reference !== "number") {
    console.error(`Property 'reference' of Statement is missing or of incorrect data type`);
    return false;
  }
  if (!("startBalance" in obj) || typeof obj.startBalance !== "number") {
    console.error(`Property 'startBalance' of Statement is missing or of incorrect data type`);
    return false;
  }
  return true;
};
