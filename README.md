# HRMS MERN — Microservices + Colorful React Frontend

**Stack**
- **Frontend:** React 18 + Vite + TypeScript + Tailwind + React Router + React Query
- **Backend (microservices):** Node.js + Express + TypeScript + Mongoose  
  Services: `auth`, `employees`, `attendance`, `payroll`, `gateway`
- **Database:** MongoDB (shared database for all services)
- **CORS:** Open to all (`*`) by default

---

## ⚙️ Ports Overview
| Service | Port | Description |
|----------|------|-------------|
| Frontend | 5173 | React Vite App |
| Gateway | 8080 | API Gateway (proxy to microservices) |
| Auth | 4001 | Authentication Service |
| Employees | 4002 | Employee CRUD Service |
| Attendance | 4003 | Attendance Tracking Service |
| Payroll | 4004 | Payroll Management Service |
| MongoDB | 27017 | Database |

---

## 🧩 Prerequisites
- Node.js 20+ and npm 10+
- Docker (optional for MongoDB)
- MongoDB (local or Docker)

---

## 📦 Setup Instructions

### 1. Clone & Configure
```bash
git clone <your-repo-url> hrms-mern
cd hrms-mern
cp .env.example .env
```

### 2. Install Dependencies
```bash
npm install
```

This installs dependencies for all microservices and frontend via workspaces.

---

## 🗄️ Running MongoDB

### Option A: Local MongoDB
Ensure MongoDB is running on your system (default port `27017`).
```env
MONGO_URI=mongodb://127.0.0.1:27017/hrms
```

### Option B: MongoDB via Docker
```bash
docker volume create mongo-data

docker run -d --name mongo -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=rootpass \
  -v mongo-data:/data/db mongo:7
```

Update `.env`:
```env
MONGO_URI=mongodb://root:rootpass@127.0.0.1:27017/hrms?authSource=admin
```

---

## 🚀 Development Mode (Hot Reload)

Run **all microservices + frontend** together:
```bash
npm run dev
```

| Service | URL |
|----------|------|
| Frontend | http://localhost:5173 |
| Gateway | http://localhost:8080 |
| Auth | http://localhost:4001 |
| Employees | http://localhost:4002 |
| Attendance | http://localhost:4003 |
| Payroll | http://localhost:4004 |

---

## 🧠 Running Each Service Individually

### Gateway
```bash
npm --workspace services/gateway run dev
```

### Auth Service
```bash
npm --workspace services/auth run dev
```

### Employees Service
```bash
npm --workspace services/employees run dev
```

### Attendance Service
```bash
npm --workspace services/attendance run dev
```

### Payroll Service
```bash
npm --workspace services/payroll run dev
```

### Frontend
```bash
npm --workspace frontend run dev
```

---

## 🏗️ Build & Run (Production-like Mode)

### Build all
```bash
npm run build
```

### Start manually
```bash
npm -w services/gateway run start &
npm -w services/auth run start &
npm -w services/employees run start &
npm -w services/attendance run start &
npm -w services/payroll run start &
npm -w frontend run preview
```

Frontend runs on **5173**.

---

## 🧾 API Overview (through Gateway)

### Auth
`POST /auth/register` → Register a new user  
`POST /auth/login` → Login and receive JWT

### Employees
`GET /employees` → List employees  
`POST /employees` → Add employee  
`PUT /employees/:id` → Update employee  
`DELETE /employees/:id` → Delete employee

### Attendance
`GET /attendance` → List records  
`POST /attendance` → Add attendance record

### Payroll
`GET /payroll` → List payroll entries  
`POST /payroll` → Add payroll entry

### Health Checks
Each service supports `GET /health` → `{ ok: true }`

---

## 🧪 Example Curl Requests

```bash
# Register user
curl -X POST http://localhost:8080/auth/register   -H 'Content-Type: application/json'   -d '{"email":"admin@example.com","name":"Admin","password":"12345","role":"admin"}'

# Login user
curl -X POST http://localhost:8080/auth/login   -H 'Content-Type: application/json'   -d '{"email":"admin@example.com","password":"12345"}'

# Get Employees
curl http://localhost:8080/employees
```

---

## 🛠 Troubleshooting

- **Cannot connect to MongoDB:** Check Mongo URI and if container is running.  
- **Port already in use:** Change ports in `.env`.  
- **Frontend API fails:** Ensure `VITE_API_URL=http://localhost:8080`.  
- **CORS issue:** Keep `CORS_ORIGIN=*` in dev.

---

## 🧰 Next Steps (optional)
- Add JWT auth middleware to other services.
- Add role-based permissions.
- Create Docker Compose for entire stack.
- Seed initial data for HRMS.

---

**Author:** Vital Steer LLC — DevOps / Cloud Team  
**Contact:** support@vitalsteers.com
