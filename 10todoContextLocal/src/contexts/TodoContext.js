import { createContext,useContext } from "react";

export const TodoContext = createContext({// context is stored as an object
    todos: [
        {
            id:1,
            todo:"drink water",
            completed: false,
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id,todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider