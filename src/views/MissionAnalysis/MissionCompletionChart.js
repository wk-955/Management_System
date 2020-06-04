import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Legend,
  Label
} from "bizcharts";
import DataSet from "@antv/data-set";


function MissionCompletionChart (props) {
    const data = props.totallist
    
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
    .transform({
        type: "filter",
        callback(row) {
            return row.value >0 && row.label !== '任务总量'
        }
    })
    .transform({
        type: "sort",
        callback:(a,b)=>{
            return a.value -b.value
        }
    })
    .transform({
        type: 'reverse'
    })

    const scale = {
        value:{
            alias:'数\n量'
        },
        label:{
            alias:'本周任务'
        }
    };
            
    return (
        <Chart height={400} data={dv} forceFit scale={scale} padding={[50,'auto','auto','auto']}>
            {props.title}
            <Legend />
            <Coord />
            <Axis name="label" />
            <Axis name="value" 
                position={'left'} 
                />
            <Tooltip 
                itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}：{value}</li>"
            />
            <Geom
                type="interval"
                tooltip={['pass_percent*value*label', (pass_percent, value, label) => {
                    return {
                        name: label,
                        value: value + ' 合格率：'+ (pass_percent ? Math.round(pass_percent*10)/10 : 0)+ '%'
                    }}] }
                position="type*value"
                color={"label"}
                adjust={[
                {
                    type: "dodge",
                    marginRatio: 1/3,
                }
                ]}>
                <Label content={["value", (value)=>{
                    return `${Math.round(value*10)/10}`;
                }]} 
                textStyle={{
                    fill: '#404040', // 文本的颜色
                    fontSize: '12', // 文本大小
                    rotate:-40
                  }}
                
                />
                </Geom>
        </Chart>
    )
}

export default MissionCompletionChart
