import React, {useEffect, useRef, useState} from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag' 
import 'codemirror/addon/edit/closebrackets'


function Editor() {

  const IsInit = useRef(false)
  const [code, setCode] = useState("")
  const [code2, setCode2] = useState("")

  useEffect(() => {
    const init = () => {
      if(IsInit.current) return
      IsInit.current = true
      CodeMirror.fromTextArea(document.getElementById("area"), {
        mode: {name: 'javascript', json: true},
        theme: 'dracula',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true
      })
    } 
    init()
    
  }, [])

  const handleSubmit = async () => {
    console.log(document.getElementById("area").value)
    console.log(code)
      const res = await fetch("http://localhost:4000/run/cpp", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({len: "py", code: code2})
      })
  }
  


  return (
    <div>
      <textarea id="area"></textarea> 
      <textarea value={code2} onChange={e => setCode2(e.target.value)}></textarea>
      <button onClick={handleSubmit} >Submit</button>
    </div>
  )
}

export default Editor