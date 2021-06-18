import React, { useState, useEffect } from 'react';


import DB from './service';

import './App.css';


function App() {

  const db = new DB();

  const [hisData, upHisData] = useState([]);



  useEffect(() => {

    upHisData(['#000fff', "#00ff00"])


  }, []);


  const pasteData = async (data) => {
    var clipData = data.clipboardData.getData('Text');

    // TODO 格式校验

    await db.add({
      color: clipData
    });


  }


  // upHisData(['#ffffff'])

  return (
    <div className="colorBox">
      <div className="rbox">
        <h2>历史</h2>
        <div className="his">
          <ul>
            {hisData.map((item, index) => {
              return <li key={'colorBoxhis' + index}>{item}</li>
            })}
          </ul>
        </div>
      </div>
      <div className="lbox">

        <h2>输入色彩值</h2>
        <div className="inputbox">
          <textarea onPaste={(e) => { pasteData(e) }}></textarea>
        </div>

      </div>

    </div>
  );
}


const App365 = () => {
  const datas = [];
  var x = 0;
  for (var i = 0; i < 365; i++) {
    datas.push(i + 1)
    x+= i;
  }

  console.log(x);
  return (
    <div className="page_app365">
      <h2>h2</h2>
      <div className="app365">
        {datas.map((item) => {
          return (
            <div key={'datas' + item}>{item}</div>
          )
        })}
      </div>
    </div>
  )
}

export default App365;
