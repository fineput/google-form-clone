# Google Forms Lite Clone

A simplified Google Forms clone built as a monorepo, featuring real-time form building, filling, and response tracking.

## Tech Stack

**Front-End**

- React
- TypeScript
- Redux Toolkit (RTK Query)
- SCSS Modules
- React Router

**Back-End**

- Node.js
- GraphQL (Apollo Server)

**Architecture**

- Monorepo using npm workspaces

---

## Project Structure

```
google-forms-clone/
├── packages/
│   ├── client/    # React application
│   └── server/    # GraphQL API
├── package.json
└── README.md
```

---

## Setup and Running

### Prerequisites

- Node.js (v18+)
- npm

### Installation & Execution

1. Install dependencies:

```bash
npm run install:all
```

2. Start the development environment:

This command starts both the client and the server concurrently.

```bash
npm run dev
```

### Local Development URLs

- Client: http://localhost:5173
- Server: http://localhost:4001 (GraphQL endpoint)

---

## Core Implementation Details

### RTK Query

Used for streamlined data fetching, caching, and state management between the client and the GraphQL API.

### GraphQL

Implemented with a schema defining the following main types:

- `Form`
- `Question`
- `Response`
- `Answer`

### Data Persistence

The application currently uses an **in-memory store**, which allows rapid development and testing without a database.

---

## Features Checklist

- [x] Monorepo Setup (npm workspaces)
- [x] GraphQL API Queries & Mutations
- [x] Form Builder (`/forms/new`)
- [x] Form Filler (`/forms/:id/fill`)
- [x] Responses Dashboard (`/forms/:id/responses`)
- [x] RTK Query integration

---

## Development Notes

### Data Fetching

To handle API responses, **`transformResponse`** is utilized in RTK Query endpoints to map nested GraphQL objects into clean array structures expected by the React components.

### Type Safety

The project uses **shared TypeScript interfaces** across the codebase to ensure reliable data handling and reduce runtime errors.

Key interfaces include:

- `FormResponse`
- `Question`
- `Answer`
