package rabo.statementprocessor

import com.fasterxml.jackson.dataformat.xml.XmlMapper

class ParseXML {

    fun parseXmlFile(path: String = "") {
        println("parsing XML")
        val fileContent = this::class.java.classLoader.getResource("records.xml").readText()
        val xmlMapper = XmlMapper.builder().defaultUseWrapper(false).build()
        println(xmlMapper.readTree(fileContent))
    }
}