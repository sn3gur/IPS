# Intelligent Portfolio Simulator (MERN Stack)

## Architecture
This is a monorepo containing both the Frontend (React/Vite) and Backend (Node/Express).

- `/client`: Frontend React application.
- `/server`: Backend Express server and MongoDB database rules.

## How to Run the Project Local
You need TWO terminal windows open to run this application.

### Terminal 1: Start the Backend (API & Database)
1. `cd server`
2. Run `npm install` (only needed the first time)
3. **CRITICAL:** Create a `.env` file in the `/server` folder and ask Andrii for the MongoDB password.
4. Run `npm run dev` (or `npx nodemon server.js`)
- *The server will run on http://localhost:5000*

### Terminal 2: Start the Frontend (UI)
1. `cd client`
2. Run `npm install` (only needed the first time)
3. Run `npm run dev`
- *The React app will open in your browser.*