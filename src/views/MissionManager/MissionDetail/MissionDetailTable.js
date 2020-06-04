import React from 'react'
import { Statistic,Descriptions} from 'antd'
import {missiondetailcolumns,tracknumber_columns} from './TypeColumns'

const build_numberlist=(data)=>(
    tracknumber_columns.map((item)=>{
        const title = item.title
        return [title,data[item.dataIndex]]
    }).filter((item)=>{
        return item[1]>0
    })
)


const MissionDetail =(props) => {
    const {data,totaltrack,standardtrack} = props
    
    const columns = [
        ...missiondetailcolumns,
        {
            title:'预计完成时间',
            dataIndex:'predit_finshtime',
    }]

    const totalShownumber =build_numberlist(totaltrack)

    const standardShownumber =build_numberlist(standardtrack)

    return (
            <Descriptions bordered column={3}>
                {
                    columns.map((item,index)=>
                    <Descriptions.Item label={item.title} key={index}>
                        {
                        data[item.dataIndex]
                        }</Descriptions.Item>
                    )
                }
                <Descriptions.Item label='任务总量（导入量）'  >{
                    totalShownumber.map((value)=>{
                        return <Statistic key={value[1]} value={value[1]} suffix={value[0]} />
                    })
                }</Descriptions.Item>
                <Descriptions.Item label='任务规定量（人均）'>{
                    standardShownumber.map((value)=>{
                        return <Statistic key={value[1]} value={value[1]} suffix={value[0]+'/天'} />
                    })
                }</Descriptions.Item>
            </Descriptions>
    )
}


export default MissionDetail