import actionTypes from '../actionCreators/actionTypes'


const initState = {
    userlist: [],
    filters:{},
    pagination:{}
}

export default (state=initState, actions)=>{
    switch (actions.type){
        case actionTypes.PERSONALFORM_GETDATA:
            return {
                ...state,
                ...actions.playload
            }
        default:
            return state
    }
}
