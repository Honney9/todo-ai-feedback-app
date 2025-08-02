# 📝 AI Todo & Feedback App

A full-stack web app built with:

✅ FastAPI backend  
✅ React + Vite + Tailwind frontend  
✅ Connects to OpenAI / LLM to answer user questions  
✅ Simple Todo manager with add, edit, delete

---

## 📦 Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: FastAPI (Python)
- AI: OpenAI API (can swap for open-source)
- Axios for HTTP calls

---

## ✨ Features

- Ask AI any question → get instant answer
- Manage todos:
  - Add new todo
  - Edit existing todo
  - Delete todo
- Modern, responsive UI

---

## 🚀 Setup & Run locally

### 1️⃣ Clone repo
```bash
git clone https://github.com/Honney9/todo-ai-feedback-app.git


cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install httpx fastapi python-dotenv

# Create .env file with:
OPENAI_API_KEY=your_key

# Run server
uvicorn main:app --reload --port 5000
