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

---

## 🔗 API Endpoints

| Endpoint | Method | Description |
|:----------|:-------|:-------------|
| `/newGame` | **POST** | Creates a new game and returns a unique game code. Player 1 starts the game. |
| `/joinGame` | **POST** | Joins an existing game using the provided code (Player 2). |
| `/play` | **POST** | Executes a move: player sends the column number and updates the board. |
| `/getStateBoard` | **GET** | Returns the current board state for a given game. |
| `/sendMessage` | **POST** | Sends a chat message to the external chat system. |
| `/getMessages` | **GET** | Retrieves all chat messages. |

---

### 🧠 Notes
- Player 1 creates a new game and receives a **game code**.  
- Player 2 joins using that code.  
- The chat system is **external to the game**, meaning players cannot chat during gameplay.  
- The server manages turns, board state, win conditions, and full/empty checks.  

---

### ✅ Example Flow

1. Player 1 → `/newGame` → receives game code: `123`  
2. Player 1 shares this code through the chat  
3. Player 2 → `/joinGame` → enters name and code `123`  
4. Game starts automatically → Player 1 begins  
5. Players alternate moves using `/play`  
6. After a win or draw, server returns the result via `/getStateBoard`

---

## 🗄️ Database Setup (MySQL)

This project uses **MySQL** for storing game data such as board states and player information.

To run the project locally:

1. **Install MySQL Server** (version 8.0 or newer)
2. **Create a database**:
   ```sql
   CREATE DATABASE my_db;
3. Update your .env file with your local credentials:
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=my_db
   DB_PORT=3306
4. Run the server:
   or (if you have nodemon installed):
   npx nodemon server.js

   💡 MySQL was chosen intentionally to demonstrate the ability to work with a real relational database and environment variables (.env) for secure configuration.

👩‍💻 Author

Menaluc
Backend Developer | Computer Science Student @ HIT
📧 [menaluchekol@gmail.com]
🌐 https://github.com/Menaluc

💬 About This Project

This project was developed as part of a practical backend exercise using Node.js and MySQL,
demonstrating the ability to design, modularize, and connect a server to a real relational database.

It includes:

Full server logic for the Connect Four game

Clean separation between server, api, and model layers

External chat integration

Secure configuration with .env

Fully documented README for easy understanding and deployment

