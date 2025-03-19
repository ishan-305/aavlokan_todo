import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      text: "DoDSA",
      completed: false,
    },
  ],
  addTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  toggleTodo: () => {},
});

export const TodoProvider = TodoContext.Provider;

export const useTodo = () => {
  return useContext(TodoContext);
};
