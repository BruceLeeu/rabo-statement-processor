package rabo.statementprocessor

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.annotation.JsonPropertyOrder
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement

@JsonPropertyOrder("reference", "accountNumber", "description", "startBalance", "mutation", "endBalance" )
class Statement(
    @JsonProperty("accountNumber") val accountNumber: String,
    @JsonProperty("description") val description: String,
    @JsonProperty("endBalance") val endBalance: Float,
    @JsonProperty("startBalance") val startBalance: Float,
    @JsonProperty("mutation") val mutation: Float,
    @JsonProperty("reference") val reference: Long
)

@JacksonXmlRootElement(localName = "Transfer")
class WrappedStatement(
    @JacksonXmlProperty(localName="record") val record: List<Statement>
)
