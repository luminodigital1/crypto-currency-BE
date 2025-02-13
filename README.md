# CryptoCurrency WebSocket Service

This NestJS project connects to an external cryptocurrency WebSocket (`wss://ws.coincap.io/prices?assets=ALL`) to fetch real-time cryptocurrency prices. It then serves this data to frontend clients through a separate WebSocket connection, providing data on current price, previous price, percentage change, and timestamp.

## Features

- Connects to the CoinCap WebSocket to receive real-time cryptocurrency prices.
- Processes and stores data for each cryptocurrency with the following attributes:
  - **Current Price**
  - **Previous Price**
  - **Percentage Change**
  - **Current Timestamp**
- Provides a WebSocket connection for frontend clients to receive updates on cryptocurrency data every 5 seconds.

---

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Deplyment link](#deployment-link)

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/luminodigital1/crypto-currency-be.git
   cd crypto-currency-be
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Environment Configuration:**

   Create a `.env` file in the root directory to configure environment variables. Copy environment variables from `.env.example`

---

## Configuration

This project requires the `dotenv` package to handle environment variables.

1. **WebSocket Endpoint:**

   - External WebSocket endpoint: `wss://ws.coincap.io/prices?assets=ALL` (hardcoded in the service).
   - Internal WebSocket connection for frontend clients: Port and origin are configured in the WebSocket Gateway.

2. **Crypto Currency Constants:**
   - Add constants and helper functions for initializing cryptocurrency data in the `src/constants` and `src/helper` files respectively.

---

## Usage

### Start the Application

```bash
npm run start
```

The server will start on the configured port, and the WebSocket connection to the external data source will be established.

### WebSocket Data Flow

- **External WebSocket Connection** (`CryptoCurrencyService`):
  - Connects to the CoinCap WebSocket and receives cryptocurrency price data.
  - Processes data to compute the current price, previous price, percentage change, and timestamp.
- **Internal WebSocket Gateway** (`CryptoCurrencyGateway`):
  - Serves processed cryptocurrency data to frontend clients every 5 seconds.

---

### WebSocket Events

The server emits the following events over WebSocket:

- **Event:** `cryptoCurrencies`
  - **Description:** Broadcasts cryptocurrency data to connected frontend clients every 5 seconds.
  - **Data Payload:**
    - `currency`: Cryptocurrency symbol
    - `price`: Current price
    - `previousPrice`: Last price received before the current one
    - `percentageChange`: Percentage change since the previous price
    - `currentTime`: Timestamp of the current price data

---

## Deployment Link

For deployment, follow the following link:
`https://crypto-currency-be-9464babaec34.herokuapp.com/`
