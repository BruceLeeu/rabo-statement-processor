package rabo.statementprocessor

import com.fasterxml.jackson.dataformat.xml.XmlMapper
import rabo.statementprocessor.types.Statement
import rabo.statementprocessor.types.WrappedStatement

class ParseXML {

    fun parseXmlFile(path: String = ""): List<Statement> {
        val fileContent = this::class.java.classLoader.getResource("records.xml").readText()
        val xmlMapper = XmlMapper .builder() .defaultUseWrapper(false).build()
        val wrapped = xmlMapper.readValue(fileContent, WrappedStatement::class.java)
        return wrapped.record
    }
}