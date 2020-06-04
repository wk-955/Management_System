import React, { Component } from 'react'
import {Result,Button} from 'antd'
import {withRouter} from 'react-router-dom'

@withRouter
class NotFound extends Component {
    backhome=()=>{
        this.props.history.push('/')
    }

    render() {
        return (
            <Result
            status="404"
            title="404"
            subTitle="没有找到该页面"
            extra={<Button type="primary" onClick={this.backhome}>Back Home</Button>}
          />
        )
    }
}
export default NotFound