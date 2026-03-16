import React, { useEffect, useState } from 'react';
import API from '../services/api';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await API.get('/todos');
      setTodos(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || 'Hiba történt');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = (newTodo) => setTodos([...todos, newTodo]);
  const handleDelete = (id) => setTodos(todos.filter(todo => todo.id !== id));
  const handleUpdate = (updatedTodo) =>
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));

  return (
    <div>
      <h2 id="todo-title">Todo lista</h2>
      <TodoForm onAdd={handleAdd} />
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}

export default TodoList;