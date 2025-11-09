# MyPocket (My_Pockettt)

MyPocket is a personal finance web application that helps users track expenses, transactions, and investments. It includes AI-powered receipt scanning, CSV import, interactive charts, and authentication.

## Tech stack
- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Authentication: Clerk
- AI: Google Gemini (receipt extraction)

## Quick start (development)

1. Backend

```powershell
cd backend
npm install
# start the backend (nodemon recommended)
npm run dev
# or
node server.js
```

2. Frontend

```powershell
cd fronend
npm install
npm run dev
```

## Environment

Update `backend/.env` with your values (do NOT commit `.env`):

- `MONGODB_URI` — your MongoDB connection string (Atlas or local)
- `PORT` — backend port (e.g., 5001)
- `NODE_ENV` — development|production
- `CORS_ORIGIN` — allowed origins for the frontend
- `JWT_SECRET` — secret for tokens (if used)

Frontend (optional):
- `fronend/.env.local` — set `VITE_API_URL` to your backend API base (e.g., `http://localhost:5001/api`)

## Flowchart
- Canonical Mermaid diagram: `docs/flowchart_v2.md` (open in VS Code with a Mermaid extension or paste its mermaid block into https://mermaid.live to render).

### Flowchart image
<p align="center">
	<img src="MyPocket/fronend/public/flowchart.png" alt="MyPocket flowchart" width="900" />
</p>

### UI screenshot
You can preview the application's UI below. If the image doesn't display on GitHub, view `fronend/public/UI.png` directly.

<p align="center">
	<img src="MyPocket/fronend/public/UI.png" alt="MyPocket UI" width="900" />
</p>



