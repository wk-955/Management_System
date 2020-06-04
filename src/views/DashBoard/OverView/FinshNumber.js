import React from "react";
import {
  Chart,
  Geom,
  Tooltip,
  Axis,
  Label
} from "bizcharts";
import DataSet from "@antv/data-set";

const FinshNumber =(props) => {
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
    dv.transform({
        type: 'filter',
        callback(row) { // 判断某一行是否保留，默认返回true
          return row.value > 0;
        }
    })

    const scale = {
        label: {
            type:'timeCat',
            alias: '日期', // 为属性定义别名
            ticks:dv.rows.map((item)=>{return item.label})
          },
        value: {
            alias: '数据量' // 为属性定义别名
        }
    }
    return (
        <Chart 
            height={400} 
            data={dv} 
            padding={[50,50]}
            scale={scale}
            forceFit
            filter={[
                ['value', val => val >0] // 图表将会只渲染 x 字段数值大于 20 的数据
            ]}
        >
            <h3>时间段内每天完成的数据量</h3>
            <Axis name="label" />
           
            <Axis name="value" />
            <Tooltip/>
            <Geom type="interval" position="label*value"  >
                <Label content='value' offset={5}/>
            </Geom>
        </Chart>
    );
}
export default FinshNumber