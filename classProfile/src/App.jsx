import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [show, setShow] = useState(false)

  return (
    <>
      <div className='container'>
        <p>
          click below button!!
        </p>
        <div>
          <button onClick={()=>setShow(!show)}>
            {show ?"Hide":"View"}
          </button>
        </div>
      </div>
      {show && "view less"}
    </>
  )
}

export default App
