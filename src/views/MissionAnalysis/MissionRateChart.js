import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Legend,
  Label,
  Guide
} from "bizcharts";
import DataSet from "@antv/data-set";


function MissionRateChart (props) {

    const { Line } = Guide;
    const data = props.totalrate.map((item) => {
        if (item.label === '累计完成量') {
            item.label = '平均速率'
        }
        if (item.label === '所选日期累计完成量') {
            item.label = '所选日期平均速率'
        }
        return item
    })
  
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
            return row.value > 0 
        }
    })
    // .transform({
    //     type: 'partition',
    //     groupBy: [ 'type' ],
    //     orderBy: [ 'value' ] 
    // })
    .transform({
        type: "sort",
        callback(a, b) { // 排序依据，和原生js的排序callback一致
            // console.log('a',a,'b',b)
            return a.value - b.value;
          }
    })
    .transform({
        type: 'reverse'
    })

const scale = {
    value:{
        alias:'效\n率'
    },
    label:{
        alias:'本周任务'
    }
};

    return (
        <Chart 
        height={400}  
        data={dv}  
        scale={scale} 
        forceFit 
        padding={[50,'auto','auto','auto']}
        
        >
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
            <Guide>
                {dv.rows.map((item,index)=>{
                    if(item.label === '平均速率' && item.value > 1){
                        return (<Line
                            key={index}
                            top // {boolean} 指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
                            start={['start',item.value]} // {object} | {function} | {array} 辅助线结束位置，值为原始数据值，支持 callback
                            end={['end',item.value]} // 同 start
                            lineStyle={{
                                stroke: '#999', // 线的颜色
                                lineDash: [0, 2, 2], // 虚线的设置
                                lineWidth: 3, // 线的宽度
                            }} // {object} 图形样式配置 https://bizcharts.net/products/bizCharts/api/graphic#线条样式
                            /> )
                    }
                    return ''
                })}
            </Guide>
            <Geom
                type="interval"
                tooltip={['value*label', (value, label) => {
                    return {
                        name: label,
                        value: Math.round(value)
                    }}] }
                position="type*value"
                color="label"
                adjust={[
                {
                    type: "dodge",
                    marginRatio: 1/3,
                }
                ]}
                // shape={['label',dv.rows.filter((item)=>{
                //     return item.label !=='所选日期平均速率' && item.label !=='平均速率'
                // })]}
                >
                
                <Label 
                content={["value", (value)=>{
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

export default MissionRateChart
