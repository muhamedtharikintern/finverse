# Server (Express API)

Minimal Express backend to support the React Native app.

## Setup

1. Install dependencies

```bash
cd server
npm install
```

2. Configure environment

```bash
# Create .env and set your values
echo PORT=4000 >> .env
echo MONGODB_URI=mongodb://localhost:27017/MyApp >> .env
echo JWT_SECRET=supersecretlocal >> .env
echo MONGODB_DB=MyApp >> .env
```

## Run

Development (auto-reload):

```bash
npm run dev
```

Production:

```bash
npm start
```

The API will default to `http://localhost:4000`.

## Endpoints

- `GET /health` – health check
- `POST /auth/login` – mock login
- `POST /auth/register` – create user
- `GET /verification/me` – get current user's verification step
- `POST /verification/advance` – set verification step `{ to: "pan"|"aadhar"|"bank"|"kyc"|"done" }`

## MongoDB Compass

- Connection string to use in Compass: `mongodb://localhost:27017`
- Default database used: `MyApp` (controlled by `MONGODB_DB`)
- Collections created:
  - `users`


