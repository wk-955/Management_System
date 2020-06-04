import actionTypes from "../actionCreators/actionTypes";
const initState={
    currentitem:'/manager/Datamanager',
    collapsed :true
}


export default (state=initState,actions)=>{
    switch (actions.type){
        case (actionTypes.CURRENT_ITEM):
            return {
                ...state,
                currentitem:actions.playload.currentitem
            }
        case (actionTypes.CHANGE_COLLAPSED):
            let newState = {...state}
            newState.collapsed = !newState.collapsed
            return newState
        default:
            return state
    }
}