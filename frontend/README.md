# Rabobank Statement Processor Frontend

This project utilizes React with TypeScript working in Vite with HMR and some ESLint rules.

## Installation

This project is built with Node version 22.19.0 - please use this version or newer!
Note that this project also uses openapi-generator-cli which requires Java to be installed. Java >= 11 should be available on your `PATH`

### In the `frontend` subdirectory

0. If you have `nvm` installed, then run `nvm use` to automatically use the correct Node version. Otherwise check that it is installed manually.
1. `npm install`

#### Using the Node.js API

2. `npm run openapi-node` at least ONCE to generate the required openAPI client and types. Rerun every time the backend is updated.

#### Using the Kotlin Spring API

!! Ensure that the Kotlin Spring API is running and that the API spec is reachable on `http://localhost:3000/v3/api-docs`

2. `npm run openapi-kotlin` at least ONCE to generate the required openAPI client and types. Rerun every time the backend is updated.

## Startup

Do `npm start` to start the local development server on `http://localhost:5173/`

## Testing

Tests are implemented using vitest. To run the tests simply do `npm test`
