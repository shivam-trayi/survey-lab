# SurveyLab

SurveyLab is a modern survey intelligence platform built with a coordinated three-tier architecture:
- **Frontend**: React (Vite) + Tailwind CSS + Lucide React + Axios
- **Primary Backend**: Node.js + Express API
- **AI Service Backend**: Python + FastAPI

All three applications live inside this single repository and communicate via standard HTTP APIs.

---

## 1. Repository Structure

```text
survey-lab/
├── frontend/                 # React + Vite + Tailwind CSS + Axios
│   ├── src/
│   │   ├── services/api.js   # Axios client pointing to Node.js backend
│   │   ├── App.jsx           # Health monitor & pipeline verification UI
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── backend-node/             # Primary Node.js + Express API Gateway
│   ├── src/
│   │   ├── config/env.js     # Validated environment configuration
│   │   ├── services/         # pythonService.js (HTTP client with timeout)
│   │   ├── routes/           # /api/health and /api/ai routes
│   │   ├── middleware/       # Error handling & CORS
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   ├── .env
│   └── package.json
│
├── backend-python/           # Python + FastAPI AI & Model Service
│   ├── app/
│   │   ├── config.py         # Service environment settings
│   │   ├── routers/          # /health and /api/model routes
│   │   └── main.py           # FastAPI application
│   ├── requirements.txt
│   ├── .env.example
│   ├── .env
│   └── venv/                 # Virtual environment (ignored by Git)
│
├── .gitignore
├── .env.example              # Reference template across all services
├── package.json              # Coordinated monorepo scripts
└── README.md
```

---

## 2. Prerequisites

- **Node.js**: `v18+` (Tested on `v22.15.1`)
- **npm**: `v9+` (Tested on `v10.9.2`)
- **Python**: `3.10+` (Tested on `Python 3.13.3`)

---

## 3. Environment Variables

Each application contains its own `.env` file (copied from `.env.example`):

### `backend-node/.env`
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
PYTHON_SERVICE_URL=http://127.0.0.1:8000
PYTHON_TIMEOUT_MS=5000
```

### `backend-python/.env`
```env
PYTHON_HOST=0.0.0.0
PYTHON_PORT=8000
ENVIRONMENT=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5000,http://localhost:5173
```

### `frontend/.env`
```env
VITE_NODE_API_URL=http://localhost:5000/api
```

---

## 4. Setup & Installation

### Step A: Install Node Dependencies

From the repository root:
```bash
# Install root orchestration tools
npm install

# Install Node.js backend dependencies
cd backend-node
npm install
cd ..

# Install Frontend dependencies
cd frontend
npm install
cd ..
```
*(Or run `npm run install:all` from the repository root).*

### Step B: Set Up Python Virtual Environment

```bash
cd backend-python

# On Windows:
python -m venv venv
.\venv\Scripts\python.exe -m pip install -r requirements.txt

# On macOS / Linux:
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

cd ..
```

---

## 5. Starting the Applications

### Option 1: Run All Services Together (Recommended)

From the repository root, start all three services concurrently:
```bash
npm run dev
```

### Option 2: Run Each Service Individually

Open separate terminal windows:

#### Terminal 1 — Python AI Service (Port 8000)
```bash
cd backend-python
# Windows:
.\venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
# macOS / Linux:
source venv/bin/activate && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Terminal 2 — Node.js Backend API (Port 5000)
```bash
cd backend-node
npm run dev
```

#### Terminal 3 — React Frontend (Port 3000)
```bash
cd frontend
npm run dev
```

---

## 6. Communication Flow & Endpoints

SurveyLab enforces clear boundaries between layers:
- The **Frontend** talks **only** to the **Node.js Backend**.
- The **Node.js Backend** securely communicates with the **Python AI Service**.
- Internal Python service URLs, secrets, and ports are not exposed to the browser.

```text
[ Browser / React UI ]
        |
        |  HTTP / REST (Axios)
        v
[ Node.js + Express API ] :5000
        |
        |  Internal Service HTTP (Axios + Timeout)
        v
[ Python + FastAPI Service ] :8000
```

### Endpoint Reference

| Service | Method | Route | Description |
| :--- | :--- | :--- | :--- |
| **Python** | `GET` | `/health` | Python service health & status |
| **Node.js** | `GET` | `/api/health` | Node.js service health & uptime |
| **Node.js** | `GET` | `/api/health/services` | Composite health check (Node + Python status) |

---

## 7. Simple Browser Testing Interface

A clean, single-screen real browser interface focused strictly on testing with only the required inputs and dropdowns:

1. **Top Browser Header**:
   - Window controls (`● ● ●`).
   - Browser tab strip showing active domain / page title and new tab button (`+`).
   - **Day / Night Mode Toggle**: Instant 1-click switcher between Light Mode (☀️ Day) and Dark Mode (🌙 Night).

2. **Navigation & Action Toolbar**:
   - Navigation controls (`<` Back, `>` Forward, `↻` Reload).
   - **URL Input Field**: Address bar with lock icon and clear button.
   - **Open URL Button**: Loads the target URL directly into the browser viewport.
   - **Discontinue Button**: Closes the active session and resets the viewport.
   - **User-Agent Details Button**: Toggles custom User-Agent input.

3. **Compact Configuration Row (Dropdowns & Inputs Only)**:
   - **Device**: `Desktop`, `Mobile`, `Tablet` (automatically adjusts resolution defaults).
   - **Browser**: `Chrome`, `Firefox`, `Safari`, `Edge`.
   - **OS**: `Windows`, `macOS`, `Linux`, `Android`, `iOS`.
   - **Resolution**: Width × Height numeric inputs.
   - **Country**: United States, United Kingdom, Canada, Germany, France, India, Japan, Australia.
   - **Locale**: `en-US`, `en-GB`, `de-DE`, `fr-FR`, `hi-IN`, `ja-JP`, etc.
   - **Timezone**: America/New_York, Europe/London, Asia/Kolkata, UTC, etc.
   - **IP Address**: Input for authorized test-network IP details.
   - **User-Agent**: Auto-generated standard UA with full manual override.

4. **Central Browser Display Area**:
   - Completely clean browser viewport displaying the live web view for the entered URL.
   - Zero static mock questions, placeholder cards, or simulated surveys.
   - Supports mobile, tablet, and desktop aspect ratios.
