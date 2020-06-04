import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Legend,
  Guide
} from "bizcharts";
import DataSet from "@antv/data-set";




const MAGroupMember =(props)=>{
    const {datalist,rate,title} = props
    const ds = new DataSet();
    const { Line } = Guide;
    const dv = ds.createView().source(datalist);
    dv.transform({
        type:'fold',
        fields:[    
        '大文件夹',
        '文件夹',
        '张',
        '组',
        '段',
        '个',
        '框',],
        key:'type',
        valueL:'value'
    })
    dv.transform({
        type: 'filter',
        callback(row) { // 判断某一行是否保留，默认返回true
            if (rate) {
                return row.value>0
            }
                return row.value > 0 && row.label !=='平均速率'
        }
      });
    dv.transform({
    type: 'sort-by',
    fields: [ 'value' ], // 根据指定的字段集进行排序，与lodash的sortBy行为一致
    order: 'DESC'        // 默认为 ASC，DESC 则为逆序
    })
  
    return(
        <Chart height={400} data={dv} forceFit>
            {title}
            <Legend />
            <Coord   transpose={rate} scale={rate ? [1,-1]:[1,1]} />
            <Axis 
                name="value"
                position={"left"}
            />
            <Tooltip 
                // itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}：{value}</li>"
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
                tooltip={['type*value*label', (type,value, label) => {
                    return {
                        name: label,
                        value: `${Math.round(value)}${rate? type+'/天':type}`
                    }}] }
                type='interval'
                position="type*value"
                color={'label'}
                adjust={[
                    {
                        type:'dodge',
                        marginRatio: 1/2,
                        dodgeBy:'label'
                    }
                ]}
                
            > 
            </Geom>
        </Chart>
    )

}

export default MAGroupMember