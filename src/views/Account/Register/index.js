import React, { Component } from 'react'
import RegisterForm from './RegisterForm'
import {Card,Button} from 'antd'
import './index.less'
import {connect} from 'react-redux'
import {register_postdata,register_getgroup} from '../../../actionCreators'
const mapState=(state)=>({
    login:state.login,
})

const mapDispath={
    register_postdata,
    register_getgroup
}
@connect(mapState,mapDispath)
class Register extends Component {
    constructor(props){
        super(props)
        this.props.register_getgroup()
    }
    render() {
        return (
            <Card
                className='register-card'
                title="注册标注管理系统"
                bordered={true}
                extra ={
                    <Button onClick={()=>this.props.history.push('/login')}>
                        返回登陆
                    </Button>
                }
            >   
                <RegisterForm {...this.props} />
            </Card>
        )
    }
}

export default Register