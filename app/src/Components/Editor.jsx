import React, { useRef, useState } from 'react';
import AceEditor from 'react-ace';
import axios from "axios"

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/theme-monokai';

const Editor = () => {
  const editorRef = useRef(null);
  const [code, setcode] = useState("console.log('hello world')")

  const handleChange = (newValue) => {
    setcode(newValue)
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:4000/run/run", {
      code,
      len: "cpp"
    })
  }

  return (  
    <>
    <AceEditor
      ref={editorRef}
      value={code}
      mode="c_cpp"
      theme="monokai"
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      onChange={handleChange}
      setOptions={{
        tabSize: 2,
        useWorker: false,
      }}
    />
    <button onClick={handleSubmit}>submit</button>
    </>
  );
};

export default Editor;
