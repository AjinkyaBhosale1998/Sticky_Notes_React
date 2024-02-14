import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (id) => {
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
      saveToLS();
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <div>
      <h1 class="text-4xl mb-8 mt-4 font-bold flex items-center justify-center text-violet-800 hover:text-violet-950">To-Do List React</h1>

      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-1/2">
        <div className="addTodo flex items-center">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md mr-2"
            placeholder="Add a todo..."
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md"
          >
            Add
          </button>
        </div>
        <h2 className="text-lg font-bold mt-4">Your Todos</h2>
        <div className="todos">
          {todos.map((item) => (
            <div
              className="todo flex w-full my-3 justify-between items-center"
              key={item.id}
            >
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => handleCheckbox(item.id)}
                className="mr-2"
              />
              <div
                className={`flex-grow ${
                  item.isCompleted ? "line-through" : ""
                }`}
              >
                {item.todo}
              </div>
              <div className="buttons flex">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
