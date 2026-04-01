# Expense Tracker 2

A full-stack expense tracking application built with Next.js (App Router), Express, Prisma, and PostgreSQL.

## Overview

This project contains:

- A frontend app (`client`) built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.
- A backend API (`server`) built with Express, TypeScript, Prisma, and PostgreSQL.
- Cookie-based authentication with access and refresh token flow.
- Transaction, budget, profile, and AI chatbot features.
- Docker Compose setup for running frontend, backend, and database together.

## Key Features

- User registration, login, logout, and profile update
- Access token refresh using refresh token cookies
- Budget management (set/get/delete)
- Transaction management (create/list/delete)
- Transaction summary dashboard and charts
- Chat assistant endpoint for finance questions
- Dark/light/system theme support

## Tech Stack

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Axios
- Backend: Node.js, Express 5, TypeScript, Prisma 7
- Database: PostgreSQL 18
- Containerization: Docker, Docker Compose

## Main Folder Structure

```text
Expense Tracker 2/
├── client/
│   ├── app/
│   │   ├── (auth)/
│   │   └── (root)/
│   ├── components/
│   │   ├── ui/
│   │   └── web/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── generated/
│   │   └── prisma/
│   ├── src/
│   │   ├── app.ts
│   │   ├── index.ts
│   │   ├── Routes/
│   │   ├── middleware/
│   │   └── modules/
│   │       ├── user/
│   │       ├── budget/
│   │       ├── transactions/
│   │       └── chatbot/
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── readme.md
```

## API Modules

Base API prefix: `/api`

- `/api/users`:
	- `POST /register`
	- `POST /login`
	- `POST /refresh`
	- `POST /logout` (auth required)
	- `GET /profile` (auth required)
	- `PUT /profile` (auth required)
- `/api/budget`:
	- `POST /set` (auth required)
	- `GET /get` (auth required)
	- `DELETE /delete` (auth required)
- `/api/transactions`:
	- `POST /` (auth required)
	- `GET /` (auth required)
	- `DELETE /:id` (auth required)
	- `GET /summary` (auth required)
- `/api/chat`:
	- `POST /ask` (auth required)

## Prerequisites

- Node.js 20+
- pnpm 10+
- Docker + Docker Compose (for containerized run)
- PostgreSQL (only for non-Docker local backend setup)

## Environment Variables

### Backend (`server/.env`)

Copy `server/.env.example` to `server/.env` and configure values:

```env
PORT=5000
ACCESS_SECRET_KEY=your_access_secret
REFRESH_SECRET_KEY=your_refresh_secret
NODE_ENV=development
DATABASE_URL=postgresql://sital:mysecret@localhost:5555/expense_tracker?schema=public
GROQ_API_KEY=your_groq_api_key
```

When running with Docker Compose, `DATABASE_URL` can use the internal host `db:5432`.

### Frontend (`client/.env`)

Copy `client/.env.example` to `client/.env`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/api
API_BASE_URL_INTERNAL=http://backend:5000/api
ACCESS_SECRET_KEY=your_access_secret
```

Notes:

- `NEXT_PUBLIC_API_BASE_URL` is used by browser-side requests.
- `API_BASE_URL_INTERNAL` is used by server-side frontend requests inside Docker.
- Keep `ACCESS_SECRET_KEY` aligned with backend if middleware token verification is enabled.

## Run Locally (Without Docker)

### 1) Start Backend

```bash
cd server
pnpm install
pnpm generate
pnpm migrate
pnpm start
```

Backend runs on `http://localhost:5000` by default (or the port from `.env`).

### 2) Start Frontend

```bash
cd client
pnpm install
pnpm dev
```

Frontend runs on `http://localhost:3000`.

## Run With Docker Compose

From project root:

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:3001`
- Backend API: `http://localhost:5001/api`
- PostgreSQL exposed on host: `localhost:5555`

To stop:

```bash
docker compose down
```

To stop and remove volumes:

```bash
docker compose down -v
```

## Useful Commands

### Frontend

```bash
cd client
pnpm dev
pnpm build
pnpm start
pnpm lint
```

### Backend

```bash
cd server
pnpm start
pnpm migrate
pnpm generate
```

## Common Docker Networking Pitfall

If you see `ECONNREFUSED` in frontend server-side fetches while using Docker, verify:

- Browser URL uses `NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/api`
- Frontend internal server fetches use `API_BASE_URL_INTERNAL=http://backend:5000/api`

Inside Docker, `localhost` points to the current container, not other services.

## License

This project is for educational/personal use unless you define a separate license.
