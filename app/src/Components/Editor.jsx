import React, { useRef, useState } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import "./editor.css"

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";

const Editor = () => {
  const editorRef = useRef(null);
  const [code, setcode] = useState("print('hello worlda')");
  const [lenguage, setLenguage] = useState("py");
  const [response, setResponse] = useState();

  const handleChange = (newValue) => {
    setcode(newValue);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("http://localhost:4000/run", {
        code,
        len: lenguage,
      });
      setResponse(data);
    } catch (error) {
      setError("Internal server error");
    }
  };

  return (
    <div className="container">
      <AceEditor
        ref={editorRef}
        width="100%"
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
      <br />
      <button onClick={handleSubmit}>submit</button>
      <br />
      <br />
      Lenguage :{" "}
      <select onChange={(e) => setLenguage(e.target.value)}>
        <option value="js">java script</option>
        <option value="py" selected>
          python
        </option>
        <option value="cpp">c++</option>
      </select>
      {response && (
        <div className="response">
          {response.success ? (
            <div >
              <h1>Success</h1>
              <div className="success">{response.message}</div>
            </div>
          ) : (
            <div className="failed">
              <h1>Failed</h1>
              <div>{response.message}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Editor;
