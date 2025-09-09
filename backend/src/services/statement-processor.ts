import { Statement } from "#types/statement.js";

export const validateStatements = (statements: Statement[]) => {
  console.log("running", statements);
  const distinctStatements = new Map<number, number>();
  const duplicateReferencesToRemove = new Map<number, number>();
  const validStatements = new Map<number, Statement>();
  const duplicateStatements: Statement[] = [];
  const incorrectBalanceStatements: Statement[] = [];
  // Validate that all transactions have a unique reference
  for (const statement of statements) {
    if (distinctStatements.has(statement.reference)) {
      duplicateStatements.push(statement);
      duplicateReferencesToRemove.set(statement.reference, statement.reference);
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

    // Statement has a unique reference and endBalance matches calculated value
    validStatements.set(statement.reference, statement);
  }

  for (const duplicate of Array.from(duplicateReferencesToRemove.keys())) {
    const toAdd = validStatements.get(duplicate);
    if (toAdd) {
      duplicateStatements.push(toAdd);
      validStatements.delete(duplicate);
    }
  }

  return {
    duplicate: duplicateStatements,
    incorrectBalance: incorrectBalanceStatements,
    valid: Array.from(validStatements.values()),
  };
};
