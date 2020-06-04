import React, { Component } from 'react'
import EditableClassManager  from './EditableClassManager'
import { Card } from 'antd'
import { connect } from 'react-redux'
import { classmanager_addRow, classmanager_changeEditingKey, classmanager_getData, classmanager_postData, classmanager_changeState, classmanager_selectData } from '../../actionCreators'

const mapState = (state) => ({
    classmanager: state.classmanager,
})

const mapDispatch = {
    classmanager_addRow, 
    classmanager_changeEditingKey, 
    classmanager_getData, 
    classmanager_postData, 
    classmanager_changeState, 
    classmanager_selectData
}

@connect(mapState, mapDispatch)
class classManager extends Component {
    constructor(props) {
        super(props)
                                                        
        // 请求数据，如果有parentclass_id则返回子类列表，否则返回父类列表
        this.props.classmanager_getData({parentclass_id:this.props.classmanager.currentClass})
    }

    render() {
        return (
            <div>
                <Card 
                    title={
                        this.props.classmanager.currentClass === '' 
                        ? 
                        '父类管理' 
                        : 
                        this.props.classmanager.currentClassname }>
                    <EditableClassManager {...this.props} />
                </Card>

            </div>
        )
    }
}

export default classManager

