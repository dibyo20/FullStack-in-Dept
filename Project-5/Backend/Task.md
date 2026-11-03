# 🏆 Real-Time Quiz Buzzer Platform (Full-Stack Edition)
### Express + Socket.IO + MongoDB Mongoose Architecture

---

## 📖 Table of Contents
1. [Project Overview & Flow](#-project-overview--flow)
2. [The Big Picture: How Full-Stack Sockets Work Together](#-the-big-picture-how-full-stack-sockets-work-together)
3. [System Architecture & Folder Structure](#-system-architecture--folder-structure)
4. [Database Models (MongoDB / Mongoose)](#-database-models-mongodb--mongoose)
5. [The Quiz & Buzzer State Machine](#-the-quiz--buzzer-state-machine)
6. [Complete Socket Event Dictionary](#-complete-socket-event-dictionary)
7. [Step-by-Step Implementation Guide](#-step-by-step-implementation-guide)
8. [Testing Guide (Admin + Multiple Players)](#-testing-guide)
9. [Crucial Gotchas & Security Pitfalls](#-crucial-gotchas--security-pitfalls)

---

## 🎯 Project Overview & Flow

Build a real-time multiplayer **Quiz Buzzer Platform** where an **Admin** controls the quiz flow, questions are pre-loaded from **MongoDB**, and **Players** compete in real-time.

```
       +-------------------------------------------------------------+
       |                        MongoDB                              |
       |  (Stores Pre-loaded Questions, Options & Correct Answers)   |
       +-------------------------------------------------------------+
                                      ▲
                                      │ Mongoose queries
                                      ▼
                        +---------------------------+
                        |  Express + Socket.IO Core |
                        +---------------------------+
                        ▲                           ▲
     Admin Controls:    │                           │  Player Interactions:
   * Starts Quiz        │                           │  * Receives popup notification
   * Sends Questions    │                           │  * Joins Quiz Room
   * Unlocks/Resets     │                           │  * Hits Buzzer (Race condition!)
                        ▼                           ▼  * Submits Answer
                 [ Admin Client ]            [ Player Clients (A, B, C) ]
```

### The User Journey:
1. **The Announcement / Popup:** Connected website users receive a real-time notification popup: *"Quiz starting soon! Click to enter."*
2. **Joining the Arena:** Interested users join the `"quiz_arena"` room with their nickname.
3. **1-by-1 Questions:** The Admin fetches a pre-loaded question from MongoDB and broadcasts it to everyone in `"quiz_arena"` (without revealing the correct answer!).
4. **The Buzzer Race:** 
   - Every player sees the question and a **BUZZER** button.
   - The **first player** to hit the buzzer locks it.
   - All other players receive an alert: *"Player X buzzed first! Buzzer locked."* and their buzzer is disabled.
5. **Answer & Score:** 
   - The buzzer winner has 10 seconds to submit their answer.
   - Server checks the answer against MongoDB.
   - If correct: awards points, updates the leaderboard in MongoDB / memory, and broadcasts the result.
   - If wrong or timeout: Admin can either reset the buzzer for remaining players or move to the next question.
6. **Next Question / Game Over:** Admin advances questions one-by-one until the quiz ends with the final leaderboard.

---

## 🧠 The Big Picture: How Full-Stack Sockets Work Together

Up until now, you have used:
- **Express + MongoDB:** Request-Response cycle (Client requests $\rightarrow$ Server queries DB $\rightarrow$ sends JSON back $\rightarrow$ connection closes).
- **Socket.IO:** Persistent two-way real-time communication.

### How do they connect together?

```
                 Incoming Request / Connection
                              │
             +----------------+----------------+
             │                                 │
     HTTP Request (REST)             WebSocket Handshake (ws://)
             │                                 │
    +--------▼-------+                 +-------▼--------+
    |  Express App   |                 | Socket.IO (io) |
    | (app.use, etc) |                 | (io.on events) |
    +--------+-------+                 +-------+--------+
             │                                 │
             +----------------+----------------+
                              │
                     Shared Node HTTP Server
                     `http.createServer(app)`
                              │
                     Shared MongoDB Layer
                     (Mongoose Models)
```

### The 3 Secrets to Full-Stack Socket.IO:
1. **The Shared HTTP Server:**
   Express alone cannot directly manage raw WebSocket handshakes. We pass `app` to Node’s native `http.createServer(app)`, and then attach `new Server(httpServer)`. Both REST routes and WebSockets listen on the **exact same port**!
2. **Accessing the Database in Socket Events:**
   Socket event listeners (`socket.on(...)`) are standard JavaScript functions. They can be `async` and can directly call `await Question.findById(...)` or `await User.updateOne(...)`!
3. **Sharing `io` with Express Routes (Optional but powerful):**
   If you have a REST route (e.g., `POST /api/quiz/start`), you can trigger a socket broadcast from inside that route using `req.app.get("io").emit(...)`.

---

## 📁 System Architecture & Folder Structure

```text
Day 46/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── question.model.js     # Questions preloaded in DB
│   │   └── score.model.js        # Player scores & leaderboard
│   ├── socket/
│   │   ├── quizHandler.js        # All socket event logic
│   │   └── quizState.js          # In-memory buzzer state & active question
│   ├── seed/
│   │   └── seedQuestions.js      # Script to insert sample questions into DB
│   └── app.js                    # Express configuration
├── test-clients/
│   ├── admin-client.js           # Simulates the Admin
│   ├── player1-client.js         # Simulates Player 1
│   └── player2-client.js         # Simulates Player 2
├── .env                          # PORT, MONGO_URI
├── server.js                     # Glues HTTP, Express, MongoDB & Socket.IO
├── package.json
└── Task.md
```

---

## 🗄️ Database Models (MongoDB / Mongoose)

### 1. `src/models/question.model.js`
Pre-loaded quiz questions.

```javascript
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }], // Array of 4 options
  correctAnswer: { type: String, required: true }, // Secret! Never emit to players upfront!
  points: { type: Number, default: 10 },
  order: { type: Number, required: true } // 1, 2, 3...
});

module.exports = mongoose.model("Question", questionSchema);
```

### 2. `src/models/score.model.js`
Persistent record of player performances.

```javascript
const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, default: 0 },
  correctAnswersCount: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Score", scoreSchema);
```

---

## ⚡ The Quiz & Buzzer State Machine

Because a buzzer needs **instant, sub-millisecond response time**, the current buzzer lock and active question state live in **server memory (`quizState.js`)**, while questions and persistent scores live in **MongoDB**.

```javascript
// src/socket/quizState.js
const quizState = {
  status: "IDLE", // "IDLE" | "ACTIVE" | "QUESTION_ACTIVE" | "BUZZER_LOCKED" | "ENDED"
  currentQuestion: null, // Holds the current Mongoose Question object
  currentQuestionIndex: 0,
  totalQuestions: 0,
  buzzerWinner: null, // { socketId, username }
  buzzerLockTimer: null,
  scores: new Map() // username -> current points
};

module.exports = quizState;
```

---

## 📡 Complete Socket Event Dictionary

### 1. General & Announcement Events
| Event | From | To | Payload | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `announcement:quiz_start` | Server | Everyone | `{ message, category }` | Triggers the website popup notification |
| `quiz:join` | Player | Server | `{ username }` (with callback) | Player enters the `"quiz_arena"` room |
| `quiz:player_joined` | Server | Room | `{ username, totalPlayers }` | Announces new player to the room |

### 2. Admin Question Flow Events
| Event | From | To | Payload | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `admin:start_quiz` | Admin | Server | `{}` (with callback) | Transitions quiz to ACTIVE |
| `admin:next_question` | Admin | Server | `{}` (with callback) | Fetches next question from DB and broadcasts |
| `question:new` | Server | Room | `{ questionNumber, questionText, options, points }` | Displays question to all players (**NO correct answer!**) |

### 3. Buzzer & Answering Events (The Race Condition!)
| Event | From | To | Payload | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `buzzer:press` | Player | Server | `{}` (with callback) | Player tries to claim the buzzer |
| `buzzer:locked` | Server | Room | `{ winnerName, winnerId, answerTimeLimit: 10 }` | Informs all players who won the buzzer and disables others |
| `answer:submit` | Winner | Server | `{ selectedAnswer }` (with callback) | Only the buzzer winner can send their answer |
| `answer:result` | Server | Room | `{ isCorrect, winnerName, correctAnswer, points, leaderboard }` | Shows whether answer was right/wrong |
| `admin:reset_buzzer` | Admin | Server | `{}` | Re-opens buzzer for remaining players if first player was wrong |

---

## 🛠️ Step-by-Step Implementation Guide

### Step 1: Glue Express, HTTP, Socket.IO & MongoDB in `server.js`

Here is how you connect all the technologies together:

```javascript
require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const connectDB = require("./src/config/db");
const setupQuizSocket = require("./src/socket/quizHandler");

const app = express();
app.use(express.json());

// 1. Create HTTP server from Express
const httpServer = createServer(app);

// 2. Attach Socket.IO to HTTP server
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

// 3. Make io available inside Express routes if needed
app.set("io", io);

// 4. Mount Socket Handler
setupQuizSocket(io);

// 5. Connect MongoDB & Start Server
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
```

---

### Step 2: Seed Questions into MongoDB (`seedQuestions.js`)

Create a quick script to populate 3-5 sample questions in your MongoDB database:

```javascript
// src/seed/seedQuestions.js
require("dotenv").config();
const mongoose = require("mongoose");
const Question = require("../models/question.model");

const sampleQuestions = [
  {
    order: 1,
    questionText: "Which protocol does WebSocket use for its initial handshake?",
    options: ["HTTP", "FTP", "SMTP", "UDP"],
    correctAnswer: "HTTP",
    points: 10
  },
  {
    order: 2,
    questionText: "Which Socket.IO method broadcasts to all clients except the sender?",
    options: ["io.emit()", "socket.broadcast.emit()", "socket.emit()", "io.to().emit()"],
    correctAnswer: "socket.broadcast.emit()",
    points: 10
  },
  {
    order: 3,
    questionText: "What MongoDB method finds a single document by its unique identifier?",
    options: ["findById", "getOne", "searchById", "findOneById"],
    correctAnswer: "findById",
    points: 10
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Question.deleteMany({});
  await Question.insertMany(sampleQuestions);
  console.log("Database seeded successfully!");
  process.exit();
}

seed();
```

---

### Step 3: Implement the Socket Handler (`quizHandler.js`)

This file is where the magic happens. Let's look at the crucial parts:

#### A. The Global Popup Notification & Room Join
```javascript
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Player joins the quiz arena room
  socket.on("quiz:join", ({ username }, callback) => {
    if (!username || !username.trim()) {
      return callback({ success: false, message: "Valid username required" });
    }

    socket.data.username = username;
    socket.join("quiz_arena");

    // Initialize player score in memory
    if (!quizState.scores.has(username)) {
      quizState.scores.set(username, 0);
    }

    callback({ success: true, message: `Welcome to the Quiz, ${username}!` });

    // Notify room
    io.to("quiz_arena").emit("quiz:player_joined", {
      username,
      totalPlayers: io.sockets.adapter.rooms.get("quiz_arena")?.size || 1
    });
  });
});
```

#### B. Admin Starting the Quiz & Fetching from MongoDB
```javascript
socket.on("admin:start_quiz", async (data, callback) => {
  // Optional: check admin token
  quizState.status = "ACTIVE";
  quizState.currentQuestionIndex = 0;

  // 1. Broadcast global popup to all connected website clients
  io.emit("announcement:quiz_start", {
    message: "A new Quiz is starting right now! Click to enter the arena.",
    category: "Web Development & Sockets"
  });

  callback({ success: true, message: "Quiz started and popup broadcasted!" });
});

socket.on("admin:next_question", async (data, callback) => {
  quizState.currentQuestionIndex += 1;

  // 2. Query MongoDB for the question
  const question = await Question.findOne({ order: quizState.currentQuestionIndex });

  if (!question) {
    quizState.status = "ENDED";
    return io.to("quiz_arena").emit("quiz:ended", {
      leaderboard: Array.from(quizState.scores.entries()).map(([username, score]) => ({ username, score }))
    });
  }

  // 3. Store active question in state & RESET buzzer
  quizState.currentQuestion = question;
  quizState.status = "QUESTION_ACTIVE";
  quizState.buzzerWinner = null;

  // 4. Send question to players (WITHOUT correctAnswer!)
  io.to("quiz_arena").emit("question:new", {
    order: question.order,
    questionText: question.questionText,
    options: question.options,
    points: question.points
  });

  callback({ success: true, questionOrder: question.order });
});
```

#### C. The Atomic Buzzer Lock (Race Condition Handling!)
```javascript
socket.on("buzzer:press", (data, callback) => {
  // Check 1: Is a question active?
  if (quizState.status !== "QUESTION_ACTIVE") {
    return callback({ success: false, message: "Buzzer is not active!" });
  }

  // Check 2: Did someone already buzz? (Atomic check)
  if (quizState.buzzerWinner !== null) {
    return callback({ 
      success: false, 
      message: `Too slow! ${quizState.buzzerWinner.username} buzzed first.` 
    });
  }

  // Lock the buzzer immediately!
  quizState.status = "BUZZER_LOCKED";
  quizState.buzzerWinner = {
    socketId: socket.id,
    username: socket.data.username
  };

  // Acknowledge the winner
  callback({ success: true, message: "You got the buzzer! Submit your answer." });

  // Broadcast to everyone else that the buzzer is locked
  io.to("quiz_arena").emit("buzzer:locked", {
    winnerName: socket.data.username,
    winnerId: socket.id,
    timeLimit: 10
  });
});
```

#### D. Answer Submission & MongoDB Score Update
```javascript
socket.on("answer:submit", async ({ selectedAnswer }, callback) => {
  // Only the buzzer winner can submit!
  if (!quizState.buzzerWinner || quizState.buzzerWinner.socketId !== socket.id) {
    return callback({ success: false, message: "You do not have the buzzer lock!" });
  }

  const isCorrect = selectedAnswer === quizState.currentQuestion.correctAnswer;
  const username = socket.data.username;

  if (isCorrect) {
    const currentScore = quizState.scores.get(username) || 0;
    const newScore = currentScore + quizState.currentQuestion.points;
    quizState.scores.set(username, newScore);

    // Update MongoDB Score
    await Score.findOneAndUpdate(
      { username },
      { $inc: { score: quizState.currentQuestion.points, correctAnswersCount: 1 } },
      { upsert: true, new: true }
    );
  }

  // Announce results to all participants
  io.to("quiz_arena").emit("answer:result", {
    isCorrect,
    username,
    correctAnswer: quizState.currentQuestion.correctAnswer,
    leaderboard: Array.from(quizState.scores.entries()).map(([user, pts]) => ({ username: user, score: pts }))
  });

  // Reset winner state
  quizState.buzzerWinner = null;
  quizState.status = "IDLE";

  callback({ success: true, isCorrect });
});
```

---

## 🧪 Testing Guide

To test the system within one day, you do **not** need a frontend. You can simulate the scenario using **3 lightweight terminal scripts** using `socket.io-client`:

### 1. `test-clients/admin-client.js`
```javascript
const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Admin connected:", socket.id);

  // 1. Start the quiz
  socket.emit("admin:start_quiz", {}, (res) => {
    console.log("Quiz Start Response:", res);

    // 2. After 3 seconds, send question 1
    setTimeout(() => {
      socket.emit("admin:next_question", {}, (qRes) => {
        console.log("Question 1 Sent:", qRes);
      });
    }, 3000);
  });
});
```

### 2. `test-clients/player1-client.js` (Fast Buzzer)
```javascript
const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");

// Listen for global website popup notification
socket.on("announcement:quiz_start", (data) => {
  console.log("\n🔔 POPUP NOTIFICATION RECEIVED:", data.message);

  // Join the arena
  socket.emit("quiz:join", { username: "Alice" }, (res) => {
    console.log("Join response:", res.message);
  });
});

// When question arrives, hit buzzer immediately
socket.on("question:new", (q) => {
  console.log(`\n[Question ${q.order}]: ${q.questionText}`);
  console.log("Options:", q.options);

  console.log("⚡ Alice is pressing the buzzer!");
  socket.emit("buzzer:press", {}, (ack) => {
    console.log("Buzzer Result:", ack);
    if (ack.success) {
      // Submit answer after 2 seconds
      setTimeout(() => {
        socket.emit("answer:submit", { selectedAnswer: "HTTP" }, (ansAck) => {
          console.log("Answer Result:", ansAck);
        });
      }, 2000);
    }
  });
});

socket.on("buzzer:locked", (data) => {
  console.log(`🔒 Buzzer locked by ${data.winnerName}!`);
});

socket.on("answer:result", (res) => {
  console.log("\n📊 Round Result:", res);
});
```

### 3. `test-clients/player2-client.js` (Slow Buzzer)
Create a second player (`Bob`) who hits the buzzer 200ms after Alice:
```javascript
setTimeout(() => {
  socket.emit("buzzer:press", {}, (ack) => {
    console.log("Bob Buzzer Result:", ack); // Must show: "Too slow! Alice buzzed first."
  });
}, 200);
```

---

## ⚠️ Crucial Gotchas & Security Pitfalls

1. **NEVER emit `correctAnswer` in `question:new`!**
   Players can inspect incoming socket payloads. If you send `{ correctAnswer: "HTTP" }` to the room, any player using dev tools can cheat effortlessly. Always keep the answer on the server inside `quizState.currentQuestion` or MongoDB.
2. **Preventing Race Conditions:**
   Two players might click their buzzer within 1 millisecond. The server check must be synchronous before any `await`:
   ```javascript
   if (quizState.buzzerWinner !== null) return callback({ success: false });
   quizState.buzzerWinner = socket.id; // Lock instantly!
   ```
3. **Player Disconnection with the Lock:**
   What if Alice buzzes, locks the buzzer, and then immediately closes her browser?
   Inside `socket.on("disconnect")`:
   ```javascript
   if (quizState.buzzerWinner?.socketId === socket.id) {
     quizState.buzzerWinner = null;
     quizState.status = "QUESTION_ACTIVE";
     io.to("quiz_arena").emit("buzzer:unlocked", { reason: "Buzzer winner disconnected" });
   }
   ```
4. **Rooms vs Broadcasts:**
   - The popup announcement is sent to **everyone on the website**: `io.emit("announcement:quiz_start", ...)`.
   - The question and buzzer events are sent **only to players who joined the quiz arena**: `io.to("quiz_arena").emit(...)`.

---

## 🏆 Definition of Done (Student Checklist)
- [ ] MongoDB connects properly alongside Express and Socket.IO.
- [ ] Questions are seeded in MongoDB.
- [ ] Admin event triggers global announcement popup.
- [ ] Players join the `"quiz_arena"` room with custom usernames.
- [ ] Admin dispatches questions 1-by-1 from MongoDB without leaking the correct answer.
- [ ] First buzzer press locks the state; subsequent simultaneous presses are rejected.
- [ ] Buzzer winner submits answer; points are awarded and updated in MongoDB.
- [ ] Disconnecting while holding the buzzer unlocks it cleanly.
- [ ] Tested successfully with 1 Admin and at least 2 simultaneous Player client scripts.
