import actionTypes from '../actionTypes'
import {services} from '../../requests'

export const missionselectable_getmission =(data)=>{
    return dispatch =>{
        dispatch(missionselectable_searchcondition({searchloading:true}))
        services.post('/missionmanager/missionselectable/getmission',data).then((resp)=>{
            dispatch(missionselectable_changestate(resp.data))
        })
        dispatch(missionselectable_searchcondition({...data}))
    }
}


export const missionselectable_changestate=(data) =>({
    type:actionTypes.MISSIONSELECTABLE_CHANGESTATE,
    playload:{
        ...data
    }
})

export const missionselectable_searchcondition=(data) =>({
    type:actionTypes.MISSIONSELECTABLE_SEARCHCONDITION,
    playload:{
        ...data
    }
})


