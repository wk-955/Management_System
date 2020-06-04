import actionTypes from '../actionCreators/actionTypes'


const initState={
    dataList: [],
    missionname:'',
    missionid:'',
    userid:'',
    page:1,
    add:false,
    isLoading:false,
    total:0,
    trackNotelist:[]
}

export default (state=initState,actions)=>{
    switch (actions.type){
        case actionTypes.GROUPMEMBER_GETDATA:
            return {
                ...state,
                ...actions.playload
            }
        default:
            return state
    }
}