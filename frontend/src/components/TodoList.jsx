import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_URL = `${API_BASE_URL}/api/todos`;

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data.todos);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await axios.post(API_URL, { text });
      setText('');
      fetchTodos();
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const updateTodo = async (id) => {
    if (!editText.trim()) return;
    try {
      await axios.put(`${API_URL}/${id}`, { text: editText });
      setEditingId(null);
      setEditText('');
      fetchTodos();
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">✅ Todo List</h2>

      <form onSubmit={addTodo} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add new todo"
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 cursor-pointer transition"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-gray-50 rounded px-3 py-2"
          >
            {editingId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1 mr-2"
                />
                <button
                  onClick={() => updateTodo(todo.id)}
                  className="text-green-600 hover:text-green-800 cursor-pointer"
                  title="Save"
                >
                  💾
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-500 hover:text-gray-700 ml-2 cursor-pointer"
                  title="Cancel"
                >
                  ✖
                </button>
              </>
            ) : (
              <>
                <span className="flex-1">{todo.text}</span>
                <button
                  onClick={() => startEditing(todo.id, todo.text)}
                  className="text-yellow-600 hover:text-yellow-800 cursor-pointer"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-600 hover:text-red-800 ml-2 cursor-pointer"
                  title="Delete"
                >
                  🗑️
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
