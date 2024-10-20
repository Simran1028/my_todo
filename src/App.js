import React, { useState } from 'react'
import './App.css';

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [editTodoId, setEditTodoId] = useState(null)
  const [editedText, setEditedText] = useState('')

  const addTodo = () => {

    if (inputValue.trim() !== '') {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
      }
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
    else {
      if (inputValue.trim() === '') {
        alert('Please enter a task')
        return
      }
    }
  }
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  const editTodo = (id, text) => {
    setEditMode(true);
    setEditTodoId(id);
    setEditedText(text);
  }

  const updateTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editTodoId) {
        return { ...todo, text: editedText }
      }
      return todo;
    })
    setTodos(updatedTodos);
    setEditMode(false);
    setEditTodoId(null);
    setEditedText(' ');
  }
  return (
    <div>
      <div className='todo-container'>
        <h2>Todo List</h2>
        <input type="text" value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} />

        {
          editMode ? (
            <div>
              <input type="text" value={editedText}
                onChange={(e) => setEditedText(e.target.value)} />
              <button onClick={updateTodo}>Update</button>
            </div>
          ) : (
            <button onClick={addTodo}>Add</button>
          )
        }



        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <div>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                <button onClick={() => editTodo(todo.id, todo.text)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
