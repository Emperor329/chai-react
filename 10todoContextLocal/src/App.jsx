import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import {TodoForm,Todoitem} from './components'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => { // here todo comes from todoContext as a 'String'
    // setTodos(todo) here it replaces old todo 
    // setTodos((prevTodo) => [todo,...prevTodo,]) here todo is an object and cannot be passed directly into array(todos)
    setTodos((prev) => [{id:Date.now(),...todo},...prev])
  }
  const updateTodo = (id,todo) => {
    setTodos((prev) => prev.map((prevTodo) => // here prev is todos[]
    
    (prevTodo.id === id ? todo: prevTodo ) //  here prevTodo is an invidual todo{}
    ))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => (prevTodo.id !== id )))/// in filter method just provide condition to return required data
  }
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed}:prevTodo ) ))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0){
      setTodos(todos)
    }
  },[])

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])


  return (
  <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */}
                        <TodoForm/> 
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'>
                            <Todoitem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
  </TodoProvider>
  )
}

export default App
