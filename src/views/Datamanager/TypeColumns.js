// mission 表结构
export const missioncolumns=[
    {
      title:'任务编号',
      dataIndex:'id',
      inputType:'text',
      ruletype:"Notnull textid",
      fixed: 'left',
      width: 120,
      editable:true
    },
    {
      title:'任务名称',
      dataIndex:'missionname',
      inputType:'text',
      ruletype:"Notnull text",
      fixed: 'left',
      width:200,
      editable:true
    },
    {
      title:'需求人',
      dataIndex:'demand_person',
      inputType:'text',
      ruletype:"Notnull text",
      fixed: 'left',
      width:120,
      editable:true
    },
    {
      title:'任务类型',
      dataIndex:'mission_type',
      inputType:'text',
      ruletype:"null text",
      width:150,
      editable:true
    },
    {
      title:'任务级别',
      dataIndex:'task_level',
      inputType:'text',
      ruletype:"null text",
      width:150,
      editable:true
    },
    {
      title:'标注标准',
      dataIndex:'standard',
      inputType:'text',
      ruletype:"null text",
      width:120,
      editable:true
    },    
    {
      title:'进度',
      dataIndex:'progress',
      inputType:'text',
      ruletype:"null text",
      width:120,
      editable:true
    },
    {
      title:'开始日期',
      dataIndex:'startdate',
      inputType:'text',
      width: 200,
      ruletype:"Notnull date",
      editable:true
      
    },
    {
      title:'完成日期',
      dataIndex:'enddate',
      inputType:'text',
      width: 200,
      ruletype:"null date",
      editable:true
    },
    {
      title:'质检结果',
      dataIndex:'results_quality',
      inputType:'text',
      width:120,
      ruletype:"null text",
      editable:true
    },
    {
      title:'备注',
      dataIndex:'mission_note',
      inputType:'text',
      width: 300,
      ruletype:"null text",
      editable:true,
    },
    {
      title:'责任人',
      dataIndex:'responsible',
      inputType:'select',
      fixed: 'right',
      width:120,
      ruletype:"Notnull text",
      editable:true
    },
]
  

export const usercolumns=[
  {
    title:'工号',
    dataIndex:'id',
    inputType:'text',
    width: 120,
    ruletype:"Notnull textid",
    editable:true,
  },
  {
    title:'用户名',
    dataIndex:'username',
    inputType:'text',
    width: 120,
    ruletype:"Notnull text",
    editable:true,
  },
  {
    title:'所属组',
    dataIndex:'groupname',
    inputType:'select',
    width: 120,
    ruletype:"Notnull text",
    editable:true,
  },
  {
    title:'权限级别',
    dataIndex:'rolename',
    inputType:'select',
    width: 120,
    ruletype:"Notnull text",
    editable:true,
  },
  {
    title:'重置密码',
    dataIndex:'password',
    inputType:'text',
    width: 120,
    ruletype:"null text",
    editable:true,
  },
  {
    title:'组员状态',
    dataIndex:'status',
    inputType:'text',
    width: 120,
    ruletype:"null text",
    editable:true,
  },
]

export const groupcolumns=[
  {
    title:'编号',
    dataIndex:'id',
    inputType:'number',
    width: 120,
    ruletype:"Notnull number",
    editable:true,
  },
  {
    title:'组名',
    dataIndex:'groupname',
    inputType:'text',
    width: 120,
    ruletype:"Notnull text",
    editable:true,
  },
  {
    title:'组状态',
    dataIndex:'status',
    inputType:'text',
    width: 120,
    ruletype:"Notnull text",
    editable:true,
  },
]

export const rolecolumns=[
  {
    title:'编号',
    dataIndex:'id',
    inputType:'number',
    width: 120,
    ruletype:"Notnull number",
    editable:true,
  },
  {
    title:'角色名',
    dataIndex:'rolename',
    inputType:'text',
    width: 120,
    ruletype:"Notnull text",
    editable:true,
  },
  {
    title:'是否默认角色',
    dataIndex:'default',
    inputType:'text',
    width: 120,
    ruletype:"Notnull text",
    editable:true,
  },
  {
    title:'权限等级',
    dataIndex:'perssions',
    inputType:'number',
    width: 120,
    ruletype:"Notnull number",
    editable:true,
  },
]