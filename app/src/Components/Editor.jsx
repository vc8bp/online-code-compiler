import React, {useEffect, useRef} from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag' 
import 'codemirror/addon/edit/closebrackets'

function Editor() {

  const IsInit = useRef(false)

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
  

  return (
    <div>
      <textarea id="area"></textarea> 
      <button>Submit</button>
    </div>
  )
}

export default Editor