import actionTypes from './actionTypes'
import {services} from '../requests'



export const statistics_postondition =(data,loading={searchloading:true})=>{
    return dispatch =>{
        dispatch(statistics_searchCondition({...loading}))
        services.post('/statistics/allMissionNumber',data).then((resp)=>{
            dispatch({
                type:actionTypes.STATISTICS_POST_CONDITION,
                playload:{
                    ...resp.data
                }
            })
            dispatch(statistics_searchCondition({...data}))
        })
    }
}


export const statistics_searchCondition=(data) =>({
    type:actionTypes.STATISTICS_SEARCHCONDITION,
    playload:{
        ...data
    }
})

export const statistics_changestate = (data) => (
    {
        type:actionTypes.STATISTICS_CHANGESTATE,
        playload:{
            ...data
        }
    }
)
