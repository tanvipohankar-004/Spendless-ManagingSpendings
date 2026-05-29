# 💰 SpendLess - Personal Budget Tracker

SpendLess is a lightweight, browser-based personal finance tracker that helps users manage income and expenses efficiently. It provides real-time balance updates and persistent storage using LocalStorage, making it simple and practical for everyday budgeting.
---

## ▶️ Getting Started

### Visit Here 
https://spendless-managingspendings.netlify.app/

---

## 🚀 Features

- 📊 Add and manage income and expenses
- 💸 Track total balance in real-time
- 🧾 Categorized expense list (e.g., Rent, Food, Utilities)
- 🗑️ Delete individual expenses
- 💾 Persistent data storage using `localStorage`
- ⚡ Instant UI updates without page refresh
- 📱 Simple and responsive design

---

## 🛠️ Tech Stack

- HTML5 – Structure
- CSS3 – Styling
- Vanilla JavaScript (ES6) – Logic & functionality
- LocalStorage API – Data persistence

---

## 📂 Project Structure

spendless/
│
├── index.html
├── style.css
├── script.js
└── README.md

---

## ⚙️ How It Works

1. User sets an initial income (default value is used if not provided).
2. Expenses are stored as objects with:
   - id
   - title
   - amount
3. Data is saved in localStorage to persist across sessions.
4. UI automatically recalculates:
   - Total Income
   - Total Expenses
   - Remaining Balance

---

## 💡 Example Default Data

- Income: 10000
- Expenses:
  - House Rent → 5000
  - Food → 2000

---

## 📌 Future Improvements

- Add monthly reports & charts
- Add login system
- Cloud sync using backend (Spring Boot / Node.js)
- Category-wise analytics
- Dark mode UI

---

## 🧑‍💻 Author

Built by: Tanvi Pohankar  
For learning and portfolio purposes.

---

## 📜 License

This project is open-source and free to use for learning purposes.
