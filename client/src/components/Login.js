import React, { useState } from 'react';
import API from '../services/api';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token); // token mentése
      onLogin(res.data.token); // értesítjük App.js-t
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Hiba történt');
    }
  };

  return (
    <div>
      <h2>Bejelentkezés</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Felhasználónév"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Jelszó"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Bejelentkezés</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}

export default Login;