import React, { Component } from 'react'
import { Result,Button} from 'antd';


export default class SucessReults extends Component {
    render() {
        return (
        <Result
            status="success"
            title="成功注册"
            extra={[
                <Button type="primary" key="login" onClick={()=>this.props.history.push('/login')}>
                  返回登录
                </Button>
              ]}
            />
        )
    }
}
