// author Dxy
// update Wjj 2020-04-11

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {statistics_postondition, statistics_changestate,statistics_searchCondition} from '../../actionCreators'
import { Card,DatePicker, Row, Col,Spin, Button,List,Statistic,Select,Input,Descriptions,Modal} from 'antd'
// import WokingPieChart from './WokingPieChart'
import Weekly from './Weekly'
import {services,picURL}  from '../../requests'
import moment from 'moment'
import "moment/locale/zh-cn";

moment.locale('zh-cn');
const { RangePicker } = DatePicker
const { Search } = Input;
const { Option } = Select;

// const titlestyle={
//     fontSize:20,
//     color:"black",
//     textAlign:"center"
// }

const mapState=(state)=>({
    statistics:state.statistics,
    login:state.login,
})

//派发行动
const mapDispath={
    statistics_postondition,
    statistics_changestate,
    statistics_searchCondition
}

@connect(mapState,mapDispath)
class Statistics extends Component {
    constructor(props){
        super(props)
        const {searchCondition} = this.props.statistics
        const {startdate,enddate}=searchCondition

        startdate && enddate ?
        this.props.statistics_postondition({
            ...searchCondition,
        },{loading:true})
        :
        this.props.statistics_postondition({
            ...searchCondition,
            startdate:moment().startOf('week').add(-3,'day').format('YYYY-MM-DD HH:mm:ss'),
            enddate:moment().format('YYYY-MM-DD HH:mm:ss'),
            page:1
        },{loading:true})

        this.handle_progress_change=this.handle_progress_change.bind(this)
        this.handle_group_change=this.handle_group_change.bind(this)
        this.handle_selectbefor_change=this.handle_selectbefor_change.bind(this)
        this.startdateonChange=this.startdateonChange.bind(this)
        this.enddateonChange=this.enddateonChange.bind(this)
        this.missionSearch = this.missionSearch.bind(this)
        this.data_date=this.data_date.bind(this)
        this.handle_classSearch=this.handle_classSearch.bind(this)
        this.ExportDownload=this.ExportDownload.bind(this)
        this.handleHourShow=this.handleHourShow.bind(this)
        this.handleHourCancel=this.handleHourCancel.bind(this)
    }

    handle_selectbefor_change =(value)=>{
        this.props.statistics_searchCondition({search:value})
    }

    handle_group_change = (value)=>{
        const{searchCondition} = this.props.statistics
        this.props.statistics_postondition({...searchCondition,groupid:value,page:1},{loading:true})
        this.props.statistics_changestate({selectedRowKeys:[]})
    }
    
    handle_classSearch = (value) =>{
        const{searchCondition} = this.props.statistics
        this.props.statistics_postondition({...searchCondition,classSearch:value,page:1})
    }

    handle_progress_change = (value)=>{
        const{searchCondition} = this.props.statistics
        this.props.statistics_postondition({...searchCondition,progress:value,page:1})
        this.props.statistics_changestate({selectedRowKeys:[]})
    }
    
    startdateonChange=(_,dateStrings)=>{
        const{searchCondition} = this.props.statistics
        this.props.statistics_postondition({...searchCondition,startdates:dateStrings,page:1})
        this.props.statistics_changestate({selectedRowKeys:[]})
    }

    enddateonChange=(_,dateStrings)=>{
        const{searchCondition} = this.props.statistics
        this.props.statistics_postondition({...searchCondition,page:1,enddates:dateStrings})
        this.props.statistics_changestate({selectedRowKeys:[]})
    }


    missionSearch = (value)=>{
        const {searchCondition} = this.props.statistics
        const initdata = {
            responsible:'全部',
            progress:'',
            startdates:['',''],
            enddates:['',''],
        }
        this.props.statistics_postondition(
            searchCondition.search === 'missionid'?
            {...searchCondition,page:1,missionid:value,missionname:'',...initdata}
            :
            {...searchCondition,page:1,missionname:value,missionid:'',...initdata}
        )
        this.props.statistics_changestate({selectedRowKeys:[]})
    }

    data_date=(_,dateString)=>{
        if (dateString[0]===''){
            this.props.statistics_postondition({
                ...this.props.statistics.searchCondition,
                startdate:moment().startOf('week').add(-3,'day').format('YYYY-MM-DD HH:mm:ss'),
                enddate:moment().format('YYYY-MM-DD HH:mm:ss'),
                page: 1
            },{loading:true})
        }else{
            this.props.statistics_postondition({
                ...this.props.statistics.searchCondition,
                startdate:dateString[0],
                enddate:dateString[1],
                page: 1
            },{loading:true})
        }
        this.props.statistics_changestate({selectedRowKeys:[]})
    }

    
    ExportDownload=(all)=>{
        const {selectedRowKeys,searchCondition} = this.props.statistics
        services.post('/statistics/export',{...searchCondition,selectedRowKeys,all})
        .then(rsp =>{
            const aLink = document.createElement('a');
            document.body.appendChild(aLink);
            aLink.style.display='none';
            aLink.href =picURL+rsp.data.fileurl;
            aLink.click();
            document.body.removeChild(aLink);
        })
    }

    handleHourShow =()=>{
        this.props.statistics_changestate({hourshow:true})
    }

    handleHourCancel=()=>{
        this.props.statistics_changestate({hourshow:false})
    }

    render() {
        const {
            statuscount,
            classcount,total,
            numbertotalcount,
            searchCondition,
            selecDataList,
            selectedRowKeys,
            hourCountDict,
            totalhour,
            shouldHours,
            hourshow,
            personal_hourList,
        } =this.props.statistics
        const {loading,startdate,enddate,searchloading} = searchCondition
        const selectbefore = (
            <Select defaultValue="missionid" className="select-before" onSelect={this.handle_selectbefor_change}>
              <Option value="missionid">任务编号</Option>
              <Option value="missionname">任务名字</Option>
            </Select>
          );
        return (
        <Spin spinning={loading}  size='large' style={{width:'100%'}}>
            <Row gutter={[0, 8]}>
                <Col span={24} >
                    <Card size='small'>
                    <List
                        header={
                            <Row gutter={[0, 0]}>
                                <Col span={4}><h3>任务完成量总和</h3></Col>
                                <Col span={6} offset={5} style={{textAlign:"end"}}> 
                                    <span>组查询： </span>
                                        <Select 
                                            value={searchCondition.groupid}
                                            defaultValue={searchCondition.groupid} 
                                            style={{ width: 120 }} 
                                            onChange={this.handle_group_change} 
                                            >
                                                {selecDataList.grouplist.map((group)=>{
                                                    return <Option key={group.groupname} value={group.id} >{group.groupname}</Option>
                                                })}
                                                <Option key="全部" value='' >全部</Option>
                                    </Select>
                                </Col>
                                <Col span={8} offset={1} style={{textAlign:"end"}}>
                                    时间区间选择：
                                    <RangePicker 
                                    key='chosedate'
                                    format="YYYY-MM-DD HH:mm:ss"
                                    onChange={this.data_date}
                                    defaultValue={startdate && enddate? 
                                        [moment(startdate),moment(enddate)]
                                        :
                                        [moment().startOf('week').add(-3,'day'),moment()]
                                    }
                                    showTime={{
                                    defaultValue:[moment('00:00:01', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                                    }} />
                                </Col>
                            </Row>
                        }
                        itemLayout="horizontal"
                        size='small'
                        style={{textAlign:"center"}}
                        dataSource={numbertotalcount}
                        renderItem={item => (
                        <List.Item
                        >
                            {
                                item.showNumber.map((value,index)=>{
                                    const valuelist= value.split(' ')
                                    return(                        
                                    <List.Item.Meta
                                        key={index}
                                        title={valuelist[1]}
                                        description={<Statistic value={valuelist[0]} />}
                                    />)
                                })
                            }
                        </List.Item>
                        )}
                    />
                    </Card>
                </Col>
            </Row>
            <Row gutter={[0, 8]} >
                    <Col span={24}>
                    <Card title={
                        <Row style={{width:'100%'}}>
                            <Col span={3}>
                                任务总数:{total}
                            </Col>
                            <Col span={3}>
                                应录入工时:{shouldHours}
                            </Col>
                            <Col span={3}>
                                <Button onClick={this.handleHourShow} >实录工时</Button>:{totalhour}
                            </Col>
                            {
                                Object.keys(hourCountDict).map((key,index)=>{
                                    return <Col span={3} key={index}>
                                        {key}:{hourCountDict[key]}
                                    </Col>
                                })
                            }
                        </Row>
                        
                    } 
                    size='default' 
                    bodyStyle={{padding:0}}
                    >
                        <Row gutter={[0,0]} className='rowboder'>
                        {
                            statuscount.map((item,index)=>{
                               return (
                                <Col span={8} key={index} >
                                    <Card.Grid  className='gridStyle'   size='small'>
                                        <Descriptions title={item.type+item.value+'个'} size='small' >
                                            <Descriptions.Item >{item.showNumber.join('/')}</Descriptions.Item>
                                        </Descriptions>
                                    </Card.Grid>
                                </Col>
                               )
                            })
                        }
                        </Row>
                        <Row >
                        {
                            classcount.map((item,index)=>{
                               return (
                                   <Col span={8} key={index} >
                                        <Card.Grid  className='gridStyle' size='small'>
                                            <Descriptions size='small' >
                                                <Descriptions.Item label={item.type+item.value+'个'}  >{item.showNumber.join('/')}</Descriptions.Item>
                                            </Descriptions>
                                        </Card.Grid>
                                    </Col>
                               )
                            })
                        }
                        </Row>
                    </Card> 
                    </Col>
            </Row>
            <Row>
                <Card size='small'>
                    <Card.Grid hoverable={false} style={{width:'50%',padding:'8px 16px'}}>
                        <span>任务开始日期查询： </span>
                        <RangePicker 
                            key='startdate'
                            format="YYYY-MM-DD HH:mm:ss"
                            onChange={this.startdateonChange}
                            value={searchCondition.startdates[0] ? [moment(searchCondition.startdates[0]),moment(searchCondition.startdates[1])]: ['','']}
                            showTime={{
                            defaultValue: [moment('00:00:01', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                            }}
                        />
                    </Card.Grid>
                    <Card.Grid hoverable={false} style={{width:'50%',padding:'8px 16px'}}>
                        <span>任务结束日期查询： </span>
                        <RangePicker 
                            key='enddate'
                            format="YYYY-MM-DD HH:mm:ss"
                            onChange={this.enddateonChange}
                            value={searchCondition.enddates[0] ? [moment(searchCondition.enddates[0]),moment(searchCondition.enddates[1])] : ['','']}
                            showTime={{
                            defaultValue: [moment('00:00:01', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                            }}
                        />
                    </Card.Grid>
                    <Card.Grid hoverable={false} style={{width:'25%',padding:'8px 16px',textAlign:'center'}}>
                        <Search  
                            addonBefore={selectbefore}
                            defaultValue={searchCondition.missionid? searchCondition.missionid:searchCondition.missionname}
                            loading={searchCondition.searchloading} 
                            enterButton 
                            onSearch={this.missionSearch}
                        />
                    </Card.Grid>
                    <Card.Grid hoverable={false} style={{width:'25%',padding:'8px 16px',textAlign:'center'}}>
                        <span>进度查询： </span>
                        <Select   
                                    value={searchCondition.progress}
                                    style={{ width: 120 }} 
                                    onChange={this.handle_progress_change} 
                                    >
                                    <Option value='' >全部</Option>
                                    <Option value='进行中' >进行中</Option>
                                    <Option value='完成' >完成</Option>
                                    <Option value='暂停' >暂停</Option>
                                </Select>
                    </Card.Grid>
                    <Card.Grid hoverable={false} style={{width:'20%',padding:'8px 16px',textAlign:'center'}}>
                        <Search  
                            placeholder='类型查询'
                            loading={searchCondition.searchloading} 
                            enterButton 
                            onSearch={this.handle_classSearch}
                        />
                    </Card.Grid>
                </Card>
            </Row>
            <Row gutter={[0, 8]}>
                <Col span={24}>
                    <Spin spinning={searchloading}  size='large'>
                        <Card
                            extra={
                                <>
                                    <Button onClick={()=>this.ExportDownload(false)} disabled={!selectedRowKeys.length>0}>
                                        导出所选任务
                                    </Button>
                                    <Button onClick={()=>this.ExportDownload(true)}>
                                        导出全部
                                    </Button>
                                </>
                            }
                            size='small'
                        >
                            <Weekly {...this.props}/>
                        </Card>
                    </Spin>
                </Col>
                <Modal
                title="工时列表"
                visible={hourshow}
                footer={false}
                width={'50%'}
                onCancel={this.handleHourCancel}
                >
                <List
                    style = {{overflowY:"auto",height:500,width:'100%'}}
                    itemLayout="horizontal"
                    dataSource={personal_hourList}
                    renderItem={item => (
                    <List.Item
                    key={item['label']}
                    >
                        <List.Item.Meta
                            description={item.label}
                        />
                        {
                            Object.keys(item).filter(key =>{
                                return key !== 'label'
                            }).map((key,index) =>{
                            return <List.Item.Meta
                                key = {index}
                                title ={key}
                                description={String(item[key])}
                                />
                            })
                        }
                    </List.Item>
                    )}
                />
            </Modal>
            </Row>

        </Spin>
        )
    }
}

export default Statistics