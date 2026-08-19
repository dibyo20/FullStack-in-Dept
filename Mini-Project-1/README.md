# 📋 Task Manager (Mini-Project-1)

A responsive, modern task management application built as part of the **FullStack Depth Study**. This project demonstrates state management using **Redux Toolkit** and styling with **Tailwind CSS v4** in a **React** application powered by **Vite**.

---

## 🚀 Key Features

*   **Task CRUD Operations**: Seamlessly add, toggle completion status, and delete tasks.
*   **Real-time Analytics Dashboard**:
    *   Dynamic counters for **Total**, **Pending**, and **Completed** tasks.
    *   Interactive **Progress Bar** reflecting the overall completion percentage.
*   **Filterable Task List**: Switch between **All**, **Completed**, and **Pending** views with immediate UI updates.
*   **Responsive Modern Design**: Sleek glassmorphism details, subtle shadow effects, and responsive layout scaling for mobile, tablet, and desktop screens.
*   **Empty State Guidance**: Friendly illustration messages prompting users when no tasks match their current filter or when the list is empty.

---

## 🛠️ Tech Stack & Architecture

This project is built using a modern frontend stack:

| Technology | Purpose | Key Details |
| :--- | :--- | :--- |
| **React 19** | UI Library | Utilizes functional components and custom hooks |
| **Redux Toolkit & React-Redux** | Global State Management | Configured store with actions for adding, deleting, and toggling tasks |
| **Tailwind CSS v4** | Utility-First Styling | Integration via `@tailwindcss/vite` for superfast build-time processing |
| **Vite 7** | Development Server & Bundler | Extremely fast HMR and optimized production build |

### Project Directory Structure

```text
Mini-Project-1/
├── src/
│   ├── app/
│   │   └── store.js           # Redux store configuration
│   ├── components/
│   │   ├── AddTask.jsx        # Component for adding new tasks
│   │   ├── TaskCard.jsx       # Individual task item card layout
│   │   ├── TaskList.jsx       # List container with status-filtering tabs
│   │   └── TaskStats.jsx      # Statistics cards and progress bar indicator
│   ├── Features/
│   │   └── taskSlice.js       # Redux slice with reducers & actions
│   ├── index.css              # Main CSS file importing Tailwind
│   ├── main.jsx               # Entrypoint wrapping App with Redux Provider
│   └── App.jsx                # Main layout shell of the application
├── index.html                 # HTML skeleton
├── vite.config.js             # Vite configuration with Tailwind CSS plugin
├── package.json               # Dependencies and build scripts
└── README.md                  # Project documentation
```

---

## 🏁 Getting Started

To run this project locally, follow these simple steps:

### Prerequisites

Make sure you have **Node.js** (v18+ recommended) and **npm** installed on your system.

### Installation

1. Clone or navigate to the repository folder:
   ```bash
   cd Mini-Project-1
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

3. Launch the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local address provided (usually `http://localhost:5173`).

---

## 📖 What We Learned / Core Concepts Demonstrated

1. **State Reducer Pattern**: Created a predictable state container using `@reduxjs/toolkit` with `createSlice` to cleanly encapsulate mutations on tasks.
2. **Tailwind v4 Integration**: Explored the new Tailwind CSS v4 compiler setup with Vite, using raw Tailwind imports in CSS and utility classes directly.
3. **Derived State**: Computed counters and percentages on-the-fly inside components from the global store, preventing stale states and keeping UI selectors performant.
4. **Conditional UI Styling**: Dynamic badge highlights (`emerald` vs `amber`) and title animations (`line-through` text transition) based on task state.
