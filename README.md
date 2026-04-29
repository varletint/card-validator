# 💳 TS Card Validator Service

A robust, production-ready REST API built with Node.js, Express, and TypeScript to validate credit card numbers using the standard Luhn Algorithm.

## 🚀 Why Node.js & Express?

For a microservice focused on validation, the technology choice prioritizes:

1. **High Throughput & Concurrency**: Node.js's an event-driven, non-blocking I/O model is perfect for handling high volumes of lightweight, synchronous API validation requests efficiently.
2. **Ecosystem & Speed**: Express is the industry standard for spinning up minimal, performant web servers in Node. It lacks the heavy scaffolding of frameworks like NestJS, allowing us to build an unopinionated, perfectly scoped service.
3. **TypeScript Integration**: By strictly typing our Express handlers and leveraging Zod for runtime schema checks, we achieve complete end-to-end type safety typically only found in stricter compiled languages.

## 🏛 Architecture & Request Flow

The application is structured using a clean, layered architecture to maintain clear boundaries of responsibility:

- **Routes (`src/routes`)**: Maps incoming HTTP requests (e.g. `POST /api/validate-card`) and associates them with controller logic.
- **Schemas (`src/schemas`)**: The first line of defense. Uses **Zod** to validate the runtime payload structure before it ever reaches our business logic.
- **Controllers (`src/controllers`)**: Orchestrates the flow. Extracts the validated payload, calls the Domain Service, and formats the HTTP response.
- **Services (`src/services`)**: The pure Domain Layer. Contains zero knowledge of HTTP objects (req/res). It purely handles the mathematical implementation of the Luhn algorithm.
- **Error Handling (`src/middlewares/errorHandler.ts`)**: A centralized global error catch that differentiates between predicted operational errors (`AppError`) and unhandled programming exceptions.

## 💻 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Validation**: Zod (Runtime), Native TS (Compile-time)
- **Tooling**: `tsx` (dev runtime), `jest` & `ts-jest` (testing), `morgan` & `helmet` (middleware)

## 🛠 Project Structure

```text
src/
├── app.ts                  # Express application setup and middleware pipeline
├── server.ts               # Server entry point and environment bootstrap
├── controllers/            # HTTP Controller logic
├── middlewares/            # Custom reusable middlewares (e.g., Error boundaries)
├── routes/                 # API Routing definitions
├── schemas/                # Zod runtime validation schemas
├── services/               # Pure business/domain logic (Luhn Algorithm)
├── types/                  # Global TypeScript Interfaces and Data Models
└── utils/                  # Shared utilities (e.g., Custom AppError class)
tests/                      # Jest Unit and Integration tests
```

## 🔄 The Luhn Algorithm Breakdown

The Luhn check (modulo 10 algorithm) is a simple checksum formula used to validate a variety of identification numbers.

_(Note: While algorithms mathematically work on any length of digits, our application enforces strict structural validation of 13-19 digits for real credit cards before applying this math)._

Here is a step-by-step example using a mock **12-digit string** `453271589013`:

1. **Sanitize**: We strip any edge-case whitespace/hyphens resulting in exactly `453271589013`.
2. **Reverse & Double**: Moving from the **rightmost digit to the left**, we double the value of **every second digit**.
3. **Subtract 9 / Sum Digits**: If doubling results in a two-digit number (like `18`), subtract `9` to get its sum (like `9`).
4. **Sum Everything**: Add every digit up.

Let's trace `453271589013` from right to left:

- `3` (Don't double) = **3**
- `1` (Double: `1 * 2`) = **2**
- `0` (Don't double) = **0**
- `9` (Double: `9 * 2 = 18` -> `18 - 9 = 9`) = **9**
- `8` (Don't double) = **8**
- `5` (Double: `5 * 2 = 10` -> `10 - 9 = 1`) = **1**
- `1` (Don't double) = **1**
- `7` (Double: `7 * 2 = 14` -> `14 - 9 = 5`) = **5**
- `2` (Don't double) = **2**
- `3` (Double: `3 * 2`) = **6**
- `5` (Don't double) = **5**
- `4` (Double: `4 * 2`) = **8**

**Total Sum** = `3 + 2 + 0 + 9 + 8 + 1 + 1 + 5 + 2 + 6 + 5 + 8` = **50**

5. **Modulo 10 Validation**: Since `50 % 10 === 0`, this 12-digit string successfully mathematically passes the Luhn algorithmic check!

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- NPM

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running Locally

To start the development server with hot-reload:

```bash
npm run dev
```

To build for production:

```bash
npm run build
npm start
```

## 🧪 Testing

We use **Jest** for validating edge cases, mathematical correctness, and structural bounds.

Run the test suite:

```bash
npm test
```

## 📡 API Reference

### `POST /api/validate-card`

Validates a given credit card string.

**Request Payload:**

```json
{
  "cardNumber": "4111 1111 1111 1111"
}
```

**Successful Valid Response (200 OK):**

```json
{
  "valid": true,
  "message": "Card number is valid"
}
```

**Invalid Request/Format (400 Bad Request):**

```json
{
  "valid": false,
  "errorCode": "BAD_REQUEST",
  "message": "cardNumber is required and must be a string"
}
```
