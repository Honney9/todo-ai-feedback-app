import React from 'react';
import TodoList from './components/TodoList';
import QuestionForm from './components/QuestionForm';

function App() {
  return (
    <div className='max-w-xl mx-auto p-4 md:p-6 lg:p-8 font-sans'>
      <h1 className='text-2xl md:text-3xl font-bold text-center mb-6 text-indigo-600'>AI Todo & Feedback App</h1>
      <div className='space-y-6'>
        <TodoList />
        <QuestionForm />
      </div>
    </div>
  )
}

export default App
