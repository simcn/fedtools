import './App.css';

import { useState, useRef, useEffect } from "react"

function App() {

  const tnode = useRef(null);

  const [box, setBox] = useState({
    lock: 1,
    width: '375px',
    height: '667px',
  })


  const calsize = (n, x) => {
    let _n = +n.replace("px", "")
    return _n * x;
  }


  useEffect(() => {

    if (window.ResizeObserver) {
      const input = tnode.current;
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          if (entry.contentBoxSize && tnode.current) {
            let width = tnode.current.style.width;
            let height = tnode.current.style.height;
            setBox({
              width: width,
              height: height,
            })
          }
        }
      });
      resizeObserver.observe(input);
    }

  }, [])


  const _onChange = function (value, key) {


    if(box.lock){





    }


    let _one = {}
    _one[key] = value;
    let _box = Object.assign({}, box, _one);




    setBox(_box)
  }

  return (
    <div className="App">
      <div className='pages'>

        <textarea ref={tnode} style={{
          width: box.width,
          height: box.height
        }}></textarea>

      </div>
      <div className='tools'>
        <h2>输出</h2>
        <div className='items'>
          <div>
            宽:
            <input onChange={(e) => { _onChange(e.target.value, 'width') }} value={box.width} ></input>
            <span>2x: {calsize(box.width, 2) + 'px'}</span>
            <span>3x: {calsize(box.width, 3) + 'px'}</span>
          </div>
          <div>
            高:
            <input onChange={(e) => { _onChange(e.target.value, 'height') }} value={box.height} ></input>
            <span>2x: {calsize(box.height, 2) + 'px'}</span>
            <span>3x: {calsize(box.height, 3) + 'px'}</span>
          </div>
          <div>
            锁定:
            <label><input onClick={(e) => { _onChange(0, 'lock') }} type="radio" name="lock" defaultChecked={box.lock === 0} /> 不锁比例</label>
            <label><input onClick={(e) => { _onChange(1, 'lock') }} type="radio" name="lock" defaultChecked={box.lock === 1} />  锁比例</label>
          </div>

          {/* {JSON.stringify(box)} */}

        </div>
      </div>
    </div>
  );
}

export default App;



let dd = {
  "data":"开始",
  "i":0,
  "change":function(){

    this.begin()

    var item = ["变化1","变化2","变化3"]

    this.end()
    return item[this.i++]
  },
  "begin":function(){
    console.log("begin")
  },
  "end":function(){
    console.log("end")
  }
}