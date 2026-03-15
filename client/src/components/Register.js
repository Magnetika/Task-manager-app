import React, { useState } from 'react';
import API from '../services/api';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { username, password });
      setMessage(res.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Hiba történt');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Regisztráció</h2>
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
        <button type="submit">Regisztráció</button>
      </form>
      {message && <p style={{color:'green'}}>{message}</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}

export default Register;