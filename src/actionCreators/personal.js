import actionTypes from './actionTypes'
import {services} from '../requests'


export const personal_count=(id,startdate='',enddate='')=>{
    return dispatch =>{
        services.get('/personal/count?id='+id+'&startdate='+startdate+'&enddate='+enddate).then((resp)=>{
            dispatch({
                type:actionTypes.PERSONAL_COUNT,
                playload:{
                    ...resp.data
                }
            })
        })
    }
}


export const personal_missioncount=(id, page='', startdate='',enddate='', )=>{
    return dispatch =>{
        services.get('/personal/missioncount?id='+id+'&startdate='+startdate+'&enddate='+enddate+'&page='+page).then((resp)=>{
            dispatch({
                type:actionTypes.PERSONAL_MISSIONCOUNT,
                playload:{
                    ...resp.data
                }
            })
        })
    }
}

export const personal_infocount=(id, startdate='',enddate='')=>{
    return dispatch =>{
        services.get('/personal/infocount?id='+id+'&startdate='+startdate+'&enddate='+enddate).then((resp)=>{
            dispatch({
                type:actionTypes.PERSONAL_INFOCOUNT,
                playload:{
                    ...resp.data
                }
            })
        })
    }
}

