import React, { useState } from 'react';
import './App.css';

const TodoListApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoIndex, setEditingTodoIndex] = useState(null);
  const [editingTodoValue, setEditingTodoValue] = useState('');

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleToggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    setEditingTodoIndex(index);
    setEditingTodoValue(todos[index].text);
  };

  const handleCancelEditTodo = () => {
    setEditingTodoIndex(null);
    setEditingTodoValue('');
  };

  const handleSaveEditTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = editingTodoValue;
    setTodos(updatedTodos);
    setEditingTodoIndex(null);
    setEditingTodoValue('');
  };

  const handleEditingTodoInputChange = (event) => {
    setEditingTodoValue(event.target.value);
  };

  return (
    <div className="container">
      <h1>Todo-List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Enter a new todo..."
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editingTodoIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingTodoValue}
                  onChange={handleEditingTodoInputChange}
                />
                <button onClick={() => handleSaveEditTodo(index)}>Save</button>
                <button onClick={handleCancelEditTodo}>Cancel</button>
              </>
            ) : (
              <>
                <div
                  className={`todo-text ${todo.completed ? 'completed' : ''}`}
                  onClick={() => handleToggleTodo(index)}
                >
                  {todo.text}
                </div>
                <div className="button-container">
                  <button onClick={() => handleEditTodo(index)}>Edit</button>
                  <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListApp;
