import React, { Component } from 'react'
import {Row, Col, Card,DatePicker,Statistic,PageHeader,Descriptions, Divider } from 'antd'
import {personal_count,personal_missioncount,personal_infocount} from '../../actionCreators'
import { connect } from 'react-redux'
import moment from 'moment'
import "moment/locale/zh-cn";
import PersonalStatistics from './PersonalStatistics'


moment.locale('zh-cn');
const { RangePicker } = DatePicker
const mapState=(state)=>({
    personal:state.personal,
    login:state.login,
})
const mapDispath ={
    personal_count,
    personal_missioncount,
    personal_infocount
}

@connect(mapState,mapDispath)
class Personal extends Component {
    constructor(props){
        super(props)
        this.props.personal_infocount(this.props.match.params.id, moment().startOf('week').add(-3,'day').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss'))
        this.props.personal_missioncount(this.props.match.params.id, this.props.personal.page,moment().startOf('week').add(-3,'day').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss'))
        this.data_date=this.data_date.bind(this)
    }
    
    data_date=(_,dateString)=>{
        if (!dateString[0]) {
            this.props.personal_infocount(this.props.match.params.id, moment().startOf('week').add(-3,'day').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss'))
            this.props.personal_missioncount(this.props.match.params.id, this.props.personal.page,moment().startOf('week').add(-3,'day').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss'))    
        } else {
        this.props.personal_infocount(this.props.match.params.id,dateString[0],dateString[1])
        this.props.personal_missioncount(this.props.match.params.id,this.props.personal.page,dateString[0],dateString[1])
        }
    }
    
    
    render() {
        
        const {totalmission,totalworkhour,username,classcount,shouldrecordhour,recordhour,numbercount} = this.props.personal

        return (
            <div>
                <Row gutter={[16,16]}>
                    <Col span={24}>
                        <PageHeader
                        style={{width:'calc(100%)',backgroundColor:'white'}}
                        className="site-page-header"
                        onBack={() =>window.history.back()}
                        title={'姓名: '+username}
                        />
                    </Col>
                </Row>
        

                <Row gutter={[16,16]}>
                    
                    <Col span={24}>
                        <Card title='所选日期总数（默认为到今天为止的总数）'  style={{height:'100%'}} 
                            extra={
                                <RangePicker 
                                    key='chosedate'
                                    format="YYYY-MM-DD HH:mm:ss"
                                    onChange={this.data_date}
                                    defaultValue={[moment().startOf('week').add(-3,'day'),moment()]}
                                    showTime={{
                                    defaultValue:[moment('00:00:01', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                                    }}
                                />
                        }
                        >   
                            <Row gutter={[16,16]}>
                                <Col span={8}>
                                    <Card title={'参加过的任务数'} size='small' >
                                        <Statistic  value={totalmission} valueStyle={{textAlign: 'center'}}/>
                                    </Card>
                                </Col>
                           
                                <Col span={16}>
                                    <Card 
                                        title='工作时长(单位:小时)'
                                        extra={
                                            '实际录入工时: ' + Math.round(recordhour * 100) / 100
                                            +'\u00a0\u00a0\u00a0\u00a0' +  
                                            '应该录入工时: ' + Math.round(shouldrecordhour * 100) / 100
                                        }
                                        size='small'>

                                        <Row gutter={16}>
                                            {
                                                Object.keys(totalworkhour).map((item, index) => {
                                                    if (totalworkhour[item] === 0) {
                                                        return null
                                                    }
                                                    return <Col span={6} key={index}><Statistic  value={item + ': '+ totalworkhour[item].toFixed(2)} valueStyle={{textAlign: 'center'}}/></Col>
                                                })
                                            }
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>

                            <Divider />

                            <Row gutter={[16,16]}>       
                                <Col span={24}>
                                    <Card 
                                        title='完成总量'
                                        size='small'>
                                        <Row gutter={16}>
                                            {
                                                numbercount.map((item, index) => {
                                                    return <Col span={6} key={index}><Statistic  value={item} valueStyle={{textAlign: 'center'}}/></Col>
                                                })
                                            }
                                        </Row>
                                    </Card>
                                </Col>

                            </Row>
                            
                            {/* <Divider /> */}

                            <Row gutter={[16,16]}>
                                {
                                    classcount.map((item)=>{
                                    return (
                                        <Col span={6} key={item.label} >
                                                <Card.Grid  className='gridStyle' size='small' style={{width:'100%'}}>
                                                    <Descriptions size='small' >
                                                        <Descriptions.Item label={item.label}  >{item.showNumber.join('/')}</Descriptions.Item>
                                                    </Descriptions>
                                                </Card.Grid>
                                            </Col>
                                    )
                                    })
                                }
                            </Row>

                            <Divider />          

                            <Row gutter={[16,16]}>
                                <PersonalStatistics {...this.props} />
                            </Row>
                            
                        </Card>
                    </Col>

                </Row>
            </div>
        )
    }
}

export default Personal