import React, { useState } from 'react';
import axios from 'axios';

export default function QuestionForm() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setAnswer('Thinking...'); // optional loading text
    try {
      const res = await axios.post('http://localhost:5000/api/ask', { question });
      console.log('Response from backend:', res.data);
      if (res.data.answer) {
        setAnswer(res.data.answer);
      } else {
        setAnswer('No answer received');
      }
    } catch (err) {
      console.error('Error fetching answer:', err);
      setAnswer('Error fetching answer');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">🤖 Ask AI a Question</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
          rows="3"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-indigo-600 transition self-end mt-2 sm:mt-0">Ask</button>
      </form>
      {answer && (
        <div className="mt-4 bg-gray-50 rounded p-3">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
