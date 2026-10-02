# Deployment Guide: Vercel (Frontend) + Render (Backend)

This repository is configured for full-stack deployment with:
- **Backend API (`server/`)**: Deployed as a Node.js Web Service on [Render](https://render.com).
- **Frontend App (`client/`)**: Deployed as a TanStack Start / Nitro SSR & SPA application on [Vercel](https://vercel.com).
- **Database**: MongoDB Atlas.

---

## 1. Deploy the Backend on Render

### Option A: Using the Render Blueprint (Recommended)
1. Push your repository to GitHub or GitLab.
2. In the [Render Dashboard](https://dashboard.render.com), click **New +** → **Blueprint**.
3. Select your repository. Render will automatically detect [`render.yaml`](file:///c:/Users/avish/Desktop/uniquewellnessinstitute/render.yaml).
4. Fill in the required environment variables:
   - `MONGODB_URI`: Your MongoDB connection string (e.g. from MongoDB Atlas).
   - `ADMIN_EMAIL`: Email for the admin account (e.g. `admin@example.com`).
   - `ADMIN_PASSWORD`: Secure password for the admin account.
   - `CLIENT_ORIGIN`: Your Vercel frontend URL (e.g. `https://uniquewellnessinstitute.vercel.app` — you can update this after Vercel deployment).
5. Click **Apply**. Render will generate `JWT_SECRET` automatically and deploy the service.

### Option B: Manual Web Service Setup
If creating the Web Service manually:
- **Root Directory**: `server`
- **Environment / Runtime**: `Node`
- **Build Command**: `npm ci --include=dev && npm run build`
- **Start Command**: `npm start`
- **Health Check Path**: `/api/health`
- **Environment Variables**:
  - `NODE_ENV`: `production`
  - `PORT`: `4000` (or leave default, Render supplies `PORT`)
  - `JWT_SECRET`: A random 32+ character string.
  - `MONGODB_URI`: `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority`
  - `ADMIN_EMAIL`: `admin@example.com`
  - `ADMIN_PASSWORD`: `<strong_password>`
  - `CLIENT_ORIGIN`: `https://<your-vercel-app>.vercel.app`
  - `ALLOW_VERCEL_PREVIEWS`: `true`

> Note down your Render API URL once deployed (e.g., `https://unique-wellness-api.onrender.com`).

---

## 2. Deploy the Frontend on Vercel

1. In the [Vercel Dashboard](https://vercel.com/new), click **Add New...** → **Project** and import your repository.
2. Configure the project settings:
   - **Framework Preset**: `Other` (or `Vite`)
   - **Root Directory**: `client` *(Click "Edit" next to Root Directory and choose `client`)*
   - **Build Command**: `npm run build` (or leave default)
   - **Output Directory**: `.vercel/output` (automatically detected by Nitro)
3. Add Environment Variables:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://<your-render-backend-url>.onrender.com` (your Render service URL without a trailing slash)
4. Click **Deploy**.

---

## 3. Link Frontend and Backend (CORS & Cookie Auth)

1. Once Vercel finishes deploying, copy your production domain (e.g., `https://uniquewellnessinstitute.vercel.app`).
2. Go back to your [Render Service Dashboard](https://dashboard.render.com) → **Environment**.
3. Set or update `CLIENT_ORIGIN` to your Vercel URL (e.g. `https://uniquewellnessinstitute.vercel.app`).
4. (Optional) If you have a custom domain (e.g., `https://uniquewellnessinstitute.com`), add it to `CLIENT_ORIGIN` separated by a comma:
   ```env
   CLIENT_ORIGIN=https://uniquewellnessinstitute.vercel.app,https://uniquewellnessinstitute.com
   ```

---

## Environment Variables Summary

### Server (`server/.env`)
| Variable | Required | Description |
|---|---|---|
| `NODE_ENV` | Yes | `production` |
| `PORT` | Optional | Set automatically by Render (default `4000`) |
| `JWT_SECRET` | Yes | Minimum 32 characters for JWT sessions |
| `MONGODB_URI` | Yes | MongoDB Atlas connection URI |
| `ADMIN_EMAIL` | Yes | Admin login email |
| `ADMIN_PASSWORD` | Yes | Admin login password |
| `CLIENT_ORIGIN` | Yes | Allowed client URL(s) for CORS and cookies |
| `ALLOW_VERCEL_PREVIEWS` | Optional | Set to `true` to allow `*.vercel.app` preview URLs |

### Client (`client/.env`)
| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Yes | Public URL of your deployed Render backend |
