# Intelligent Portfolio Simulator (IPS)

**Team Members:** Andrii Snihuriak - 3135747, Bruno Kennedy-Lisboa - 3141551, Erik Resman - 3144841, Manuel Weiskopf - 3196883   
**Live API URL:** [https://ips-lbcs.onrender.com](https://ips-lbcs.onrender.com)  

---

## **Project Overview**
Our project is a full-stack stock trading simulator. It allows users to create an account, search for real-time stock prices via the Finnhub API, and buy or sell stocks using a starting balance of $100,000. 

The backend is built with **Node.js** and **Express**, using **MongoDB** to store user data and transaction history. We implemented **JWT (JSON Web Tokens)** for secure authentication and a database **aggregation pipeline** to calculate real-time portfolio holdings.

---

## **How to Test the API**
Since this stage focuses on the backend functionality, we have provided ways to test all routes without needing the full UI:

* **Bruno / API Tester:** Inside the root folder, there is a directory called `tests/api-tests`. You can import the `IPS_Collection.json` file into Bruno (or any API tester) to execute pre-configured requests.

**Manual Testing:**
* **Health Check:** Visit the Live URL above to verify the server returns the `"Server is running smoothly"` status.
* **Live Prices:** Visit `https://ips-lbcs.onrender.com/api/stocks/AAPL` to see real-time JSON data fetched from Finnhub.
* **Protected Routes:** Send a POST request to `/api/users/login` to receive a token. Attach this token to the `x-auth-token` header to test protected routes like Buying and viewing the Portfolio.

---

## **Team Contributions & Division of Labour**
We divided the work based on the MERN stack architecture. Overall, the work was split fairly evenly, with a focus on cross-testing each other's code.

* **Andrii (Database/Logic):** 
  * Set up the initial environment, Express server, and MongoDB connection.
  * Built the secure authentication system.
  * Wrote core `buyStock` logic and the portfolio aggregation pipeline.

* **Bruno (Backend & Data):** 
  * Integrated the external stock API (Finnhub) using Axios.
  * Developed the `sellStock` logic and transaction validation.
  * Created the "reset portfolio" `DELETE` route for CRUD compliance.
  * Built checks to handle missing symbols or API rate-limiting errors.

* **Eric & Manu (Frontend & Integration):** 
  * Developed the React interface and state management.
  * Connected the frontend forms to the backend API endpoints.
  * Implemented the TradingView widget for visual market data.

---

## **CRUD Functionality**
* **Create:** `POST /api/users/register` and `POST /api/trades/buy`
* **Read:** `GET /api/trades/portfolio` and `GET /api/stocks/:symbol`
* **Update:** User account balances update automatically upon successful trade execution.
* **Delete:** `DELETE /api/trades/reset` (Wipes user transactions and restores initial cash balance).

## **Technical References & Resources**

**Frontend (Auth & Layout)**
* **React Quick Start:** Used for component structure and standard React patterns. [React Dev Docs](https://react.dev/learn)
* **React Router:** Used for implementing client-side routing to navigate seamlessly between the Login page and the main Trading Dashboard. [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)

**Frontend (Dashboard & Logic)**
* **React State Management:** Used for handling UI updates, such as tracking the user's current cash balance and form inputs. [React API Reference](https://react.dev/reference/react)
* **Fetch API:** Used to handle asynchronous HTTP requests to our Node.js backend. [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

**Backend API & Security**
* **Express Routing:** Used to modularize our backend endpoints (e.g., separating user authentication routes from trade execution routes). [Express.js Basic Routing](https://expressjs.com/en/starter/basic-routing.html)
* **JSON Web Tokens (JWT):** Used for maintaining stateless user sessions and securing our protected trade endpoints. [JWT Introduction](https://jwt.io/introduction)

**Video Tutorials & Walkthroughs**
* **MERN Stack Crash Course:** *Learn MERN Stack with Project in 2 Hours* by Dipesh Malvia. We referenced this tutorial's architectural approach to bridging a React frontend with an Express/MongoDB backend. [Watch on YouTube](https://www.youtube.com/watch?v=DJ5iIo4AWDg)

**Tools & AI Assistants**
* **GitHub Copilot:** Used to analyze our repository's commit history to accurately summarize team contributions, and for inline syntax checking during development.
