import React, { Component } from 'react'
import { Row, Col ,Card,Statistic,PageHeader,Spin,DatePicker} from 'antd'
import {overview_changeState,overview_totalcount,overview_chartData} from '../../../actionCreators'
import { connect } from 'react-redux'
import DataNumberChart from './DataNumberChart'
import AreaChart from './AreaChart'
import Rangelist from './Rangelist'
import FinshNumber from './FinshNumber'
import "moment/locale/zh-cn";
import moment from 'moment'
import './index.less'

moment.locale('zh-cn');

const { RangePicker } = DatePicker
const mapState=(state)=>({
    overView:state.overView
  })
  
const mapDispath ={
    overview_changeState,
    overview_totalcount,
    overview_chartData
}

@connect(mapState,mapDispath)
class Overview extends Component {
    constructor(props){
        super(props)
        this.props.overview_totalcount()
        this.props.overview_chartData(moment().add(-20,'day').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD'))
        this.chartdata_date = this.chartdata_date.bind(this)
    }

    chartdata_date=(_,dateString)=>{
        if (dateString[0]===''){
            this.props.overview_chartData(
                moment().add(-20,'day').format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD')
            )
        }
        else{
            this.props.overview_chartData(
                dateString[0],
                dateString[1]
            )
        }
    }


    render() {
        const {
            totaldatanumber,
            todaydatanumber,
            mission_progress,
            totalpeople,
            isLoading,
            datenumber,
            datemissionnumber,
            chartdatefinshnumber,
            daterangelist
        } =this.props.overView

        return (
            <div>
            {
                isLoading ?
                <Spin  />
                :
                <> 
                <Row gutter={[0,8]}>
                    <Col span={24}>
                        <PageHeader
                            style={{backgroundColor:'#fff'}}
                            title="数据总览页"
                        />
                    </Col>
                </Row>
                <Row gutter={[16,8]}>
                    <Col span={8}>
                        <Card>
                            <Row className="card_row_boder" >
                                <Statistic value={totaldatanumber} title='完成的数据量（截至今日）:' valueStyle={{width:'100%'}}  style={{width:'100%'}}  />
                                <DataNumberChart data={datenumber} />
                            </Row>
                            <Row>
                                本日新增量：{todaydatanumber}
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Row className="card_row_boder" >
                                <Statistic value={mission_progress['完成']} title='已完成的任务数（截至今日）:' valueStyle={{textAlign:'center',width:'100%'}}  style={{width:'100%'}}  />
                                <AreaChart  data={datemissionnumber} />
                            </Row>
                            <Row>
                                <Col span={8}>
                                    {`进行中的任务：${mission_progress['进行中']}`}
                                </Col>
                                <Col span={8}>
                                    {`暂停的任务：${mission_progress['暂停']}`}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card style={{height:190}}>
                            <Row className="card_row_boder" >
                                <Statistic value={totalpeople} title='对接的算法人员数（截至今日）:' valueStyle={{textAlign:'center',width:'100%'}}  style={{width:'100%'}}  />
                            </Row>
                            <Row>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[16,8]}>
                    <Col span={24}>
                        <Card
                            extra={
                                <RangePicker 
                                key='chosedate'
                                format="YYYY-MM-DD"
                                onChange={this.chartdata_date}
                                defaultValue={[moment().add(-20,'day'),moment()]}
                            />
                            }
                        >
                            <Row>
                                <Col span={16}>
                                    <Card>
                                    <FinshNumber data={chartdatefinshnumber}/>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card>
                                        <Rangelist data={daterangelist}/>
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                </>
            }
            </div>
        )
    }
}


export default Overview