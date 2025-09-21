package rabo.statementprocessor.exceptions

class InvalidFileTypeException(private val fileType: String):
    RuntimeException("Invalid file type: $fileType. Should be CSV or XML")