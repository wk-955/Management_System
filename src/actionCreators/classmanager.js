import actionTypes from './actionTypes'
import { services } from '../requests'
import { message } from 'antd'

export const classmanager_getData =(propsdata)=>{
    return dispatch =>{
        services.post('/classmanager/getdata', propsdata)
            .then((resp)=>{
                dispatch(
                    {
                        type: actionTypes.CLASSMANAGER_GETDATA,
                        playload:{
                            ...resp.data
                        }
                    }
                )
        })
    }
}

export const classmanager_postData = (propsdata, parentclass_id) => {
    return dispatch => {
        services.post('/classmanager/changemissionclass', propsdata)
            .then((resp) => {
                if (resp.code === 200){
                    dispatch(classmanager_getData({parentclass_id}))
                    message.success('保存成功')
                } else {
                    message.error('保存失败')
                }
        } )        
    }
}

export const classmanager_selectData = (propsdata) => {
    return dispatch => {
        services.post('/classmanager/getchildclass', propsdata)
            .then((resp) => {
                if (resp.code === 200){
                    dispatch(
                        {
                            type: actionTypes.CLASSMANAGER_GETDATA,
                            playload:{
                                ...resp.data
                            }
                        }
                      )
                    // message.success('上传成功')
                } else {
                    // message.error('上传失败')
                }
        } )        
    }
}

export const classmanager_changeEditingKey =(id) =>({
    type: actionTypes.CLASSMANAGER_CHANGEEDITINGKEY,
    playload:{
        editingKey:id
    }
})


export const classmanager_addRow = (isopen, addData={'id':''}) =>({
    type: actionTypes.CLASSMANAGER_ADDROW,
    playload:{
        addRow:isopen,
        addData,
    }
})

export const classmanager_changeState = (data) =>({
    type: actionTypes.CLASSMANAGER_CHANGESTATE,
    playload:{
        ...data
    }
})
