package rabo.statementprocessor

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/validate")
class Controller {

    @Operation(summary = "Validate statements", description = "Perform validation of all statements that are extracted from the supported file")
    @GetMapping("/{fileType}")
    fun validateFile(@PathVariable("fileType") fileType: String): Array<Statement> {
        val testStatement = Statement("NL12RABO12312312", fileType, 100f, 50f, 50f, 12345)

        when (fileType) {
            "csv" -> {
                ParseCSV().parseCsvFile()
                return arrayOf(testStatement)
            }

            "xml" -> {
                ParseXML().parseXmlFile()
                return arrayOf(testStatement)
            }

            else -> return arrayOf(testStatement)
        }
    }
}