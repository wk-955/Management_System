import actionTypes from './actionTypes'


export const currentItem =(currentitem)=>({
    type:actionTypes.CURRENT_ITEM,
    playload:{
        currentitem
    }
})


export const changeCollapsed =()=>({
    type:actionTypes.CHANGE_COLLAPSED,
})
