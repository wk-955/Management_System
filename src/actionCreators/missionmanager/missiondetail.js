import actionTypes from '../actionTypes'
import {services} from '../../requests'
import {message} from 'antd'


export const missiondetail_getmissiondetail =(missionid)=>{
    return dispatch =>{
        services.get('/missionmanager/missiondetail/'+missionid).then((resp)=>{
            dispatch(missiondetail_changestate(resp.data))
        })
    }
}

export const missiondetail_switchmember =(missionid,data) =>{
    return dispatch =>{
    // let savecode=true
    services.post('/missionmanager/missiondetail/switchmember/',data).then((resp)=>{
        // console.log('post-rep',resp)
        if (resp.code===200){
            dispatch(missiondetail_getmissiondetail(missionid))
            message.success('调整成功')
            return true
        }else{
            message.error('调整失败')
            return false
        }
    })
    }
}


export const missiondetail_changemissiondetail =(data,url,missionid)=>{
    return dispatch =>{
        dispatch(missiondetail_changestate({isPost:true}))
        return services.post('/missionmanager/missiondetail/changemissiondetail/'+url,data,missionid).then(()=>{
            dispatch(missiondetail_getmissiondetail(missionid))
        })
    }
}


export const missiondetail_getTrack =(data)=>{
    return dispatch =>{
        dispatch(missiondetail_track_searchcondition({searchloading:true}))
        return services.post('/missionmanager/missiondetail/getTrack',data).then((resp)=>{
            dispatch(missiondetail_changestate(resp.data))
            dispatch(missiondetail_track_searchcondition({...data,searchloading:false}))
        })
    }
}

export const missiondetail_changemissiontrack =(data,searchcondition)=>{
    return dispatch =>{
        dispatch(missiondetail_track_searchcondition({searchloading:true}))
        return services.post('/missionmanager/missiondetail/changemissiontrack/',data).then(()=>{
            dispatch(missiondetail_getTrack(searchcondition))
        })
    }
}


export const missiondetail_changestate =(data) =>({
    type:actionTypes.MISSIONDETAIL_CHANGESTATE,
    playload:{
        ...data
    }
})


export const missiondetail_change_trackmanager=(data) =>({
    type:actionTypes.MISSIONDETAIL_CHANGE_TRACKMANAGER,
    playload:{
        ...data
    }
})

export const missiondetail_track_searchcondition=(data) =>({
    type:actionTypes.MISSIONDETAIL_TRACK_SEARCHCONDITION,
    playload:{
        ...data
    }
})