package rabo.statementprocessor.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice
import rabo.statementprocessor.types.ErrorMessage

@RestControllerAdvice
class ControllerExceptionHandler {
    @ExceptionHandler(InvalidFileTypeException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun onInvalidFileType(e: InvalidFileTypeException) = ErrorMessage("INVALID_FILE_TYPE", e.message)
}