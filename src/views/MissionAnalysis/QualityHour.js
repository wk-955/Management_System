import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  Guide,
} from "bizcharts";
import DataSet from "@antv/data-set";

function QualityHour (props) {
    
    const { DataView } = DataSet;
    const {Html} =Guide
    const currentdata = [...props.totallist].map(item => {
        if (item.label === '累计完成量' || item.work_hour) {
            item['质检工时'] = item['quality_hour']
            if (item.work_hour){
              item['工时'] = item.work_hour
            }
            return item
        }
        return ''
    }).filter(item => {
        return item
    })
    
    const dv = new DataView().source([...currentdata]);
    dv.transform({
        type: "fold",
        fields: ['质检工时', '工时'],
        key:'item',
        value: "value",
        retains:['total_hour']
    })
    dv.transform({
        type: "percent",
        field: "value",
        dimension: "item",
        as: "percent"
    })
    
    const cols = {
      percent: {
        formatter: val => {
          val =Math.round(val * 100) + "%";
          return val;
        }
      }
    };

    return (
        <Chart
          height={100}
          data={dv}
          scale={cols}
          padding={[80, 100, 80, 80]}
          forceFit
        >
          <Coord type="theta" radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Legend
            position="right"
          />
          <Tooltip
          />
          <Guide>
            <Html
              position={["50%", "50%"]}
              html={`<div style=&quot;color:#8c8c8c;font-size:16px;text-align: center;width: 10em;&quot;>总工时<br><span style=&quot;color:#262626;font-size:16px&quot;>${currentdata.length>0? currentdata[0].total_hour :0}个工时</span></div>`}
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color={['item',['#13C2C2','#1890FF']]}
            tooltip={[
              "item*percent*value",
              (item, percent,value) => {
                percent = Math.round(percent * 100) + "%";
                return {
                  title:'',
                  name: item,
                  value:value+' '+percent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label 
                content="percent"
                formatter={(text, item) => {
                  return `${item.point.item}:${item.point.value}  ${text}`
                }}
                />
          </Geom>
        </Chart>
    );

}

export default QualityHour
