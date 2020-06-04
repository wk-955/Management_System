import React from 'react'
import { Table, Tooltip } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import './PersonalTable.less'


function PersonalStatistics(props) {
    const data = props.personal.missionlist

    // 行数据的整顿
    const mapdata = (text, record, index, columns_index) => {
        if (columns_index === 'standardRate' || columns_index === 'balanceRate'){
            return (
                text.map((item, index) => {return (<div key={index}>{Comparative_data(item, record)}</div>)})
                )
        } 
        else if (columns_index==='work_hour') {
            return(
                Object.keys(text).map((item, index) => {
                    return (<div key={index}>{item + ': ' + text[item]}</div>)
                })
            )
        }
        else if (columns_index==='class') {
            return(
                text[0]
            )
        }
        else {
            return (text.map((item, index) => {return (<div key={index}>{item}</div>)}))
        }
    }
    
 
    // 速率比较
    const Comparative_data = (item, record) => {
        let count = ''
        // 循环record.rate数组,比较是否相等
        for (let i in record.rate) {
            if (record.rate[i].indexOf(item.replace(/[0-9]/ig,"")) !== -1) {
                count = record.rate[i].replace(/[^0-9]/ig,"") - item.replace(/[^0-9]/ig,"")
            }
        }

        if (count > 0) {
            return (
                <Tooltip title={'自身速率与之相比:+' + count}>
                    {item}
                    <ArrowUpOutlined style={{color:'#3f8600'}} />
                </Tooltip>)
        } 
        else if (count < 0) {
            return (
                <Tooltip title={'自身速率与之相比:' + count}>
                    {item}
                    <ArrowDownOutlined style={{color:'#cf1322'}}/>
                </Tooltip>)
        }
        else {
            return ''
        }

    }

    // 有render的列
    const data_columns = {
        '任务分类': ['class'],
        '工时': ['work_hour'],
        '任务完成总量': ['showNumber',150],
        '自身完成速率(/天)': ['rate',150],
        '规定速率(/天)': ['standardRate',150],
        '平均速率(/天)': ['balanceRate',150],
    }

    const bulid_columns = () => {
        const list = Object.keys(data_columns).map(item => {
            return ({           
                title: item,
                dataIndex: data_columns[item][0],
                // width: data_columns[item][1],
                render: (text, record, index) => mapdata(text, record, index, data_columns[item][0])
            })
        })
        return list
    }
 
    const columns = [
        {
            title: 'id',
            dataIndex: 'missionid',
            width: '5%',
        }, 
        {
            title: '任务名',
            dataIndex: 'missionname',
        }, 
        ...bulid_columns()
    ]

    
    const changepage = (page) => {
        props.personal_missioncount(props.match.params.id,page)
    }

    return (
            <Table 
                className="PersonalTable"
                tableLayout='fixed'
                bordered
                columns={columns}
                dataSource={data}
                rowKey='missionname'
                pagination={{
                    total: props.personal.totalmission,
                    onChange: changepage, 
                }}
            />
    )
}


export default PersonalStatistics