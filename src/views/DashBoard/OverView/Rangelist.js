import React from "react";
import {
  Chart,
  Geom,
  Tooltip,
  Axis,
  Label,
  Coord
} from "bizcharts";
import DataSet from "@antv/data-set";

const Rangelist =(props) => {
    const  {data} =props
    
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
        type: 'map',
        callback(row) { // 加工数据后返回新的一行，默认返回行数据本身
            row.label = Object.keys(row)[0]
            row.value = Object.values(row)[0]
            return row;
        }
      });
    dv.transform({
        type: 'sort',
        callback(a, b) { // 排序依据，和原生js的排序callback一致
            return a.value - b.value;
        }
    });
    // const scale = {
    //     value: {
    //         alias: '数据量' // 为属性定义别名
    //     }
    // }
    return (
        <Chart 
            height={400} 
            data={dv} 
            // padding={0}
            // scale={scale}
            forceFit
        >
            <h3>时间段内组完成的数据量排名</h3>
            <Coord transpose />
            <Axis name="label" />
            <Axis name="value" visible={false} />
            <Tooltip/>
            <Geom type="interval" position="label*value"  >
                <Label content='value' offset={5}/>
            </Geom>
        </Chart>
    );
}
export default Rangelist