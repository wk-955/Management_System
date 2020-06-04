import React, { Component } from 'react'
import {ChangeForm} from './ChangeForm'
import {connect} from 'react-redux'
import {changepassword} from '../../actionCreators'
import { Card, Button } from 'antd'

const mapState =(state)=>({
    login:state.login
})



@connect(mapState,{changepassword})
class ChangePassWord extends Component {
    render() {
        return (
            <Card
                title='密码修改页'
                extra={<Button onClick={()=>this.props.history.goBack()} >退出页面</Button>}
            >
                <ChangeForm {...this.props} />
            </Card>
        )
    }
}


export default ChangePassWord