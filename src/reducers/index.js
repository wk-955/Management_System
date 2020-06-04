import {combineReducers} from 'redux'
import login from './login'
import frame from './frame'
import datamanager from './datamanager'

//missionmanager
import creatmission from './missionmanager/creatmission'
import missiondetail  from './missionmanager/missiondetail'
import missionselectable from './missionmanager/missionselectable'

import groupmember from './groupmember'
import statistics from './statistics'
import classmanager from './classmanager'
import personal from './personal'
import missionanalysis from './missionanalysis'
import personalform from './personalform'
import overView from './dashboard/overView'
export default combineReducers({
    login,
    frame,
    datamanager,

    //missionmanager
    creatmission,
    missiondetail,
    missionselectable,


    groupmember,
    statistics,
    classmanager,
    personal,
    missionanalysis,
    personalform,

    overView
})