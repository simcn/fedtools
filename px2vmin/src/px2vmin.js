import React, { Component } from "react";
import copy from 'copy-text-to-clipboard';


class PxTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tablelist: [],
      tablelist100: [],
      width: 375,
    };
  }

  //   static getDerivedStateFromProps(props, state) {
  //     return {
  //       tablelist: props.tablelist,
  //     };
  //   }

  componentDidMount() {
    this._markData();
  }

  _markData(){
    var x = [];
    for (var i = 3; i <= 100; i++) {
      x.push({
        px: i,
        vw375: this._formatDigt(i /375),
        vw750: this._formatDigt(i /750),
      });
    }
    this.setState({
      tablelist: x,
    });

    var x1 = [];
    for (var j = 100; j <= 750; j+=5) {
      x1.push({
        px: j,
        vw375: this._formatDigt(j /375),
        vw750: this._formatDigt(j /750),
      });
    }
    this.setState({
      tablelist100: x1,
    });


  }


  mounting() {}

  _formatDigt(x){
    const s_x = String(x * 100);
    if(s_x.length >= 15){
        return +s_x.substr(0, 6)
    }
    return x * 100;
  }

  onCopy(c){
    copy(c);
  }

  render() {
    const { tablelist, tablelist100 } = this.state;

    if(tablelist && tablelist.length === 0){
        return null;
    }
    return (
      <div className="pxtable">
        <table>
          <tbody>
            <tr>
                <th>单位</th>
                <th>375</th>
                <th>750</th>
            </tr>
            {tablelist.map((item, index)=>{
                return (
                <tr key={'tr' + index}>
                    <td>{item.px}px</td>
                    <td onClick={()=>{this.onCopy(item.vw375 + 'vw')}} title="点击复制">
                    {item.vw375 + 'vw'}
                    </td>
                    <td onClick={()=>{this.onCopy(item.vw750 + 'vw')}} title="点击复制">
                    {item.vw750 + 'vw'}
                    </td>
                </tr>
                )
            })}
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
                <th>单位</th>
                <th>375</th>
                <th>750</th>
            </tr>
            {tablelist100.map((item, index)=>{
                return (
                <tr key={'tr' + index}>
                    <td>{item.px}px</td>
                    <td onClick={()=>{this.onCopy(item.vw375 + 'vw')}} title="点击复制">
                    {item.vw375 + 'vw'}
                    </td>
                    <td onClick={()=>{this.onCopy(item.vw750 + 'vw')}} title="点击复制">
                    {item.vw750 + 'vw'}
                    </td>
                </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}



export default PxTable;
