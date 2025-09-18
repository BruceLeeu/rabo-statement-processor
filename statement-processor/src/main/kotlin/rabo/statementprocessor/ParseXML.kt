package rabo.statementprocessor

import com.fasterxml.jackson.dataformat.xml.XmlMapper
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper

class ParseXML {

    fun parseXmlFile(path: String = ""): List<Statement> {
        val fileContent = this::class.java.classLoader.getResource("records.xml").readText()
        val xmlMapper = XmlMapper .builder() .defaultUseWrapper(false).build()
        val wrapped = xmlMapper.readValue(fileContent, WrappedStatement::class.java)
        return wrapped.record
    }
}