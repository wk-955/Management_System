import React, { Component } from 'react'
import {datamanager_getdata,changeEditingKey,addRow,datamanager_postdata,datamanager_changeState} from '../../actionCreators'
import '@ant-design/compatible/assets/index.css';
import { Card, Button,Select} from 'antd';
import {connect} from 'react-redux'
import EditableTable from './EditableTable';



const mapState=(state)=>({
    datamanager:state.datamanager,
    login:state.login,
})

const mapDispath={
    datamanager_getdata,
    changeEditingKey,
    addRow,
    datamanager_postdata,
    datamanager_changeState
}

const ButtonGroup = Button.Group;
const { Option } = Select;

@connect(mapState,mapDispath)
class Datamanager extends Component {
    constructor(props){
        super(props)
        this.state={
            disabledSelect:false
        }
        this.handletablechange = this.handletablechange.bind(this)
        this.props.datamanager_getdata({...this.props.datamanager})
    }

    handletablechange=(value)=>{
        this.props.datamanager_changeState({disabledSelect:true})
        this.props.datamanager_getdata({...this.props.datamanager,tablename:value})
        this.props.datamanager_changeState({disabledSelect:false})
    }

    render() {
        return (
            <Card
                extra={
                    <ButtonGroup>
                            <Select defaultValue={this.props.datamanager.tablename} 
                                style={{ width: 120 }} 
                                onChange={this.handletablechange} 
                                disabled={this.props.login.roleid==='3'?  this.props.datamanager.disabledSelect : true}
                                >
                                <Option value="user">用户</Option>
                                <Option value="role">角色</Option>
                                <Option value="group">组</Option>
                                {/* <Option value="/track">记录表</Option> */}
                            </Select>

                    </ButtonGroup>}
                title='数据管理'
            > 
            <EditableTable  {...this.props} />
            </Card>
        );
    }
}


export default Datamanager