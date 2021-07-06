import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import copy from 'copy-text-to-clipboard';
import rgb2hex from 'rgb2hex';
import './App.css';

function App() {

  const [hisData, upHisData] = useState('');
  const [img, upImg] = useState('');

  const ref2 = useRef('');
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  const cas = (c, ctx) => {
    // console.log(_img.width)
    c.width = ref2.current.width;
    c.height = ref2.current.height;
    ctx.drawImage(ref2.current, 0, 0);
    var imageD = ctx.getImageData(0, 0, ref2.current.width, ref2.current.height);
    var pdata = imageD.data;

    var out = {};
    for (var j = 0; j < pdata.length; j += 4) {
      let key = [pdata[j],pdata[j + 1],pdata[j + 2]].join(',');
      out[key] = [pdata[j],pdata[j + 1],pdata[j + 2]];
    }
    upHisData(out);
  }

  const getblob = (blob) => {
    var x = URL.createObjectURL(blob);
    upImg(x);
  }

  // TODO 锐化图片


  const pasteData = async (event) => {
    navigator.permissions.query({
      name: "clipboard-read"
    }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.clipboard.read().then((data) => {
          for (let i = 0; i < data.length; i++) {
            if (!data[i].types.includes("image/png")) {
              alert("只能接收剪切板输出的图片");
            } else {
              data[i].getType("image/png").then(getblob);
            }
          }
        });
      }
    });
  }

  const imgLoad = () => {
    cas(c, ctx);
  }

  // upHisData(['#ffffff'])


  return (<div className="colorBox" >
    <div className="rbox">
      <div className="his">
        <ColorNode hisData={hisData}></ColorNode>
        </div>
    </div>
    <div className="lbox">
      <h2>从剪切板贴入图片</h2>
      <div className="inputbox" >
        <textarea placeholder={'只能接收剪切板输出的图片'} onPaste={(e) => { pasteData(e) }} ></textarea>
      </div>
      {/* style={{'transform':' scale(0.5)'}} */}
      <div><img ref={ref2} src={img} alt="" onLoad={()=>{imgLoad()}}></img></div>
    </div>
  </div>
  );
}

const ColorNode = (props) => {
  const {hisData} = props;
  if(hisData === ''){
    return null;
  }
  let outRGB = Object.keys(hisData);
  return (
    <div className="his-box">
      {outRGB.map((items)=>(<ColorItem item={items}></ColorItem>))}
    </div>
  )
}

const ColorItem = (props) => {

  const {item} = props;
  const rgb = rgb2hex('rgb(' +  item + ')');

  // toString

  const onCopy = (c)=>{
    copy(c.toLocaleUpperCase());
  }



  return (
    <div className="items" style={{backgroundColor:rgb.hex}} onClick={()=>{onCopy(rgb.hex)}}>
      <div>{rgb.hex}</div>
      <div style={{color:"#ffffff"}}>{rgb.hex}</div>
    </div>
  )
}



// const App365 = () => {
//   const datas = [];
//   var x = 0;
//   for (var i = 0; i < 365; i++) {
//     datas.push(i + 1)
//     x += i;
//   }

//   console.log(x);
//   return (<
//     div className="page_app365" >
//     <
//     h2 > h2 < /h2> <
//     div className="app365" > {
//           datas.map((item) => {
//             return (<
//           div key={
//                 'datas' + item
//               } > {
//                 item
//               } < /div>
//               )
//       })
//     } <
//     /div> <
//     /div>
//               )
// }

export default App;