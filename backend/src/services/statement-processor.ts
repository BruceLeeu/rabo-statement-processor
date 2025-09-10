import { Report } from "#types/report.js";
import { Statement } from "#types/statement.js";

export const validateStatements = (statements: Statement[]): Report => {
  const distinctStatements = new Map<number, number>();
  const distinctDuplicateReferencesToRemove = new Map<number, number>();
  const validStatements = new Map<number, Statement>();
  const duplicateStatements: Statement[] = [];
  const incorrectBalanceStatements: Statement[] = [];

  for (const statement of statements) {
    if (distinctStatements.has(statement.reference)) {
      duplicateStatements.push(statement);
      distinctDuplicateReferencesToRemove.set(statement.reference, statement.reference);
      continue;
    } else {
      distinctStatements.set(statement.reference, statement.reference);
    }

    // Round to two decimal places, because calculation does not have infinite precision
    const verifiedEndBalance = Math.round((statement.startBalance + statement.mutation) * 100) / 100;
    if (statement.endBalance !== verifiedEndBalance) {
      console.info(`endBalance: ${statement.endBalance.toString()} does not match calculated endBalance: ${verifiedEndBalance.toString()}`);
      incorrectBalanceStatements.push(statement);
    }

    validStatements.set(statement.reference, statement);
  }

  // Remove all first duplicates
  for (const duplicate of Array.from(distinctDuplicateReferencesToRemove.keys())) {
    const firstDuplicate = validStatements.get(duplicate);
    if (firstDuplicate) {
      duplicateStatements.push(firstDuplicate);
      validStatements.delete(duplicate);
    }
  }

  return {
    duplicate: duplicateStatements,
    incorrectBalance: incorrectBalanceStatements,
    valid: Array.from(validStatements.values()),
  };
};
