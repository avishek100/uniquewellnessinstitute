# Deployment

## Backend on Render

1. Create a MongoDB database (for example, on MongoDB Atlas) and allow Render's outbound connections in its network access settings.
2. In Render, create a Blueprint from this repository and select `render.yaml`.
3. Set the prompted values:
   - `MONGODB_URI`: the database connection string.
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD`: credentials for the admin account.
   - `CLIENT_ORIGIN`: the exact deployed frontend origin, such as `https://app.uniquewellnessinstitute.com` (no trailing slash).
4. Render generates `JWT_SECRET` and provides `PORT` automatically. Keep the generated secret stable across deploys.
5. Wait for the service health check at `/api/health` to report `200` with the database connected. Copy the Render service URL for the frontend configuration.

## Frontend on Vercel

1. Import this repository into Vercel and set the project root directory to `client`.
2. Use `npm run build` as the build command. The Vite config selects Nitro's Vercel preset for the server-rendered TanStack Start app.
3. Set `VITE_API_URL` to the Render service URL, with no trailing slash, for example `https://unique-wellness-api.onrender.com`. Set it for each Vercel environment you use (Production and Preview), then redeploy; Vite embeds this value during the build.
4. Deploy, then update Render's `CLIENT_ORIGIN` to the final Vercel/custom-domain origin and redeploy the API if needed.

## Domains and cookies

For login and admin sessions, use custom domains on the same parent domain when possible, such as `app.uniquewellnessinstitute.com` on Vercel and `api.uniquewellnessinstitute.com` on Render. Set `CLIENT_ORIGIN` to the exact app origin and `VITE_API_URL` to the API domain. If multiple frontend origins must be allowed, list them comma-separated in `CLIENT_ORIGIN`. The API sets its HTTP-only session cookie with `SameSite=None; Secure` in production; browser third-party-cookie restrictions can still affect the default cross-site Vercel and Render domains.

The default `*.vercel.app` and `*.onrender.com` hostnames are cross-site. Browser third-party-cookie restrictions can prevent session-based login from working across those default domains, even when CORS is configured correctly.