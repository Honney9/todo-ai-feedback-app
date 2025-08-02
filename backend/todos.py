from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

todos=[]
todo_id=0

class Todo(BaseModel):
    text: str


@router.get("/api/todos")
def get_todos():
    return {"todos": todos}

@router.post("/api/todos")
async def add_todo(todo: Todo):
    global todo_id
    new_todo= {"id": todo_id, "text": todo.text}
    todos.append(new_todo)
    todo_id += 1
    return {"todo": new_todo}

@router.delete("/api/todos/{id}")
def delete_todo(id: int):
    global todos
    todos= [t for t in todos if t["id"]!=id]
    return {"success": True}

@router.put("/api/todos/{id}")
def update_todo(id: int, todo: Todo):
    for t in todos:
        if t["id"] == id:
            t["text"] == todo.text
            return {"todo": t}
    raise HTTPException(status_code=404 , detail= "Todo not found")

