import actionTypes from './actionTypes'
import {services} from '../requests'
import {message} from 'antd'

export const datamanager_getdata =(data)=>{
    return dispatch =>{
        services.post('/datamanager/getdata',data).then((resp)=>{
            dispatch({
                type:actionTypes.GET_TARGET_TABLE,
                playload:{
                    ...resp.data
                }
            })
        })
    }
}


export const datamanager_postdata =(propsdata,data) =>{
    return dispatch =>{
        services.post('/postdata/'+propsdata.tablename,data).then((resp)=>{
            if (resp.code===200){
                dispatch(datamanager_getdata(propsdata))
                 message.success('保存成功')
             }else{
                 message.error('保存失败')
             }
        })
    }
}

export const changeEditingKey=(key) =>({
    type:actionTypes.CHANGE_EDITINGKEY,
    playload:{
        editingKey:key
    }
})


export const addRow=(isopen,addData={'id':''}) =>({
    type:actionTypes.ADD_ROW,
    playload:{
        addRow:isopen,
        addData,
    }
})

export const datamanager_changeState=(data) =>({
    type:actionTypes.GET_TARGET_TABLE,
    playload:{
        ...data
    }
})