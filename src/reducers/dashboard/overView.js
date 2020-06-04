import actionTypes from '../../actionCreators/actionTypes'

const initState={
    totaldatanumber:0,
    todaydatanumber:0,
    mission_progress:{
        '完成':0,
        '进行中':0,
        '暂停':0
    },
    totalpeople:0,
    isLoading:true,
    datenumber:{},
    datemissionnumber:{},
    chartdatefinshnumber:{},
    daterangelist:[]
}

export default (state=initState,actions)=>{
    switch (actions.type){
        case actionTypes.OVERVIEW_CHANGESTATE:
            return {
                ...state,
                ...actions.playload
            }
        default:
            return state
    }
}