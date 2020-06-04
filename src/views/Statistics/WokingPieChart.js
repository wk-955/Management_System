import React from 'react'
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Guide,
  } from 'bizcharts';
import DataSet from "@antv/data-set";



const WokingPieChart= (props) => {
    const { DataView } = DataSet;
    const { Html } = Guide;
    const {data,total,title,pietype} = props



    const dv = new DataView().source(data);
    dv.transform({
        type: "sort",
        callback:(a,b)=>{
            return a.value -b.value
        }
    })
    .transform({
        type: "percent",
        field: "value",
        dimension: "type",
        as: "percent"
    });
    const cols = {
        percent: {
        formatter: val => {
            val = val * 100 + "%";
            return val;
        }
        }
    };
    return (
        <Chart
            height={245}
            data={dv}
            scale={cols}
            padding={[10,20,10,20]}
            forceFit
        >
            {title}
            <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
            <Axis name="percent" />
            {/* <Legend
                position="left"
            /> */}
            <Tooltip
                showTitle={false}
                itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
            />
            <Guide>
                <Html
                    position={["50%", "50%"]}
                    html={`<div style="color:#8c8c8c;font-size:14px;text-align: center;width: 10em;">任务总数<br><span style="color:#262626;font-size:16px;">${total}</span></div>`}
                    alignX="middle"
                    alignY="middle"
                />
            </Guide>
            <Geom
                type="intervalStack"
                position="percent"
                color={'type'}
                tooltip={[
                    "type*percent*showNumber",
                    (type, percent,showNumber) => {
                        percent = Math.round(percent * 100)  + '%'
                        return {
                        name: type,
                        // value:percent
                        value: '<br>'+showNumber.join('<br>')
                        };
                }
                ]}
                style={{
                lineWidth: 1,
                stroke: "#fff"
                }}
            >
                <Label
                    content={["type*value*percent*showNumber", (type, value,percent,showNumber)=>{
                        // return `${type}: ${value}  占比：${Math.round(percent*100)}%`
                        if (pietype === 'status'){
                            return `${type}: ${value}  占比：${Math.round(percent*100)}%`
                        }
                        // `${type}: ${value}  占比：${Math.round(percent*100)}%`
                        // :
                        return `${type}：${showNumber.join('/')}`
                    }]}
                    textStyle={{
                        fontWeight: 'bold',
                    }}
                />
            </Geom>
        </Chart>
    );
    }

  

export default WokingPieChart