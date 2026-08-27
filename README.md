# Portfolio — MERN Stack

A personal portfolio website built with the **MERN** stack (MongoDB, Express, React, Node.js).

- **Public site** — Hero + About, Projects, Skills & Experience, Certificates, and a Contact form. All content is served live from MongoDB.
- **Admin CMS** — a password-protected dashboard (`/admin`) to create/edit projects, skills, experience, certificates, and your profile, plus read contact-form messages. Project and certificate images are uploaded straight from your computer.

```
portfolio/
├── server/   Express + Mongoose API   (http://localhost:5000)
└── client/   React + Vite SPA         (http://localhost:5173)
```

---

## Prerequisites

- **Node.js 18+** (tested on Node 22)
- A free **MongoDB Atlas** account — https://www.mongodb.com/cloud/atlas/register

---

## 1. Get a MongoDB connection string

1. Create a free **Atlas** account and a free **M0** cluster.
2. **Database Access** → add a database user (username + password). Remember these.
3. **Network Access** → **Add IP Address** → *Allow access from anywhere* (`0.0.0.0/0`) for development.
4. **Connect** → **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<user>` and `<password>` with your database user's credentials, and add a database name after the host, e.g. `.../portfolio?retryWrites...`.

---

## 2. Configure environment variables

Create `server/.env` (copy from `server/.env.example`):

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=change-this-to-a-long-random-string
JWT_EXPIRES=7d
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=pick-a-strong-password
```

> `ADMIN_EMAIL` / `ADMIN_PASSWORD` are the credentials you'll use to log into `/admin`. They're only read by the seed script.

---

## 3. Install & seed

From the project root:

```bash
npm run install:all
npm run seed
```

`seed` creates your admin user and inserts a little sample content so the site isn't empty on first load.

---

## 4. Run in development

```bash
npm run dev
```

- Public site → http://localhost:5173
- Admin login → http://localhost:5173/admin/login
- API → http://localhost:5000/api

Vite proxies `/api` and `/uploads` to the server, so both apps work together with no CORS setup in dev.

---

## Scripts (root)

| Command | What it does |
| --- | --- |
| `npm run install:all` | Install root, server, and client dependencies |
| `npm run seed` | Create the admin user + sample content |
| `npm run dev` | Run server and client together |
| `npm run build` | Build the client for production |
| `npm start` | Start the server only (production) |

---

## API overview

Public (no auth):

- `GET /api/profile` · `GET /api/projects` · `GET /api/skills` · `GET /api/experience` · `GET /api/certificates`
- `POST /api/messages` — contact-form submission (rate-limited + validated)

Auth:

- `POST /api/auth/login` → `{ token, user }`
- `GET /api/auth/me` — current admin (Bearer token)

Protected (Bearer token):

- `PUT /api/profile`
- `POST/PUT/DELETE /api/projects/:id` (same for `skills`, `experience`, `certificates`)
- `GET /api/messages` · `PATCH /api/messages/:id` (mark read) · `DELETE /api/messages/:id`
- `POST /api/upload` — multipart image upload → `{ url }`

---

## Notes on production

- Uploaded files live in `server/uploads`. On ephemeral hosts (e.g. Render's free tier) this folder is wiped on redeploy. For real deployments, switch the upload controller (`server/src/controllers/uploadController.js`) to a service like **Cloudinary** — it's the only piece that needs to change.
- Build the client (`npm run build`) and either serve the static output from Express or deploy the client to Netlify/Vercel and the server to Render/Railway/Fly.
- Use a strong, random `JWT_SECRET` and a strong `ADMIN_PASSWORD` in production, and lock Atlas Network Access down to your host's IP.
