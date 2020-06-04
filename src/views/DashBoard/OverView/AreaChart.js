import React from 'react'
import {
    Chart,
    Geom,
    Tooltip,
  } from "bizcharts";
import DataSet from "@antv/data-set";
const AreaChart =(props)=> {
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
            alias: '完成任务数', // 为属性定义别名
            min:0,
            base: 0
        }
    }

    return (
        <Chart 
        height={50} data={dv} forceFit padding={0}
        scale ={scale}
        filter={[
            ['value', val => val >0] // 图表将会只渲染 x 字段数值大于 20 的数据
        ]}
        
        >
        <Tooltip />
        <Geom type="area" position="label*value" shape="smooth" />
        <Geom type="line" position="label*value" size={2} shape="smooth" />
      </Chart>
    )
}

export default AreaChart