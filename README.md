 Connect Four – Backend Server 

A backend server for the classic **Connect Four** game, built with **Node.js** and **MySQL**.
Player 1 creates a game and gets a unique code; Player 2 joins with that code. The server manages turns, board state, win/draw detection, and game end events. Chat is external to gameplay.

---

## ⚙️ Tech Stack

| Layer | Technology |
|:------|:------------|
| Backend | Node.js (HTTP module) |
| Database | MySQL |
| Architecture | Modular (server, API, model) |
| Environment | dotenv for configuration |

---

## 📁 Project Structure

connect-four-server
├── api.js # Game routes & logic (new game, join, play, etc.)
├── model.js # MySQL connection and queries
├── server.js # Main server file
├── package.json # Dependencies and scripts
├── .gitignore # Ignored files (e.g., .env)
└── .env.example # Example environment variables
