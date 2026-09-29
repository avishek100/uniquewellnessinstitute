# Unique Wellness Institute API

Express API for the React client. Accounts and application requests are stored in MongoDB.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `MONGODB_URI`. Local development generates a temporary session secret if `JWT_SECRET` is omitted; sessions reset when the API restarts. Production requires a persistent random `JWT_SECRET` of at least 32 characters.
3. Start the API with `npm run dev`.

The API listens on `http://localhost:4000` by default. Set `ADMIN_EMAILS` to a comma-separated list of emails allowed to view applications and answer chats. An admin must sign in with one of those accounts. Admin endpoints are `GET /api/admin/applications`, `GET /api/admin/conversations`, and `GET /api/admin/conversations/:id/messages`; they require the admin session cookie. Every submitted application creates a private real-time support conversation. The applicant receives a one-time chat access token in the submission response, and chat messages are persisted in MongoDB and delivered over Socket.IO.

`GET /api/health` reports API and database status; `POST /api/applications` accepts application form submissions. Auth endpoints are `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/google`, `GET /api/auth/me`, and `POST /api/auth/logout`. Sessions use an HTTP-only cookie. Auth and application endpoints return `503` until MongoDB is available.

For Google sign-in, create a Google OAuth client ID, then set the same value as `GOOGLE_CLIENT_ID` in the server `.env` and `VITE_GOOGLE_CLIENT_ID` in the client `.env`. Add your client origin to Google's authorized JavaScript origins. Copy the client's `.env.example` to `.env` and set `VITE_API_URL` if the API is not on `http://localhost:4000`.

Local development allows loopback origins on any port. Set `CLIENT_ORIGIN` to the deployed client origin (or comma-separated origins) in production.