# Hello World App - React + Express + TypeScript

A Hello World application built with React, Express, and TypeScript following a feature-based architecture.

## Features

- **Frontend**: React 18 with Vite and TypeScript
- **Backend**: Express server with TypeScript
- **Feature-based architecture**: Organized by features with proper encapsulation
- **TypeScript strict mode**: Full type safety
- **Path aliases**: Clean imports using `@` and `@features`
- **Testing**: Unit tests with Vitest

## Project Structure

```
.
├── src/
│   ├── features/
│   │   └── hello-world/
│   │       ├── components/     # React components
│   │       ├── services/       # API services
│   │       ├── hooks/          # Custom React hooks
│   │       ├── types/          # TypeScript types
│   │       └── index.ts        # Public API
│   ├── App.tsx
│   └── main.tsx
├── server/
│   ├── features/
│   │   └── hello-world/
│   │       └── routes.ts       # Express routes
│   └── index.ts                # Server entry point
├── package.json
├── tsconfig.json               # Frontend TypeScript config
├── tsconfig.server.json        # Backend TypeScript config
└── vite.config.ts
```

## Getting Started

### Install Dependencies

```bash
yarn install
```

### Development

Run both frontend and backend in development mode:

```bash
yarn dev
```

Or run them separately:

```bash
# Frontend (http://localhost:3000)
yarn dev:client

# Backend (http://localhost:3001)
yarn dev:server
```

### Testing

```bash
yarn test
```

### Build

```bash
# Build frontend
yarn build

# Build backend
yarn build:server
```

## API Endpoints

### GET /api/hello

Returns a hello message.

**Response:**
```json
{
  "message": "Hello, World"
}
```

## Architecture

This project follows a feature-based architecture:

- Each feature is self-contained in its own directory
- Features export a public API through `index.ts`
- Internal implementation details are not exposed
- TypeScript strict mode enforces type safety
- Path aliases simplify imports
