import actionTypes from '../../actionCreators/actionTypes'

const initState={
    totaltrack:{},
    standardtrack:{},
    missiondetail:{},
    dataList: [],
    targetKeys: [],
    missionid:'',
    disabled:false,
    showSearch: false,
    modalvisble:false,
    isPost:false,
    isLoading:true,
    selecDataList:{},
    activeTabKey:'basicinfo',


    addRow:false,
    editingKey:'',
    trackdatalist:[],
    tracktotal:0,
    total:'',
    initdata:{},
    trackselecDataList:{},
    tracksearchcondition:{
        searchloading:false,
        page:1,
        search:'',
        date:['',''],
        onlygroup:true,
    }
    // trackmanager:{
    //     serachcondition:{
    //         page:1,
    //     },
    //     dataList: [],
    //     missionid:'',
    //     type:'detail',
    //     editingKey:'',
    //     addRow:false,
    //     initdata:{missionname:'无'},
    //     countlist:[{}],
    //     title:'任务数据',
    //     onlygroup:true,
    //     date:['2000-01-01 00:00:01',''],

    //     search:'',
    //     searchloading:false,
    //     usercountlist:[],
    //     selecDataList:{
    //         username:[],
    //     },
    //     clean:false
    // }
}

export default (state=initState,actions)=>{
    switch (actions.type){
        case actionTypes.MISSIONDETAIL_CHANGESTATE :
            return {
                ...state,
                ...actions.playload
            }
        case actionTypes.MISSIONDETAIL_TRACK_SEARCHCONDITION:
            const oldtracksearchcondition = state.tracksearchcondition
            return {
                ...state,
                tracksearchcondition:{
                    ...oldtracksearchcondition,
                    ...actions.playload
                }
            } 
        default:
            return state
    }
}