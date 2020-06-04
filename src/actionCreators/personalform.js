import actionTypes from './actionTypes'
import {services} from '../requests'


export const personalform_getdata = () =>{
    return dispatch =>{
        services.get('/personal/list').then((resp)=>{
            dispatch({
                type:actionTypes.PERSONALFORM_GETDATA,
                playload:{
                    ...resp.data
                }
            })
        })
    }
}
