package rabo.statementprocessor

import org.hamcrest.MatcherAssert.assertThat
import org.junit.jupiter.api.Assertions.*
import rabo.statementprocessor.types.Statement
import rabo.statementprocessor.types.StatementResponse
import kotlin.test.Test
import kotlin.test.assertContentEquals

class ValidateStatementsTest {
    private val DUPLICATE_STATEMENTS = listOf(
        Statement(
            "NL43AEGO0773393871",
            "Subscription from Dani�l Theu�",
            113.82f,
            102.33f,
            11.49f,
            112806L
        ),
        Statement(
            "NL74ABNA0248990274",
            "Subscription for Rik Dekker",
            43.95f,
            48.2f,
            -4.25f,
            112806L
        )
    )

    private val INVALID_BALANCE_STATEMENTS = listOf(
        Statement(
            "NL93ABNA0585619023",
            "Candy from Vincent de Vries",
            6368f,
            5429f,
            -939f,
            131254L
        ),
        Statement(
            "NL43AEGO0773393871",
            "Subscription for Erik de Vries",
            4981f,
            3980f,
            1000f,
            192480L
        )
    )

    private val VALID_STATEMENTS = listOf(
        Statement(
            "NL32RABO0195610843",
            "Subscription from Vincent de Vries",
            67.63f,
            38.86f,
            28.77f,
            119582L
        ),
        Statement(
            "NL32RABO0195610843",
            "Candy for Rik de Vries",
            25.42f,
            51.01f,
            -25.59f,
            180148L
        )
    )

    @Test
    fun `Asserts that duplicate statements are returned in the 'duplicates' list`() {
        val response = validateStatements(DUPLICATE_STATEMENTS)
        assertIterableEquals(DUPLICATE_STATEMENTS, response.duplicate)
        assertIterableEquals(listOf<Statement>(), response.valid)
        assertIterableEquals(listOf<Statement>(), response.incorrectBalance)
    }

    @Test
    fun `Asserts that incorrect balance statements are returned in the 'incorrectBalance' list`() {
        val response = validateStatements(INVALID_BALANCE_STATEMENTS)
        assertIterableEquals(listOf<Statement>(), response.duplicate)
        assertIterableEquals(listOf<Statement>(), response.valid)
        assertIterableEquals(INVALID_BALANCE_STATEMENTS, response.incorrectBalance)
    }

    @Test
    fun `Asserts that valid statements are returned in the 'valid' list`() {
        val response = validateStatements(VALID_STATEMENTS)
        assertIterableEquals(listOf<Statement>(), response.duplicate)
        assertIterableEquals(VALID_STATEMENTS, response.valid)
        assertIterableEquals(listOf<Statement>(), response.incorrectBalance)
    }

}