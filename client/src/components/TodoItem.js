import React from 'react';
import API from '../services/apiconnector';

function TodoItem({ todo, onDelete, onUpdate }) {
  const handleDelete = async () => {
    try {
      await API.delete(`/todos/${todo.id}`);
      onDelete(todo.id);
    } catch (err) {
      console.error(err.response?.data?.message || 'Hiba történt');
    }
  };

  const handleToggleComplete = async () => {
    try {
      const res = await API.put(`/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed
      });
      onUpdate(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || 'Hiba történt');
    }
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <h3 style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.title}
      </h3>
      <p>{todo.description}</p>
      <button onClick={handleToggleComplete}>
        {todo.completed ? 'Visszaállítás' : 'Kész'}
      </button>
      <button onClick={handleDelete}>Törlés</button>
    </div>
  );
}

export default TodoItem;