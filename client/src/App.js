import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Manager App</h1>
      {!token ? (
        <>
          <Register />
          <Login onLogin={setToken} />
        </>
      ) : (
        <TodoList />
      )}
    </div>
  );
}

export default App;