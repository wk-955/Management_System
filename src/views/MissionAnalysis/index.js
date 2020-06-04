import React, { Component } from 'react'
import { connect } from 'react-redux'
import {missionanalysis_groupmember,missionanalysis_changeState,missionanalysis_missionnumber } from '../../actionCreators'
import {Card,Select, Row, Col,DatePicker,PageHeader,Tooltip,Progress} from 'antd' 
import HourList from './HourList'
import MAGroupMember from './MAGroupMember'
import "moment/locale/zh-cn";
import moment from 'moment'
import MissionCompletionChart from './MissionCompletionChart'
import MissionRateChart from './MissionRateChart'
// import QualityHour from './QualityHour'

moment.locale('zh-cn');
const { RangePicker } = DatePicker
const { Option } = Select;
const mapState=(state)=>({
    missionanalysis:state.missionanalysis,
    login:state.login,
  })
  
const mapDispath ={
    missionanalysis_groupmember,
    missionanalysis_changeState,
    missionanalysis_missionnumber
}
  
@connect(mapState,mapDispath)
class MissionAnalysis extends Component {
    constructor(props){
        super(props)

        this.props.missionanalysis_missionnumber(
            this.props.match.params.missionid,
            moment().startOf('week').add(-3,'day').format('YYYY-MM-DD HH:mm:ss'),
            moment().format('YYYY-MM-DD HH:mm:ss')
            )
        this.props.missionanalysis_groupmember(
            this.props.match.params.missionid,
            moment().startOf('week').add(-3,'day').format('YYYY-MM-DD HH:mm:ss'),
            moment().format('YYYY-MM-DD HH:mm:ss')
            )
        this.handleChange =this.handleChange.bind(this)
    }

    handleChange=(value)=>{
        this.props.missionanalysis_changeState({group:value})
    }

    data_date=(_,dateString)=>{
        if (dateString[0]===''){
            this.props.missionanalysis_groupmember(
                this.props.match.params.missionid,
                moment().startOf('week').add(-3,'day').format('YYYY-MM-DD HH:mm:ss'),
                moment().format('YYYY-MM-DD HH:mm:ss')
            )
        }
        else{
            this.props.missionanalysis_groupmember(
                this.props.match.params.missionid,
                dateString[0],
                dateString[1]
            )
        }
    }

    totaldata_date=(_,dateString)=>{
        if (dateString[0]===''){
            this.props.missionanalysis_missionnumber(
                this.props.match.params.missionid,
                moment().startOf('week').add(-3,'day').format('YYYY-MM-DD HH:mm:ss'),
                moment().format('YYYY-MM-DD HH:mm:ss')
            )
        }
        else{
            this.props.missionanalysis_missionnumber(
                this.props.match.params.missionid,
                dateString[0],
                dateString[1]
            )
        }
    }

    render() {
        const {
            group_member_count,
            group,group_member_ratecount,
            totallist,totalrate,
            missionname,
            missionid,
            missionstartdate,
            missionenddate,
            percent_dict,
            grouptimelist,
            group_member_workhourcount,
            group_mission_hourcount,
            missionDatehour
        } = this.props.missionanalysis
        const grouplist = Object.keys(group_member_count)
        const select =(
            <Select value={group} style={{ width: 120 }} onChange={this.handleChange}> 
            {grouplist.map(keyword=>{
               return <Option value={keyword}  key={keyword} >{keyword}</Option>
            })}
        </Select>
        )
        const titlestyle={
            fontSize:20,
            color:"black",
            textAlign:"center"
        }
        
        return (
            <div>
                <Row gutter={[8,8]}>
                    <Col span={24}>
                        <PageHeader
                        style={{width:'calc(100%)',backgroundColor:'white'}}
                        className="site-page-header"
                        onBack={() =>this.props.history.goBack()}
                        title={'任务：'+missionname}
                        subTitle={'任务id：'+missionid}
                        />
                    </Col>
                </Row>
                <Card
                            title='任务详情'
                            extra={
                                <RangePicker 
                                key='totaldate'
                                format="YYYY-MM-DD HH:mm:ss"
                                onChange={this.totaldata_date}
                                defaultValue={[moment().startOf('week').add(-3,'day'),moment()]}
                                showTime={{
                                defaultValue:[moment('00:00:01', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                                }}/>
                            }
                        >
                <Row gutter={[16,8]}>
                    <Col span={8}>
                        <Card
                            title='开始日期'
                            size='small'
                            bodyStyle={{height:110,textAlign:"center",display:"flex",alignItems:'center',justifyContent:'center'}}
                        >   
                        <h1 >
                            {missionstartdate}
                        </h1>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            title='结束日期'
                            size='small'
                            bodyStyle={{height:110,textAlign:"center",display:"flex",alignItems:'center',justifyContent:'center'}}
                        >   
                            <h1>
                            {missionenddate? missionenddate:"未完成"}
                            </h1>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            title='完成状况'
                            size='small'
                            bodyStyle={{height:110}}
                        >
                            <Row>
                            {
                                Object.keys(percent_dict).length>0?
                                Object.keys(percent_dict).map((item,index)=>{
                                    const keyword = percent_dict[item]
                                    return(

                                        <Col key={item} span={Object.keys(percent_dict).length>1? 12:24}>
                                            <Tooltip key={index} title={
                                                // `任务所选日期完成量：${keyword['任务所选日期完成量'].value} ${Math.round(keyword['任务所选日期完成量'].percent)}%  任务总完成量：${keyword['任务总完成量'].value}/任务总量：${keyword['任务总量'].value}`
                                                <span>
                                                    {Object.keys(keyword).map(word=>{
                                                            return <p key={word}>{`${word}:${keyword[word].value}  ${Math.round(keyword[word].percent)}%`}</p>
                                                        })}
                                                </span>    
                                                }>
                                                {item+':'}<Progress percent={Math.round(keyword['累计完成量'].percent)} successPercent={Math.round(keyword['所选日期累计完成量'].percent)} />
                                            </Tooltip>
                                        </Col>
                                    
                                )})
                                :
                                '未完成'
                            }
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[16,8]}>
                    <Col span={8}>
                        <Card bodyStyle={{minHeight:500}}>
                            <MissionCompletionChart 
                            totallist={totallist} 
                            title={
                                <h3  style={titlestyle} >
                                    任务完成量比较表
                                    </h3>
                                }
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bodyStyle={{minHeight:500}}>
                            <MissionRateChart 
                                totalrate={totalrate}
                                title={
                                    <h3  style={titlestyle} >
                                        任务平均速率比较表（总量/天）
                                        </h3>
                                    }
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bodyStyle={{minHeight:500}}>
                            <HourList datalist={grouptimelist} title = {<div>{`该任务耗时 ${String(missionDatehour)} （所有数据单位为小时）`}</div>}  />
                            {/* <QualityHour  totallist={totallist} /> */}
                        </Card>
                    </Col>
                </Row>
                </Card>
                <Row gutter={[16,16]} >
                    <Col span={24}>
                        <Card title='各组详情' 
                        extra={ 
                            <Row>
                                <Col>                      
                                <RangePicker 
                                    key='chosedate'
                                    format="YYYY-MM-DD HH:mm:ss"
                                    onChange={this.data_date}
                                    defaultValue={[moment().startOf('week').add(-3,'day'),moment()]}
                                    showTime={{
                                    defaultValue:[moment('00:00:01', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                                    }}
                                />
                            </Col>
                            <Col>{select}</Col>
                            </Row>
                            }
                        >
                            <Row gutter={[16,16]}>
                                <Col span={8}>
                                    <MAGroupMember 
                                        title={
                                            <h3  style={titlestyle} >
                                                组员完成量比较表
                                                </h3>
                                            }
                                        key='group_member_count'
                                        datalist={group === ''|| group_member_count==={} ? []:group_member_count[group]}
                                        rate = {false}
                                    />
                                </Col>
                                <Col span={8}>
                                    <MAGroupMember 
                                        title={
                                        <h3  style={titlestyle}>
                                            组员速率比较表(人均量/天)
                                        </h3>
                                        }
                                        key='group_member_ratecount'
                                        datalist={group === '' || group_member_ratecount==={}  ? []:group_member_ratecount[group]}
                                        rate = {true}
                                    />
                                </Col>
                                <Col span={8}>
                                    <HourList 
                                    datalist={group === '' || group_member_workhourcount==={}  ? []:group_member_workhourcount[group]} 
                                    title = {<div>{`小组在任务耗时 ${String(group === '' || group_member_workhourcount==={}  ? '0':group_mission_hourcount[group])} （所有数据单位为小时）`}</div>}  
                                    />
                                        {/* <QualityHour totallist={group === '' || group_member_count==={}  ? []:group_member_count[group]} /> */}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default MissionAnalysis
