import actionTypes from '../actionCreators/actionTypes'

const initState={
    dataList:[],
    editingKey:'',
    tablename:'user',
    page:1,
    search:'userid',
    searchloading:false,
    username:'',
    userid:'',
    disabledSelect:false,
    initdata:{id:'/'},
    addRow:false
}

export default (state=initState,actions)=>{
    switch (actions.type){
        case actionTypes.GET_TARGET_TABLE:
            return {
                ...state,
                ...actions.playload
            }
        case actionTypes.CHANGE_EDITINGKEY:
            return  {
                ...state,
                ...actions.playload
            }
        case actionTypes.ADD_ROW:
            const newState = {...state}
            const {addData,addRow} = {...actions.playload}
            if (addData.id !== ''){
                const index = newState.dataList.findIndex(item=>addData.id === item.id)
                index !== -1 ?
                newState.dataList.splice(index,1,addData)
                :
                newState.dataList= [addData,...state.dataList]
            }
            newState.addRow=addRow
            return newState
        // case actionTypes.POST_TABLE_DATA:
        //     const newState = {...state}
        //     const data = {...actions.playload}
        //     const index = newState.dataList.findIndex(item=>data.id === item.id)
        //     newState.dataList.splice(index,1,data)
        //     newState.editingKey=null
        //     return newState
        default:
            return state
    }
}