import actionTypes from '../actionCreators/actionTypes'

const initState={
    group_member_count:{},
    group:'',
    totallist:[],
    totalrate:[],
    missionstartdate:'',
    missionenddate: '',
    percent_dict:{},
    group_member_workhourcount:{},
    group_mission_hourcount:{},
    grouptimelist:[],
    missionDatehour:0
}

export default (state=initState,actions)=>{
    switch (actions.type){
        case actionTypes.MISSIONANALYSIS_GROUPMEMBER:
            const {group_member_count} = actions.playload
            const grouplist = Object.keys(group_member_count)
            return {
                ...state,
                ...actions.playload,
                group:grouplist.length>0 ? grouplist[0]:'',
            }
        case actionTypes.MISSIONANALYSIS_CHANGESTATE:
            return {
                ...state,
                ...actions.playload
            }
        case actionTypes.MISSIONALYSIS_MISSIONNUMBER:
            return {
                ...state,
                ...actions.playload
            }
        default:
            return state
    }
}