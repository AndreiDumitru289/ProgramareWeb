import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  function handleAdd() {
    if (input.trim() === '') return;
    setTodos([...todos, input]);
    setInput('');
  }

  return (
    <div>
      <h3>Todo List</h3>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Adauga un task..."
      />

      <button onClick={handleAdd}>Adauga</button>

      <ul>
        {todos.map(function(todo, index) {
          return <li key={index}>{todo}</li>;
        })}
      </ul>
    </div>
  );
}

export default TodoList;