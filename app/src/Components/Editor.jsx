import React, { useRef, useState, useEffect } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import "./editor.css"
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";


const lenguages = [
  {name: "python", short: "py"},
  {name: "javascript", short: "js"},
  {name: "c_cpp", short: "cpp"},
]

const Editor = () => {
  const editorRef = useRef(null);
  const [code, setcode] = useState("print('hello worlda')");
  const [lenguage, setLenguage] = useState(lenguages[0].short);
  const [aceLenguage, setAceLenguage] = useState(lenguages[0].name)
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

  useEffect(() => {
    const l = lenguages.filter(el => el.short === lenguage)
    setAceLenguage(l[0].name)
  }, [lenguage])
  

  return (
    <div className="container">
      <AceEditor
        ref={editorRef}
        width="100%"
        value={code}
        mode={aceLenguage}
        theme="monokai"
        fontSize={14}
        showPrintMargin={true}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        showGutter={true}
        highlightActiveLine={true}
        onChange={handleChange}
        setOptions={{
          tabSize: 2,
          useWorker: true,
        }}
      />
      <br />
      <button onClick={handleSubmit}>submit</button>
      <br />
      <br />
      Lenguage :{" "}
      <select onChange={(e) => setLenguage(e.target.value)}>
        {lenguages.map(e => {
          return <option key={e.short} value={e.short}>{e.name}</option>
        })}
      </select>
      {response && (
        <div className="response">
          {response.success ? (
            <div >
              <h1>Success</h1>
              <div className="success">{response.message}</div>
            </div>
          ) : (
            <div >
              <h1>Failed</h1>
              <div className="failed">
                {response.message.split("\r\n").map(e => {
                  return <p>{e}</p>
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Editor;
