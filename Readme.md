# Intelligent Portfolio Simulator

## Architecture
This project uses a MERN stack Monorepo architecture. 
- `/client`: React.js frontend (Vite)
- `/server`: Node.js/Express backend and MongoDB configurations

## 🚀 How to Run the Application Locally
You must run two separate terminal windows to launch the app.

### 1. Start the Backend (API & Database)
1. Open a terminal and navigate to the backend folder: `cd server`
2. Install dependencies: `npm install`
3. **CRITICAL:** Create a `.env` file in the `/server` folder. Request the `MONGO_URI` database password and `JWT_SECRET` from the Database Lead.
4. Start the server: `npm run dev` 
*The server is now running on http://localhost:5050*

### 2. Start the Frontend (UI)
1. Open a second terminal and navigate to the frontend folder: `cd client`
2. Install dependencies: `npm install`
3. Start the React app: `npm run dev`
*The browser will automatically open the UI.*

## 🧪 Testing the API (Without the Frontend)
If you are building backend features, test them using Thunder Client or Postman before wiring them to React.
1. **POST** `/api/users/register`: Body requires `email` and `password`.
2. **POST** `/api/users/login`: Returns a JWT token.
3. **POST** `/api/trades/buy`: Requires the JWT token in the `x-auth-token` header. Body requires `ticker` and `quantity`.

## 🛠 Division of Labor & Folder Ownership
- **Frontend (Auth & Dashboard):** Work strictly inside `/client/src`. All Axios API calls must use `http://localhost:5050`.
- **Backend API (Data Pipes):** Work strictly inside `/server/controllers` and `/server/routes`. 
- **Database Lead:** Owns `/server/models` and `middleware`. Do not alter database schemas without consulting the DB Lead.

## 🛑 Git Branching Strategy
**DO NOT PUSH DIRECTLY TO MAIN.** 1. Create a branch for your feature (e.g., `git checkout -b feat-login-ui`).
2. Write and test your code locally.
3. Push your branch and open a Pull Request (PR) on GitHub.
4. Pull `main` frequently to avoid merge conflicts.