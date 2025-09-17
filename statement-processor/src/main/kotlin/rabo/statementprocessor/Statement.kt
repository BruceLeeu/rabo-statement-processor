package rabo.statementprocessor


data class Statement(
    val accountNumber: String,
    val description: String,
    val endBalance: Float,
    val startBalance: Float,
    val mutation: Float,
    val reference: Long
)
