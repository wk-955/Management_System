import React, { Component } from 'react'
import MForm from './MForm'
import {creatmission_initform,creatmission_addmission,creatmission_changestate} from '../../../actionCreators'
import { connect } from 'react-redux'
import {missiondetailcolumns} from '../CreatMission/missionColumns'
import {Card,PageHeader,Spin} from 'antd'
const mapState=(state)=>({
    creatmission:state.creatmission,
})

//派发行动
const mapDispath={
    creatmission_initform,
    creatmission_addmission,
    creatmission_changestate
}


@connect(mapState,mapDispath)
class CreatMission extends Component {
    constructor(props){
        super(props)
        this.props.creatmission_initform()
    }

    render() {
        const {isLoading} =this.props.creatmission
        return (
            <Card
                title={
                    <PageHeader
                    style={{width:'calc(100%)',backgroundColor:'white'}}
                    className="site-page-header"
                    onBack={() =>this.props.history.goBack()}
                    title={'任务创建页面'}
                    />
                }
                bodyStyle={{display:'flex',justifyContent:'center'}}
            >
                {isLoading ? <Spin />: <MForm {...this.props} columns={missiondetailcolumns} />}
            </Card>
        )
    }
}

export default CreatMission