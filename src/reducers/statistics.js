import actionTypes from '../actionCreators/actionTypes'

const initState={
    dataList: [],
    show:false,
    statuscount:[],
    classcount:[],
    total:0,
    numbertotalcount:[],
    currentmissions:0,
    hourCountDict:{},
    totalhour:0,
    shouldHours:0,
    hourshow:false,
    personal_hourList:[],

    searchCondition:{
        page:1,
        startdate:'',
        enddate:'',
        classSearch:'',
        searchloading:false,
        loading:false,
        search:'missionid',
        missionid:'',
        missionname:'',
        responsible:'全部',
        progress:'',
        startdates:['',''],
        enddates:['',''],
        groupid:'',
        checkedList: [],
        indeterminate: true,
        checkAll: false,
    },
    selectedRowKeys:[],
    selecDataList:{
        grouplist:[],
        responsible:[],
        progress:['进行中','暂停','完成']
    },
}

export default (state=initState,actions)=>{
    switch (actions.type){
        case actionTypes.STATISTICS_CHANGESTATE:
            return {
                ...state,
                ...actions.playload
            }
        case actionTypes.STATISTICS_SEARCHCONDITION:
            const oldsearchCondition ={...state.searchCondition} 
            const {missionid,missionname}=actions.playload
            const finalstate = !missionid || !missionname ?
            {
                ...state,
                searchCondition:{
                    ...oldsearchCondition,
                    ...actions.playload
                }
            }
            :
            {
                ...state,
                searchCondition:{
                    ...initState.searchCondition,
                    ...actions.playload
                }
            }
            return finalstate
        case actionTypes.STATISTICS_POST_CONDITION:
            return {
                ...state,
                ...actions.playload
            }
        default:
            return state
    }
}