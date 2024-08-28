import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  // let counter = 99
  let [counter,setCounter] = useState(14)

   const addValue = () => {
      if (counter >= 20) {
        setCounter(counter = " cannot be greaterthan 20  ")  
      }
        else{
          counter = counter + 1
          setCounter(counter)
          console.log("test check",Math.random(),counter);
        }
      }
    const removeValue = () =>{
      if(counter == 0){
        setCounter(counter = " cannot be lessthan 0 ")  
       }
       else{
        counter = counter-1
      setCounter(counter)
       }
    }

  return (
    <>
      <h1>Dont lose focus</h1>
      <h2>countervalue: {counter}</h2>
      <button onClick={addValue}>Add value {counter}</button>
      <br />
      <button onClick={removeValue}>Remove value{counter}</button>
      <br />
      <a href="http://">clickme {counter}</a>
    </>
  )
}

export default App
