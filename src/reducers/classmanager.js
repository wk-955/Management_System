import actionTypes from '../actionCreators/actionTypes'

const initState = {
    dataList: [],
    addRow:false,
    initdata:{id:'/'},
    editingKey:'',
    currentClass:'',
    currentClassname: ''
}


export default (state = initState, action) => {
    switch(action.type) {
        case actionTypes.CLASSMANAGER_CHANGESTATE:
            return  {
                ...state,
                ...action.playload
            }
        case actionTypes.CLASSMANAGER_GETDATA:
            return  {
                ...state,
                ...action.playload
            }
        case actionTypes.CLASSMANAGER_ADDROW:
            const newState = {...state}
            const {addData,addRow} = {...action.playload}
            if (addData.id !== ''){
                const index = newState.dataList.findIndex(item => addData.id === item.id)
                index !== -1 
                ?
                newState.dataList.splice(index,1,addData)
                :
                newState.dataList= [addData,...state.dataList]
            }
            newState.addRow=addRow
            return newState
        case actionTypes.CLASSMANAGER_CHANGEEDITINGKEY:
            return  {
                ...state,
                ...action.playload
            }
        default:
            return state
    }
}