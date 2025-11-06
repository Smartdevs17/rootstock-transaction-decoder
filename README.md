# Rootstock Tx-Ray: A Visual Transaction Decoder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

An open-source tool that decodes complex Rootstock transactions. Users paste a transaction hash to get a human-readable trace of internal calls, state changes, and events. It solves the critical developer problem of debugging failed or complex transactions, accelerating dApp development and improving security auditing on Rootstock.

## 🌟 Features

- 🔍 **Transaction Tracing** - Uses `debug_traceTransaction` RPC method to trace transaction execution
- 📝 **Function & Event Decoding** - Decodes function signatures and event parameters with human-readable names
- 🌳 **Call Trace Visualization** - Interactive tree view of nested contract calls with gas usage
- 📊 **Event Logs** - Decoded event parameters with structured data
- 🔄 **State Changes** - Track storage modifications (when available)
- 💾 **Caching** - MongoDB caching for improved performance
- ⚡ **Real-time API** - RESTful API with rate limiting and error handling
- 🎨 **Modern UI** - Clean, responsive interface built with React and Tailwind CSS

## 🏗️ Architecture

This project follows **MVC (Model-View-Controller)** architecture:

```
rootstock-transaction-decoder/
├── backend/              # Node.js/TypeScript backend
│   ├── api/             # Vercel serverless function
│   ├── src/
│   │   ├── config/      # Configuration (env, database)
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Express middleware
│   │   ├── models/      # MongoDB models
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   │   ├── rpc.service.ts              # RPC interactions
│   │   │   ├── signature-decoder.service.ts # Function/event decoding
│   │   │   ├── transaction-parser.service.ts # EVM trace parsing
│   │   │   └── transaction.service.ts      # Main transaction service
│   │   └── types/       # TypeScript types
│   ├── vercel.json      # Vercel deployment config
│   └── package.json
│
└── frontend/            # React/TypeScript frontend
    ├── src/
    │   ├── components/  # React components
    │   ├── pages/       # Page components
    │   ├── services/    # API services
    │   ├── types/       # TypeScript types
    │   └── hooks/       # Custom hooks
    ├── vercel.json      # Vercel deployment config
    └── package.json
```

## 🛠️ Tech Stack

### Backend
- **Node.js** with **TypeScript**
- **Express.js** - RESTful API framework
- **MongoDB** with **Mongoose** - Transaction caching
- **Ethers.js** - Blockchain interactions
- **Zod** - Schema validation

### Frontend
- **React** 18+ with **TypeScript**
- **Vite** - Build tooling
- **TanStack Query** - Data fetching
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Sonner** - Toast notifications

## 📋 Prerequisites

- **Node.js** 18+ and npm/yarn
- **MongoDB** (local or cloud instance)
- **Access to Rootstock RPC endpoint** (archive node recommended for full tracing)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Smartdevs17/rootstock-transaction-decoder.git
cd rootstock-transaction-decoder
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# Required: ROOTSTOCK_RPC_URL, ROOTSTOCK_ARCHIVE_NODE_URL, MONGODB_URI

# Start MongoDB (if running locally)
mongod

# Start development server
npm run dev
```

The backend will be available at `http://localhost:3001`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
# VITE_API_BASE_URL=http://localhost:3001/api/v1

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:8080`

## ⚙️ Configuration

### Backend Environment Variables

Create `backend/.env`:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Rootstock Mainnet RPC Configuration
ROOTSTOCK_RPC_URL=https://public-node.rsk.co
ROOTSTOCK_ARCHIVE_NODE_URL=https://public-node.rsk.co

# Rootstock Testnet RPC Configuration (optional - defaults to public testnet nodes)
ROOTSTOCK_TESTNET_RPC_URL=https://public-node.testnet.rsk.co
ROOTSTOCK_TESTNET_ARCHIVE_NODE_URL=https://public-node.testnet.rsk.co

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/rootstock-tx-decoder

# API Configuration
API_PREFIX=/api/v1

# CORS Configuration (required - comma-separated for multiple origins)
CORS_ORIGIN=http://localhost:8080,https://yourdomain.com

# Cache Configuration
CACHE_TTL=3600

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Environment Variables

Create `frontend/.env` (optional):

```env
VITE_API_BASE_URL=http://localhost:3001/api/v1
```

## 📡 API Documentation

### Base URL
```
http://localhost:3001/api/v1
```

### Endpoints

#### Health Check
```
GET /health
```

Returns server health status.

#### Decode Transaction (POST)
```
POST /transactions/decode
Content-Type: application/json

{
  "txHash": "0x..."
}
```

#### Get Transaction (GET)
```
GET /transactions/:txHash
```

### Response Format

```json
{
  "success": true,
  "data": {
    "txHash": "0x...",
    "status": "success" | "failed",
    "blockNumber": "1234567",
    "timestamp": "2024-11-06 14:32:18 UTC",
    "gasUsed": "234,567",
    "gasPrice": "0.06",
    "from": "0x...",
    "to": "0x...",
    "value": "0.5",
    "callTrace": {
      "type": "CALL",
      "from": "0x...",
      "to": "0x...",
      "value": "0.5",
      "gas": "250000",
      "gasUsed": "234567",
      "input": "0xa9059cbb",
      "output": "0x...",
      "functionName": "transfer",
      "success": true,
      "depth": 0,
      "calls": [...]
    },
    "events": [...],
    "stateChanges": [...]
  }
}
```

## 🔧 Development

### Backend Scripts

```bash
cd backend

npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
npm run type-check # Type check without emitting
```

### Frontend Scripts

```bash
cd frontend

npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🧪 Testing

### Backend Testing

Test the API endpoints using Postman or curl:

```bash
# Health check
curl http://localhost:3001/health

# Decode transaction
curl -X POST http://localhost:3001/api/v1/transactions/decode \
  -H "Content-Type: application/json" \
  -d '{"txHash": "0x..."}'
```

### Frontend Testing

1. Start both backend and frontend servers
2. Navigate to `http://localhost:8080`
3. Enter a transaction hash and click "Decode"

## 📝 How It Works

### Transaction Tracing

1. **Fetch Transaction** - Retrieves transaction and receipt from RPC
2. **Trace Transaction** - Uses `debug_traceTransaction` with `callTracer` to get execution trace
3. **Parse Trace** - Converts raw EVM trace into structured format:
   - Maps call types (CALL, DELEGATECALL, STATICCALL, CREATE, REVERT)
   - Detects reverts through `error` field
   - Captures returns via `output` field
   - Recursively processes nested calls
4. **Decode Signatures** - Decodes function and event signatures
5. **Format Data** - Formats values, gas, timestamps for display
6. **Cache Result** - Stores decoded transaction in MongoDB

### Fallback Mechanism

When `debug_traceTransaction` is not available (common with public RPC nodes):
- Creates basic call trace from transaction and receipt data
- Still decodes events and function signatures
- Provides transaction details without nested internal calls

## 🐛 Troubleshooting

### Transaction Not Found

- Verify the transaction hash is correct (64 hex characters after 0x)
- Check if the transaction exists on the network
- Ensure RPC endpoint matches the network (testnet vs mainnet)

### CORS Errors

- Update `CORS_ORIGIN` in backend `.env` to match your frontend URL
- Default: `http://localhost:8080`

### Tracing Not Available

- Public RPC nodes typically don't support `debug_traceTransaction`
- The service automatically falls back to basic call traces
- For full tracing, use an archive node with debug methods enabled

### Network Mismatch

- Ensure the selected network (mainnet/testnet) matches the transaction's network
- Transactions from mainnet won't be found on testnet and vice versa
- The network switcher in the UI helps ensure you're querying the correct network

### Vercel Deployment Issues

- Ensure all environment variables are set in Vercel dashboard
- Check that `CORS_ORIGIN` matches your frontend URL exactly
- Verify MongoDB connection string is correct
- Ensure Node.js version is 18+ in Vercel settings

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments where necessary
   - Update documentation as needed

4. **Test your changes**
   - Test both backend and frontend
   - Ensure all endpoints work correctly
   - Test with various transaction types

5. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```

6. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style

- Use **tabs** for indentation
- Use **single quotes** for strings
- Omit semicolons (unless required)
- Follow TypeScript best practices
- Use meaningful variable and function names

### Pull Request Guidelines

- Provide a clear description of changes
- Reference any related issues
- Ensure all tests pass
- Update documentation if needed
- Follow the existing code structure

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the Rootstock community
- Powered by [Rootstock](https://rootstock.io)
- Uses [Ethers.js](https://ethers.org/) for blockchain interactions

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Smartdevs17/rootstock-transaction-decoder/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Smartdevs17/rootstock-transaction-decoder/discussions)
- **Documentation**: See the [README](https://github.com/Smartdevs17/rootstock-transaction-decoder#readme) for detailed documentation

## 🗺️ Roadmap

- [ ] Enhanced state change detection
- [ ] Support for more function/event signatures
- [ ] Transaction comparison feature
- [ ] Export transaction data (JSON, CSV)
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Performance optimizations

---

**Made with ❤️ for the Rootstock community**
