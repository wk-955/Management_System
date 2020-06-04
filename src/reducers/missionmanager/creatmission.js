import actionTypes from '../../actionCreators/actionTypes'

const initState={
    isLoading:true,
    isPost:false,
    selecDataList:{
        responsible:[],
        progress:['进行中','暂停','完成'],
        task_level:['S','A','B','C']
    },
}

export default (state=initState,actions)=>{
    switch (actions.type){
        case actionTypes.CREATMISSION_CHANGESTATE:
            return{
                ...state,
                ...actions.playload
            }
        default:
            return state
    }
}