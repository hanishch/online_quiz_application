# Online Quiz Application

Overview

The Online Quiz Application is a lightweight and interactive web-based quiz platform designed for students and educators.
It allows users to take multiple-choice quizzes with a timer, instant scoring, and immediate feedback after each question.
The app can load questions dynamically from the Open Trivia DB API, making quizzes flexible and fun for all learning levels.

# Features

- Multiple-choice questions
- Timer for each quiz session
- Instant score and feedback display
- Dynamic question loading via Open Trivia DB API
- Next and Restart quiz functionality
- Responsive and mobile-friendly UI
- Lightweight and fast — runs entirely in the browser

# Technologies Used

- HTML5 – for webpage structure
- CSS3 – for styling and layout
- JavaScript (ES6) – for quiz logic and interactivity
- Open Trivia DB API – for fetching real-time quiz questions

# Working

- On load, the app fetches quiz questions from the Open Trivia DB API.
- The user selects a category (e.g., HTML, CSS, JavaScript).
- A timer starts when the quiz begins.
- After each answer submission, the app displays immediate feedback (correct/incorrect).
- At the end of the quiz, a final score is shown along with an option to restart.
- The interface is fully responsive and runs smoothly on desktop and mobile.

# Key Concepts

- Fetch API: Used to get quiz data from the Open Trivia DB API.
- DOM Manipulation: Dynamically updates questions and options.
- Event Listeners: Handles user interactions (next question, restart, etc.).
- Timer Function: Tracks time for each quiz and stops automatically when finished.
