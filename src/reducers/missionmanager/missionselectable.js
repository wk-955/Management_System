import actionTypes from '../../actionCreators/actionTypes'

const initState={
    dataList: [],
    total: 1,
    currenttable: 'mission',
    title:'组长管理',
    addRow:false,
    editingKey:'',
    searchCondition:{
        page:1,
        searchloading:false,
        search:'missionid',
        missionid:'',
        missionname:'',
        classSearch:'',
        responsible:'全部',
        progress:'',
        demand_person:'',
        startdates:['',''],
        enddates:['',''],
    },
    selecDataList:{
        responsible:[],
        progress:['进行中','暂停','完成']
    },
}

export default (state=initState,actions)=>{
    switch (actions.type){
        case actionTypes.MISSIONSELECTABLE_CHANGESTATE:
            return {
                ...state,
                ...actions.playload
            }
        case actionTypes.MISSIONSELECTABLE_SEARCHCONDITION:
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
        default:
            return state
    }
}