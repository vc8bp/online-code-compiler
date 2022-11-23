import { useState } from 'react'
import Editor from './Components/Editor'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Online Code Editor</h1>
      <Editor/>
    </>
  )
}

export default App
