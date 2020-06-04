import actionTypes from '../actionTypes'
import {services} from '../../requests'
export const overview_totalcount =()=>{
    return dispatch =>{
        services.get('/overview/totalCount')
            .then((resp)=>{
                dispatch(overview_changeState({...resp.data}))
        })
    }
}

export const overview_chartData =(startdate='',enddate='')=>{
    return dispatch =>{
        services.get('/overview/chartData?startdate='+startdate+'&enddate='+enddate)
            .then((resp)=>{
                dispatch(overview_changeState({...resp.data,isLoading:false}))
        })
    }
}

export const overview_changeState =(data)=>({
    type: actionTypes.OVERVIEW_CHANGESTATE ,
    playload:{
        ...data
    }
})