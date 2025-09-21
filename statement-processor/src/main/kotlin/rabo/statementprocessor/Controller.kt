package rabo.statementprocessor

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import rabo.statementprocessor.exceptions.InvalidFileTypeException
import rabo.statementprocessor.types.Statement
import rabo.statementprocessor.types.StatementResponse

@RestController
@RequestMapping("/validate")
class Controller {

    @Operation(summary = "Validate statements", description = "Perform validation of all statements that are extracted from the supported file")
    @GetMapping("/{fileType}")
    fun validateFileTypeGet(@PathVariable("fileType") fileType: String): StatementResponse {

        when (fileType) {
            "csv" -> {
                val statements: List<Statement> = ParseCSV().parseCsvFile()
                return validateStatements(statements)
            }

            "xml" -> {
                val statements: List<Statement> = ParseXML().parseXmlFile()
                return validateStatements(statements)
            }
            else -> {
                throw InvalidFileTypeException(fileType)
            }
        }
    }
}