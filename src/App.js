import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import {managerRoutes} from './routes'
import Frame from './components/Frame'
import FrameMobile from './components/FrameMobile'
import {connect} from 'react-redux'

const mapState=(state)=>({
    login:state.login,
    isLogin : state.login.isLogin
})

@connect(mapState)
class App extends Component {
    render() {
        const {isLogin,login} =this.props

        return (
        isLogin? 
        Number(login.roleid)>=2?
            <Frame>
            <Switch>
            {
                managerRoutes.map(route=>{
                    return <Route exact={true} key={route.path} path={route.path} render={(routeProps)=>{
                            return <route.component {...routeProps} />
                    }} />
                    // return <Route  key={route.path} path={route.path} component={route.component}   />
                })
            }
            <Redirect exact from='/manager' to='/manager/missionmanager/MissionSelectTable' />
            <Redirect to='/404' />
            </Switch>
            </Frame>
            :
            <FrameMobile>
            <Switch>
            {
                managerRoutes.map(route=>{
                   return <Route exact={true} key={route.path} path={route.path} render={(routeProps)=>{
                        return <route.component {...routeProps} />
                   }} />
                    // return <Route  key={route.path} path={route.path} component={route.component}   />
                })
            }
            <Redirect exact from='/manager' to='/manager/GroupMember' />
            <Redirect to='/404' />
            </Switch>
            </FrameMobile>
        :
        <Redirect to='/login' />
        )
    }
}

export default App
