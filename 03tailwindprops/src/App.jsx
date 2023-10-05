import { useState } from 'react'

import './App.css'
import Card from '../components/Card.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* install tailwin css intellisense */}
      <h1 className=' flex-wrap bg-green-500 p-4 rounded -xl'>check tailwind</h1>
        <Card username="narendra" buttonText="check out profile"/>
        <Card username="mallika" buttonText='use this'/>
        
    </>
  )
}

export default App
