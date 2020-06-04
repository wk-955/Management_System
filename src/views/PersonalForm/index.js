import React, { Component } from 'react'
import PersonalList from './PersonalList'
import { personalform_getdata } from '../../actionCreators'
import { Card } from 'antd'
import { connect } from 'react-redux'

const mapState=(state)=>({
    personalform:state.personalform,
    login:state.login,
  })
  
const mapDispath={
    personalform_getdata
}

@connect(mapState, mapDispath)
class PersonalForm extends Component {
    constructor (props) {
        super(props)
        this.props.personalform_getdata()
    }
    render() {
        return (
            <div style={{alignContent:'center'}}>
                <Card
                    title='组员管理'
                >
                    <PersonalList {...this.props} />
                </Card>
            </div>
        )
    }
}

export default PersonalForm