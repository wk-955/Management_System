import React from "react";
import {
  Chart,
  Geom,
  Tooltip,
} from "bizcharts";
import DataSet from "@antv/data-set";

const DataNumberChart =(props) => {
    const  {data} =props
    
    const ds = new DataSet();
    const dv = ds.createView().source([data]);
    dv.transform({
        type: "fold",
        fields: Object.keys[data],
        // 展开字段集
        key: "label",
        // key字段
        value: "value" // value字段
      })

    const scale = {
        label: {
            type:'timeCat',
            alias: '日期' // 为属性定义别名
          },
        value: {
            alias: '数据量' // 为属性定义别名
        }
    }
    return (
        <Chart 
        height={50} 
        data={dv} 
        padding={0}
        scale={scale}
        style={{width:'100%',textAlign:"center",padding:0}}
        forceFit
        filter={[
            ['value', val => val >0] // 图表将会只渲染 x 字段数值大于 20 的数据
        ]}
        >
          <Tooltip/>
          <Geom type="interval" position="label*value"  />
        </Chart>
    );
}


export default DataNumberChart