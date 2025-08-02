from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from ai import get_ai_answer
from todos import router as todo_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todo_router)

@app.post("/api/ask")
async def ask_question(request: Request):
    body = await request.json()
    question = body.get("question")

    if not question:
        return {"error": "Question is required"}

    try:
        answer = await get_ai_answer(question)
        return {"answer": answer}
    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}