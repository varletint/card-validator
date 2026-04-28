# Card Validator API

A robust, enterprise-ready Express API built with TypeScript for validating payment card numbers using the Luhn algorithm.

## Features

- **TypeScript**: Written entirely in strict TypeScript for complete type safety.
- **RESTful API**: Exposes JSON endpoints for integrating with any mobile or frontend interface.
- **Validation**: Strict input payloads validation using `zod`.
- **Security First**: HTTP headers secured by `helmet` and Cross-Origin Resource Sharing handled by `cors`.
- **Observability**: Request logging provided by `morgan`.
- **Robust Algorithms**: Pure implementation of the modulo 10 (Luhn) check.
- **Testing Coverage**: Suite of unit tests with `jest`.

---

## Getting Started

### Prerequisites

You must have **Node.js** (v16+ recommended).

### Installation

1. Clone this repository (if applicable) and move into the project directory:
   \`\`\`bash
   cd card-validator
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Set your environment variables (optional). Create a \`.env\` file in the root:
   \`\`\`env
   PORT=3000
   \`\`\`

### Scripts

- **Start in Dev Mode**: \`npm run dev\`
- **Build**: \`npm run build\` (Compiles to \`dist/\`)
- **Start in Prod**: \`npm start\` (Requires \`npm run build\` to be executed first)
- **Run Tests**: \`npm test\`

---

## Endpoint Documentation

### \`POST /api/validate-card\`

Validates a card number payload.

**Request Body**
\`\`\`json
{
"cardNumber": "4111111111111111"
}
\`\`\`

**Successful Response \`(200 OK)\`**
\`\`\`json
{
"valid": true,
"message": "Card number is valid"
}
\`\`\`

**Error Response - Invalid Request \`(400 Bad Request)\`**
\`\`\`json
{
"valid": false,
"errorCode": "BAD_REQUEST",
"message": "cardNumber is required"
}
\`\`\`
