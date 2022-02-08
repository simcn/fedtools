import './App.css';

import { useState, useRef, useEffect } from "react"

function App() {

  const tnode = useRef(null);

  const [box, setBox] = useState({
    lock: true,
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
        </div>
      </div>
    </div>
  );
}

export default App;
