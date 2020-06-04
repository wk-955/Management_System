import React, { Component } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { Card, Input, Button, Checkbox, Alert } from 'antd';
import './index.less'
import {connect} from 'react-redux'
import {requestLogin,loginFaildClose} from '../../../actionCreators'
import Base64  from 'base-64';

const mapState =(state)=>({
    login:state.login
})



@connect(mapState,{requestLogin,loginFaildClose})
class Login extends Component {

    componentDidMount(){
        if (this.props.login.isLogin){
            this.props.history.push('/')
        }
    }
    
    render() {
        // console.log(this.props)
        const {isLoading,isShowErrmsg} =  this.props.login
        const onFinish = values => {
            this.props.loginFaildClose()
            values.password = Base64.encode(values.password)
            this.props.requestLogin(values).then(()=>{
                if (this.props.login.isLogin){
                    this.props.history.push('/')
                }
            })
          };
    
        return (
            <Card
                className='login-card'
                title="登录标注管理系统"
            >
            <Form 
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            >
                <Form.Item
                 rules={[{ required: true, message: '账号不能为空!' }]}
                 name = 'username'
                >
                    <Input
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    disabled= {isLoading}
                    placeholder="账号"
                    />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true, message: '密码不能为空!' }]}
                    name = 'password'
                >
                    <Input
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    disabled = {isLoading}
                    placeholder="密码"
                    />
                </Form.Item>
                {isShowErrmsg? <Alert message="密码或账号错误" type="error" /> :null}
                <Form.Item>
                    <Form.Item
                        valuePropName='checked'
                        name = 'remember'
                        noStyle
                        >
                        <Checkbox  disabled={isLoading}>保持登陆</Checkbox>
                    </Form.Item>
                    <a style={{marginLeft:'40%'}} href="6666">
                            忘记密码
                        </a>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" disabled={isLoading} >
                            登录
                    </Button>
                    <a  href="/register">注册</a>
                </Form.Item>
            </Form>
            </Card>
        );
    }
}
export default Login