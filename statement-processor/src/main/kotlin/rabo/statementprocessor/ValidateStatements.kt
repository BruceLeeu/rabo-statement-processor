package rabo.statementprocessor

import rabo.statementprocessor.types.Statement
import rabo.statementprocessor.types.StatementResponse

/**
 * This function will validate a list of statements based on two criteria.
 * 1. Are there any duplicate reference numbers?
 * 2. Does the `endBalance` match the calculated `startBalance + mutation`?
 *
 * Statements that match either of these two criteria will be removed from the list and returned separately.
 * All remaining (valid) statements are returned separately as well
 *
 * @property statements the list of statements to be validated
 * @return an object containing the three lists of type `StatementResponse`
 */
fun validateStatements(statements: List<Statement>): StatementResponse {
    // Ensures that the whole group of duplicates is removed
    val duplicateStatements = statements.groupBy{ it.reference }.filterValues { it.size > 1 }.values.flatten()
    val distinctStatements = statements - duplicateStatements
    val correctBalanceStatements = distinctStatements.filter { isBalanceCorrect(it)}
    val incorrectBalanceStatements = distinctStatements - correctBalanceStatements

    return StatementResponse(duplicateStatements, incorrectBalanceStatements, correctBalanceStatements)
}

private fun isBalanceCorrect(statement: Statement): Boolean {
    // Round to two decimal places, because calculation does not have infinite precision
    val verifiedEndBalance = Math.round((statement.startBalance + statement.mutation) * 100) / 100.00f;
    if (statement.endBalance !== verifiedEndBalance) {
        return false
    }
    return true
}