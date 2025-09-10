import { Statement } from "./statement.js";

export interface Report {
  duplicate: Statement[];
  incorrectBalance: Statement[];
  valid: Statement[];
}
