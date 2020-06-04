import actionTypes from '../actionCreators/actionTypes'

const initState={
    classdatalist:[],
    missioncountdict:{},
    missionid:'',
    missionname:'',
    username:'',
    totalworkhour: {},
    missionlist:[],
    classcount:[],
    numbercount:[],
    recordhour:0.00,
    shouldrecordhour:0.00,
    page:1
}

export default (state=initState,actions)=>{
    switch (actions.type){
        case actionTypes.PERSONAL_COUNT:
            return {
                ...state,
                ...actions.playload
            }
        case actionTypes.PERSONAL_MISSIONCOUNT:
            return {
                ...state,
                ...actions.playload
            }
        case actionTypes.PERSONAL_INFOCOUNT:
            return {
                ...state,
                ...actions.playload
            }
        default:
            return state
    }
}