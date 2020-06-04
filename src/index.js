import React from 'react';
import {render}from 'react-dom';
import App from './App'
import './index.less'
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from 'antd'
import {Provider} from 'react-redux'
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import {mainRoutes} from './routes'
import store from './stroe'

render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <Router>
                <Switch>
                    <Route  path='/manager' render={(routeProps)=>{
                        return <App {...routeProps} />
                    }} />
                    {
                        mainRoutes.map(route=>{
                            return(
                            <Route key={route.path} path={route.path} component={route.component} />
                            )
                        })
                    }
                    <Redirect exact from="/" to="/manager" />
                    <Redirect to='/404'/>
                </Switch>
            </Router>
        </ConfigProvider>
    </Provider>
    , 
    document.getElementById('root')
);

