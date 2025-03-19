import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts/Todo_Contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((todoObj) => (todoObj.id === id ? todo : todoObj))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todoObj) => todoObj.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todoObj) =>
        todoObj.id == id
          ? { ...todoObj, completed: !todoObj.completed }
          : todoObj
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) setTodos(todos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Tasks
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todoObj) => (
              <div key={todoObj.id} className="w-full">
                <TodoItem todo={todoObj} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
