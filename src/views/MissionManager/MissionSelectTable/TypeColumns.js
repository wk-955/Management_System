import {Link} from 'react-router-dom'
import React from 'react'
export const missioncolumns=[
    {
      title:'任务编号',
      dataIndex:'id',
      inputType:'text',
      ruletype:"Notnull textid",
      fixed: 'left',
      width: 100,
      editable:true,
      render: (_, record) =><Link to={'/manager/missionmanager/MissionDetail/'+record.id}>{record.id}</Link>
    },
    {
      title:'任务名称',
      dataIndex:'missionname',
      inputType:'text',
      ruletype:"Notnull text",
      fixed: 'left',
      width:150,
      editable:true,
      // render: (_, record) =><Link to={'/manager/TrackManager/'+record.id}>{record.missionname}</Link>
    },
    {
      title:'需求人',
      dataIndex:'demand_person',
      inputType:'text',
      ruletype:"Notnull text",
      fixed: 'left',
      width:100,
      editable:true
    },
    {
      title:'开始日期',
      dataIndex:'startdate',
      inputType:'text',
      width: 150,
      ruletype:"Notnull date",
      editable:true
    },
    {
      title:'完成日期',
      dataIndex:'enddate',
      inputType:'text',
      width: 150,
      ruletype:"null date",
      editable:true
    },
    {
      title:'任务类型',
      dataIndex:'mission_class',
      inputType:'Cascader',
      ruletype:"null text",
      width:150,
      render: (value) =><div>{value.join('/')}</div>,
      editable:true
    },
    {
      title:'进度',
      dataIndex:'progress',
      inputType:'select',
      width: 120,
      ruletype:"null text",
      editable:true,
    },
    {
      title:'备注',
      dataIndex:'mission_note',
      inputType:'text',
      width: 200,
      ruletype:"null text",
      editable:true,

    },
    {
      title:'责任人',
      dataIndex:'responsible',
      inputType:'select',
      // fixed: 'right',
      width:120,
      ruletype:"Notnull text",
      editable:true
    },
]




