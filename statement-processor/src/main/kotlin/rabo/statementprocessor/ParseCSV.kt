package rabo.statementprocessor

import com.fasterxml.jackson.databind.MappingIterator
import com.fasterxml.jackson.dataformat.csv.CsvMapper
import com.fasterxml.jackson.dataformat.csv.CsvSchema


class ParseCSV {

    fun parseCsvFile(path: String = "") {
        println("parsing CSV")
        val schema = CsvSchema.builder()
            .addColumn("Reference")
            .addColumn("Account Number")
            .addColumn("Description")
            .addColumn("Start Balance")
            .addColumn("Mutation")
            .addColumn("End Balance")
            .setSkipFirstDataRow(true) // Skip headers
            .build()
        val fileContent = this::class.java.classLoader.getResource("records.csv").readText(Charsets.ISO_8859_1)
        val csvMapper = CsvMapper()
        val it: MappingIterator<MutableMap<String?, String?>?> = csvMapper
            .readerForMapOf(String::class.java)
            .with(schema)
            .readValues(fileContent)
        val all = it.readAll()
        println(all)
    }
}