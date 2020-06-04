import actionTypes from '../actionTypes'
import {services} from '../../requests'

export const creatmission_initform =(missionid='')=>{
    let url = '/missionmanager/creatmission/initform/'
    if (missionid){
        url = url + '?missionid='+missionid
    }
    return dispatch =>{
        services.get(url).then((resp)=>{
            dispatch(creatmission_changestate(resp.data))
        })
    }
}

export const creatmission_addmission =(data)=>{
    return dispatch =>{
        dispatch(creatmission_changestate({isPost:true}))
        return services.post('/missionmanager/creatmission/addmission/',data)
    }
    
}

export const creatmission_changestate =(data)=>({
    type:actionTypes.CREATMISSION_CHANGESTATE,
    playload:{
        ...data
    }
})