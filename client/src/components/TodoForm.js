import React, { useState } from 'react';
import API from '../services/api';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/todos', { title, description });
      onAdd(res.data); // értesítjük a parent-t
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err.response?.data?.message || 'Hiba történt');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Todo címe"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Leírás"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Hozzáadás</button>
    </form>
  );
}

export default TodoForm;