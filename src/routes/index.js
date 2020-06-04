import { TableOutlined, ProfileOutlined,ToolOutlined,UserOutlined,SettingFilled,DashboardOutlined} from '@ant-design/icons';
import React from 'react'
import {
    NotFound,
    Datamanager,
    Login,
    MissionSelectTable,
    MissionDetail,
    Register,
    SucessReults,
    GroupMember,
    ChangePassWord,
    Statistics,
    ClassManager,
    Personal,
    MissionAnalysis,
    PersonalForm,
    CreatMission,
    Overview
} from '../views'


// 1组员 2组长 3管理员 4项目负责人

const mainRoutes= [
    {
        path:'/404',
        component:NotFound
    },
    {
        path:'/login',
        component:Login
    },
    {
        path:'/register',
        component:Register
    },    {
        path:'/sucess',
        component:SucessReults
    },

]


const managerRoutes = [
    {
        path:'/manager/datamanager',
        title:'数据管理',
        component:Datamanager,
        roleid:[3]
    },

    //missionmanager
    {
        path:'/manager/missionmanager/MissionSelectTable',
        title:'任务选择页面',
        component:MissionSelectTable,
        roleid:[2,3,4]
    },
    {
        path:'/manager/missionmanager/MissionDetail/:missionid',
        component:MissionDetail,
        parentcomponent:"missionselectable",
        CannotChose:true,
        roleid:[2,4]
    },{
        path: '/manager/missionmanager/CreatMission',
        title: '任务创建',
        component: CreatMission,
        CannotChose:true,
        roleid:[2,3,4]
    },
    {
        path:'/manager/GroupMember',
        title:'组员页面',
        component:GroupMember,
        CannotChose:false,
        roleid:[1,3]
    },
    {
        path:'/manager/ChangePassWord',
        title:'修改密码',
        component:ChangePassWord,
        CannotChose:true,
        roleid:[1,2,3,4]
    },
    {
        path:'/manager/Statisitcs',
        title:'项目运营分析报表',
        component:Statistics,
        roleid:[2,3,4]
    },{
        path:'/manager/MissionAnalysis/:missionid',
        title:'任务分析页面',
        parentcomponent:"Statistics,TrackManager",
        component:MissionAnalysis,
        CannotChose:true,
        roleid:[2,3,4]
    },
    {
        path:'/manager/ClassManager',
        title:'任务属性添加页面',
        component:ClassManager,
        roleid:[3,4]
    },{
        path:'/manager/Personal/:id',
        title:'个人页面',
        component:Personal,
        CannotChose:true,
        roleid:[1,2,3,4]
    },{
        path: '/manager/PersonalForm',
        title: '组员工作分析报表',
        component: PersonalForm,
        roleid:[2,3,4]
    },{
        path:'/manager/Overview',
        title: '总览页',
        component: Overview,
        roleid:[2,3,4]
    }
]


const menumanager = [
    {
        path:'/manager/datamanager',
        title:'数据管理',
        type:'normal',
        icon:<SettingFilled />,
        roleid:[3]
    },
    {
        path:'/manager/missionmanager/MissionSelectTable',
        title:'任务管理',
        roleid:[2,3,4],
        type:'childern',
        icon:<ProfileOutlined />,
        rowchildern:[{
            path:'/manager/ClassManager',
            title:'任务属性添加页面',
            icon:<ToolOutlined />,
            roleid:[3,4]
        },]
    },
    {
        path:'/manager/GroupMember',
        title:'组员页面',
        type:'normal',
        icon:<UserOutlined />,
        roleid:[1,3]
    },
    {
        path:'/manager/Statisitcs',
        title:'项目运营分析报表',
        type:'normal',
        icon:<TableOutlined />,
        roleid:[2,3,4]
    },{
        path: '/manager/PersonalForm',
        title: '组员工作分析报表',
        type:'normal',
        icon:<UserOutlined />,
        roleid:[2,3,4]
    },{
        path:'/manager/Overview',
        title: '总览页',
        type:'normal',
        icon:<DashboardOutlined />,
        roleid:[2,3,4]
    },
]




export {
    mainRoutes,
    managerRoutes,
    menumanager
}