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
```
📦 connect-four-server
├── api.js # Game routes & logic (new game, join, play, etc.)
├── model.js # MySQL connection and queries
├── server.js # Main server file
├── package.json # Dependencies and scripts
├── .gitignore # Ignored files (e.g., .env)
└── .env.example # Example environment variables

```
---

## 🧠 Environment Variables (`.env`)

Create a `.env` file in the root folder (not uploaded to GitHub):
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=my_db
DB_PORT=3306


💡 *This file is private and is ignored by `.gitignore`, so your database credentials remain secure.*

---

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Menaluc/connect-four-server.git
   cd connect-four-server
2. *Install dependencies*
   npm install
3. Configure your .env file
   Update the database credentials according to your local MySQL setup.
4. *Run the server*
   node server.js
   or (if you have nodemon installed):
   npx nodemon server.js
5. The server will start at: http://localhost:4000



