import React from 'react'
import {List} from 'antd'
const HourList =(props) => {
    const {datalist,title} = props
    return (
        <List
            header={title}
            style = {{overflowY:"auto",height:400}}
            itemLayout="horizontal"
            dataSource={datalist}
            renderItem={item => (
            <List.Item
            >
                
                <List.Item.Meta
                    description={item.label}
                />
                {
                    Object.keys(item).filter(key =>{
                        return key !== 'label'
                    }).map(key =>{
                       return <List.Item.Meta
                        key = {item[key]}
                        title ={key}
                        description={String(item[key])}
                        />
                    })
                }
            </List.Item>
            )}
        />
    )
}

export default HourList