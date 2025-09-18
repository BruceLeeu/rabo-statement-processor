package rabo.statementprocessor

fun validateStatements(statements: List<Statement>): StatementResponse {

    val distinctStatements = mutableMapOf<Long, Long>()
    val distinctDuplicateReferencesToRemove = mutableMapOf<Long, Long>()
    val validStatements = mutableMapOf<Long, Statement>()
    val duplicateStatements = mutableListOf<Statement>()
    val incorrectBalanceStatements = mutableListOf<Statement>()

    for (statement in statements) {
        if (distinctStatements.containsKey(statement.reference)) {
            duplicateStatements.add(statement)
            distinctDuplicateReferencesToRemove.set(statement.reference, statement.reference)
            continue
        } else {
            distinctStatements.set(statement.reference, statement.reference)
        }

        val verifiedEndBalance = Math.round((statement.startBalance + statement.mutation) * 100) / 100.00f;

        if (statement.endBalance !== verifiedEndBalance) {
            incorrectBalanceStatements.add(statement)
            continue
        }

        validStatements.set(statement.reference, statement);
    }

    // Remove all first duplicates
    for (duplicate in distinctDuplicateReferencesToRemove) {
        val firstDuplicate = validStatements.get(duplicate.key)
        if (firstDuplicate !== null){
            duplicateStatements.addFirst(firstDuplicate)
            validStatements.remove(duplicate.key)
        }
    }

    println(duplicateStatements)
    println(incorrectBalanceStatements)
    println(validStatements)

    return StatementResponse(duplicateStatements, incorrectBalanceStatements, validStatements.values.toList())
}