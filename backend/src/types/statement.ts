export interface Statement {
  accountNumber: string;
  description: string;
  endBalance: number;
  mutation: number;
  reference: number;
  startBalance: number;
}

export const isStatement = (obj: unknown): obj is Statement => {
  if (!obj) return false;
  if (typeof obj !== "object") return false;
  if (!("accountNumber" in obj) || typeof obj.accountNumber !== "string") return false;
  if (!("description" in obj) || typeof obj.description !== "string") return false;
  if (!("endBalance" in obj) || typeof obj.endBalance !== "number") return false;
  if (!("mutation" in obj) || typeof obj.mutation !== "number") return false;
  if (!("reference" in obj) || typeof obj.reference !== "number") return false;
  if (!("startBalance" in obj) || typeof obj.startBalance !== "number") return false;
  return true;
};
