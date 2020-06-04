// author wjj 2020-04-11

import React from 'react'
import { Table, Badge,Popover,Button, Card, Row,Col, Tooltip} from 'antd';
import './weekly.less'
import {Link} from 'react-router-dom'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'



//点击任务进程弹出的数据
const expandedRowRender = (record) => {
    const childrenColumn = [
        { title: '', dataIndex: 'name', className:'weekly'},
        { title: '完成量', dataIndex: 'showNumber',className:'weekly',
            render:(_,record)=><span>
            {record.showNumber.map(item=>{
                return <p key={item} style={{marginBottom:0}}>{item}</p>
            })}
            </span>
        },
        { title: '平均速率', dataIndex: 'rate',  
            render:(_,record)=><span >
                {record.rate.map(item=>{
                    return <p key={item} style={{marginBottom:0}}>{item}</p>
                })}
            </span>
        },
        { title: '参与人数', dataIndex: 'people_number',},
        { title: '工时', dataIndex: 'work_hour', },
        { title: '质检工时', dataIndex: 'quality_hour',},
        { title: '合格率', dataIndex: 'pass_percent1',},
        { title: '完成百分比', dataIndex: 'percentage', 
            render:(_,record)=><span>
            {record.percentage?
            record.percentage.map(item=>{
                return  <p key={item} style={{marginBottom:0}}>
                            {item}
                        </p>
            })
            :
            ''
            }
        </span>
        },
    ]


    const data = record.map((item)=>{
        if (item.pass_percent !== 0 && !item.pass_percent === false) {
            item.pass_percent1 = item.pass_percent + '%'
        } else {
            item.pass_percent1 = ''
        }
        return item
    })
    return <Table columns={childrenColumn} rowKey='name'  dataSource={data} pagination={false} size='small'/>;
}


//数据排序顺序
const data_rowchildren = {
    '参与组': ['name',100],
    '参与人数': ['people_number',75],
    '工时': ['work_hour',75],
    '质检工时': ['quality_hour',75],
    '完成进度': ['percentage',130],
    '平均速率': ['rate',120],
    '完成量': ['showNumber',150],
    '合格率': ['pass_percent1',75],
}

//判断速率的数量单位是否相等
const Comparative_data = (value, row) => {
    //比较值
    let count = ''
    for (let i in row.standard[0].showNumber) {
        //当count 不为空 且 规定量与平均值单位相同时 count=平均值-规定值
        if (count ==='' && row.standard[0].showNumber[i].indexOf(value.replace(/[0-9]/ig,"").replace('/天', '')) !== -1 ){
            count = value.replace(/[^0-9]/ig,"").replace('/天', '') - row.standard[0].showNumber[i].replace(/[^0-9]/ig,"")
        }
    }
    return count
}

//普通单元格标签
const renderContent = (_, row, index, key) => (
    <div className='wp'>
        {row.rowchildren.map((item, index) => { 
            return (
                <div key={index} 
                    className={row.rowchildren.length - 1 === index ? 'ttt1' : 'ttt2'}
                >
                    {
                        item[key].constructor === Array 
                        ? 
                        item[key].map((value, index) => {
                            //如果值中有 ”天“ 就重构value
                            if(value.indexOf('天') !== -1 ){
                                const count = Comparative_data(value,  row)
                                value =(
                                    <span>
                                        <Tooltip 
                                            title={
                                                !count ? 
                                                ''
                                                :
                                                '与规定任务量相比:  ' + count
                                            }
                                        >
                                            {value}
                                            {
                                                count > 0
                                                ?
                                                <ArrowUpOutlined style={{color:'#3f8600'}} /> 
                                                :
                                                !count ? '' :  <ArrowDownOutlined style={{color:'#cf1322'}}/>
                                            }
                                        </Tooltip>
                                    </span>
                                )
                            }
                            return (
                                <span style={{marginBottom:0}} key={index}>
                                    {value}
                                </span>
                            )
                            })
                        :
                        item[key]
                    }
                </div>
            )
        })}
    </div>
)


//进程标签
const progress_render = (text,record) => {
    {   
        const content = (
            <Row gutter={[8,8]} >
                {
                    record.standard.map((dict)=>{
                        return (                      
                            <Col span={8} key={dict.name}>
                                <Card title={dict.name} size='small' >
                                    {dict.showNumber.join('/')}
                                </Card>
                            </Col>
                        )
                    })
                }
                <Col span={24} >
                    {expandedRowRender(record.overAlldata)}
                </Col>
            </Row>

        )

        const statusbutton = (value)=>{
            return (
                <Popover 
                    content={content} 
                    trigger="click" 
                    placement="topRight"
                    arrowPointAtCenter
                    title={record.missionname+'(以下数据为整体数据，即任务开始日期到今时今日的数据，不随时间区间改变)'}
                >
                    <Button>
                        <Badge status={value} />
                        {text==='进行中' ? '进行' : text}
                    </Button>
                </Popover>
            )
        } 
       switch (text) {
            case "完成":
                return (
                    statusbutton("success")
                )
            case "暂停":
                return (
                    statusbutton("warning")
                )
            default:
                return (
                    statusbutton("processing")
                )
        }
    }
}

//任务名标签
const missionname_render = (_, record) => 
    {return <Link to={'/manager/MissionAnalysis/'+record.id}>{record.missionname}</Link>
}

//分类标签
const class_render = (text, record) => {
    return (
        <div >
            <Tooltip placement="rightBottom" title={record.child_class}>
                {record.parent_class+'/'+record.child_class}
            </Tooltip>
        </div>
        )
}


const Weekly = (props) => {

    //创建列
    const bulid_columns = () => {
        const list = Object.keys(data_rowchildren).map(key => {
            return(
                { title: key, dataIndex: 'rowchildren',width: data_rowchildren[key][1],
                render: (value, row, index) => renderContent(value, row, index, data_rowchildren[key][0])})
        })
        return list
    }
    

    //列属性
    const columns = [
        { title: '任务id',  dataIndex: 'id', width:75,fixed:'left'},
        { title: '任务名称',  dataIndex: 'missionname',width:120,fixed:'left',render: (_, record) => missionname_render(_, record)},
        { title: '任务类别', dataIndex: 'parent_class',width:120, render: (text, record) => class_render(text, record)},
        { title: '需求人', dataIndex: 'demand_person',width:100,},
        { title: '负责人', dataIndex: 'responsible',width:100,},
        { title: '预计完成时间', dataIndex: 'predit_finshtime',width:120},
        ...bulid_columns(),
        { title: '时间', dataIndex: 'date',width:200},
        { title: '完成状态', dataIndex: 'progress' ,width:100,render: (text,record) => progress_render(text, record)},
    ];

    //修改源数据 1 合并开始和结束日期 2 向合格率加上%
    const data = props.statistics.dataList.map((item)=>{
        item.date = <div>
                <div>{'开始：' + item.startdate}</div>
                <div>{'结束：' + item.enddate}</div>
            </div>
        item.rowchildren.map(rowchildren_item => {
            if (rowchildren_item.pass_percent !== 0) {
                rowchildren_item.pass_percent1 = rowchildren_item.pass_percent + '%'
            } else {
                rowchildren_item.pass_percent1 = ''
            } return item
        })
        return item
    })

    //翻页
    const weekly_changepage = (page) => {
        props.statistics_postondition({
            ...props.statistics.searchCondition,
            page
        })
    }

    //选择导出的任务
    const selectchange = (selectedRowKeys)=>{
        props.statistics_changestate({selectedRowKeys})
    }

    return (
    <Table
        className="modal-content"
        bordered
        style={{minHeight:500}}
        // rowClassName="modal-contents"
        size='small'
        columns={columns}
        rowKey='id'
        scroll={{x:'900px'}}
        rowSelection={{
            selectedRowKeys:props.statistics.selectedRowKeys,
            onChange:selectchange
        }}
        dataSource={data}
        pagination={{
            total: props.statistics.currentmissions,
            onChange: weekly_changepage, 
            current: props.statistics.searchCondition.page
        }}
    />
)}
    

export default Weekly