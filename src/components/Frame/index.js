import React, { Component } from 'react'
import { DownOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Dropdown, Button,} from 'antd';
import './index.less'
import {menumanager} from '../../routes'
import {connect} from 'react-redux'
import {changeCollapsed,currentItem,logout} from '../../actionCreators'
import {withRouter} from 'react-router-dom'
const { Sider, Content} = Layout;
const { SubMenu } = Menu;

const mapState=(state)=>({
  frame:state.frame,
  login:state.login
})

const mapActions={
  changeCollapsed,
  currentItem,
  logout
}

@withRouter
@connect(mapState,mapActions)
class Frame extends Component {
    constructor(props){
      super(props)

      this.turnback=this.turnback.bind(this)
      this.changeItem=this.changeItem.bind(this)
    }

    changeItem =({key})=>{
      this.props.currentItem(key)
      this.props.history.push(key)
    }

    turnback=()=>{
      this.props.history.goBack()
    }

    componentDidMount(){
      this.props.currentItem(this.props.location.pathname)
    }

  
    

    render() {
        const {collapsed} = this.props.frame
        const menu = (
          <Menu>
            <Menu.Item>
              <Button key='login'  onClick={this.props.logout}>
                登出
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button key='changepassword'  onClick={()=>this.props.history.push('/manager/ChangePassWord')}>
                修改密码
              </Button>
            </Menu.Item>
          </Menu>
        )

        return (
          <Layout className='frame-wrapper'>
              <Sider trigger={null} collapsible collapsed={collapsed}>
                  <div style={{width:'100%',height:'39px'}}>
                      {!collapsed ? 
                      <Dropdown overlay={menu}>
                          <div className='frame-drop'>
                          <UserOutlined />{this.props.login.username}<DownOutlined />
                          </div>
                      </Dropdown> : null }
                      <div className={!collapsed ? 'frame-trigger-right':'frame-trigger-center'}>
                          <UnorderedListOutlined onClick={this.props.changeCollapsed} />
                      </div>
                  </div>
              <Menu theme="dark" mode="inline" selectedKeys={[this.props.location.pathname]} onClick={this.changeItem} defaultSelectedKeys='/manager/missionmanager/MissionSelectTable' >  
                {
                  menumanager.filter(route=>!route.CannotChose && route.roleid.indexOf(Number(this.props.login.roleid)) !== -1).map(route=>{
                      switch (route.type){
                        case 'childern':
                          return <SubMenu key={route.path} title={
                            <>
                            {route.icon}
                            <span>{route.title}</span>
                            </>
                          }
                          onTitleClick={this.changeItem}
                          >
                            {
                              route.rowchildern.filter(childrenroute=>childrenroute.roleid.indexOf(Number(this.props.login.roleid)) !== -1).map((childrenroute)=>{
                                return <Menu.Item key={childrenroute.path}> 
                                  {childrenroute.icon}
                                  <span>{childrenroute.title}</span>
                                  </Menu.Item>
                              })
                            }
                          </SubMenu>
                        default:
                          return (
                            <Menu.Item key={route.path}>
                                {route.icon}
                                <span>{route.title}</span>
                            </Menu.Item>
                          );
                      }
                  })
                }
              </Menu>
              </Sider>
              <Layout>
                  <Content
                      style={{
                      padding: 16,
                      background: '#f2f4f5',
                      minHeight: 280,
                      }}
                  >
                  {this.props.children}
              </Content>
              </Layout>
          </Layout>
        );
    }
}

export default Frame