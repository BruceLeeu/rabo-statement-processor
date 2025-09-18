package rabo.statementprocessor

import com.fasterxml.jackson.databind.MappingIterator
import com.fasterxml.jackson.dataformat.csv.CsvMapper
import com.fasterxml.jackson.dataformat.csv.CsvSchema


class ParseCSV {

    fun parseCsvFile(path: String = ""): List<Statement> {
        val fileContent = this::class.java.classLoader.getResource("records.csv").readText(Charsets.ISO_8859_1)
        val csvMapper = CsvMapper()
        val autoSchema = csvMapper.schemaFor(Statement::class.java).withHeader()
        val it: MappingIterator<Statement> = csvMapper
            .readerFor(Statement::class.java)
            .with(autoSchema)
            .readValues(fileContent)
        val statements = it.readAll()

        return statements
    }
}