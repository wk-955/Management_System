import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";




const PersonalTotalChart =(props)=>{
    const {classdatalist} =props
    const data = classdatalist
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
        type: "fold",
        fields: ["个", "大文件夹", "张", "文件夹", "框", "段", "组"] ,
        // 展开字段集
        key: "type",
        // key字段
        value: "value" // value字段
      })
    dv.transform({
        type: 'filter',
        callback(row) { // 判断某一行是否保留，默认返回true
            return row.value>0
        }
      });

    return(
        <Chart height={400} data={dv} forceFit>
            <Legend />
            <Coord  scale={[1,1]} />
            <Axis 
                name="value"
                position={"left"}
            />
            <Tooltip />
            <Geom 
                type='interval'
                position="type*value"
                color='label'
                adjust={[
                    {
                        type:'dodge',
                        marginRatio:1/32
                    }
                ]}
            />
        </Chart>
    )

}

export default PersonalTotalChart