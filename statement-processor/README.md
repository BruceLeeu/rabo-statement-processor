# Rabobank Statement Processor Backend

This project utilizes Kotlin with the Spring Boot framework.

## Installation

This project is built with Kotlin version 2.2.20 - please use this version or newer!

- Also ensure you have at least Java >= 11 and Gradle >= 9.0.0 installed.
- The use of IntelliJ is highly recommended

### IntelliJ

1. Open the `statement-processor` subdirectory
2. Run the gradle `build` command from the gradle tasks side-menu

### Command-line (optional)

1. Open the `statement-processor` subdirectory
2. Install and compile the code with `gradle build`

## Startup

### IntelliJ

1. After indexing and loading, press the green Play button called `StatementProcessorApplication` to start-up the server

### Command-line (optional)

1. In the `statement-processor` directory do a `gradle bootRun` to start a new Spring Boot server

## Testing

### IntelliJ

1. Find the tests that you want to run and press the green Play button next to the class you want to test.

### Command-line (optional)

1. In the `statement-processor` directory do a `gradle bootTestRun` to run all tests and simultaneously start a new Spring Boot server
