import actionTypes from './actionTypes'
import {services} from '../requests'


export const missionanalysis_groupmember =(missionid,startdate,enddate)=>{
    return dispatch =>{
        services.get('/missionanalysis/GroupMember?missionid='+missionid+'&startdate='+startdate+'&enddate='+enddate)
            .then((resp)=>{
                dispatch({
                        type: actionTypes.MISSIONANALYSIS_GROUPMEMBER,
                        playload:{
                            ...resp.data
                        }
                    })
        })
    }
}
export const missionanalysis_changeState =(data)=>({
    type: actionTypes.MISSIONANALYSIS_CHANGESTATE,
    playload:{
        ...data
    }
})

export const missionanalysis_missionnumber =(missionid,startdate,enddate)=>{
    return dispatch =>{
        return services.get('/missionanalysis/MissionNumber?missionid=' + missionid+'&startdate='+startdate+'&enddate='+enddate).then((resp)=>{
            dispatch({
                type:actionTypes.MISSIONALYSIS_MISSIONNUMBER,
                playload:{
                    ...resp.data
                }
            })
        })
    }
}
