import React, { Component } from 'react'
import {Layout,Row,Col, Button} from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {logout} from '../../actionCreators'
const { Header, Content, Footer } = Layout;



const mapState=(state)=>({
    login:state.login
  })
  
  const mapActions={
      logout
  }
  
@withRouter
@connect(mapState,mapActions)
class FrameMobile extends Component {
    render() {
        return (
            <Layout className="layout">
            <Header>
                <Row>
                <Col style={{color:"#FFFFFF"}}>{this.props.login.username}</Col>
                <Col offset={2} ><Button onClick={this.props.logout}  >登出</Button></Col>
                <Col offset={1} ><Button onClick={()=>this.props.history.push('/manager/ChangePassWord')}  >修改密码</Button></Col>
                </Row>
            </Header>
            <Content >
                {this.props.children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>数据管理系统测试版</Footer>
          </Layout>
        )
    }
}


export default FrameMobile