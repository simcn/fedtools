import { useEffect, useRef, useState } from "react";

import html2canvas from 'html2canvas';


// 文档
// https://github.com/PrismJS/prism/blob/388ad996c4b576205de4d4feda69202bd26c1345/components.json


import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import './App.scss';

function App() {

  const [code, setCode] = useState("")
  const [outimg, setOutimg] = useState("")
  const [prismCode, setPrismCode] = useState("");

  // 输入的code
  const codeNode = useRef(null)

  // 美化的code
  const prismCodeNode = useRef(null)







  useEffect(() => {


    html2canvas(prismCodeNode.current).then((canvas) => {
      let img = canvas.toDataURL("image/png")
      setOutimg(img)
    })

  }, [prismCode, code])


  const codeChange = (e) => {
    if (e.target.value) {
      setCode(e.target.value)
    }
  }

  return (
    <div className="app">
      <div className='input_box'>
        <textarea ref={codeNode} style={{ padding: 10, border: "0 none" }} value={code} id="code" onChange={codeChange}></textarea>
      </div>
      <div className='tool_box'>
        <div ref={prismCodeNode}>
        <SyntaxHighlighter language="javascript" style={docco}>
          {code}
        </SyntaxHighlighter>
        </div>
      </div>
      <div className='out_box'>
        {outimg && (<img src={outimg} alt="outcode" />)}
      </div>
    </div>
  );
}

export default App;
