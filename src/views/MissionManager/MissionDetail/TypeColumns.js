
export const addMembercolumns=[
  {
    title:'工号',
    dataIndex:'id',
  },
  {
    title:'用户名',
    dataIndex:'username',
  },
  {
    title:'所属组',
    dataIndex:'groupname',
  },
  {
    title:'角色',
    dataIndex:'rolename',
  },
]

export const missiondetailcolumns=[
  {
    title:'任务编号',
    dataIndex:'id',
    inputType:'text',
    ruletype:"Notnull textid",
    width: 120,
    editable:true
  },
  {
    title:'任务名称',
    dataIndex:'missionname',
    inputType:'text',
    ruletype:"Notnull text",
    width:200,
    editable:true
  },
  {
    title:'需求人',
    dataIndex:'demand_person',
    inputType:'text',
    ruletype:"Notnull text",
    width:120,
    editable:true
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
  {
    title:'任务类型',
    dataIndex:'mission_class',
    inputType:'Cascader',
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
    inputType:'select',
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
    title:'任务数据上传路径',
    dataIndex:'data_upload_path',
    inputType:'text',
    width:120,
    ruletype:"null text",
    editable:true
  },    {
    title:'任务数据下载路径',
    dataIndex:'data_download_path',
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

]


export const tracknumber_columns=[

    {
    title:'大文件夹',
    dataIndex:'big_dir_number',
    inputType:'number',
    ruletype:"null number",
    editable:true
  },
  {
    title:'文件夹',
    dataIndex:'dir_number',
    inputType:'number',
    ruletype:"null number",
    editable:true
  },
  {
    title:'组',
    dataIndex:'group_number',
    inputType:'number',
    ruletype:"null number",
    editable:true
  },
  {
    title:'张',
    dataIndex:'frame',
    inputType:'number',
    ruletype:"null number",
    editable:true
  },
  {
    title:'框',
    dataIndex:'box_number',
    inputType:'number',
    ruletype:"null number",
    editable:true
  },
  {
    title:'段',
    dataIndex:'span_number',
    inputType:'number',
    ruletype:"null number",
    editable:true
  },
  {
    title:'个',
    dataIndex:'number',
    inputType:'number',
    ruletype:"null number",
    editable:true
  },
]


export const trackcolumns=[
  {
    title:'用户名',
    dataIndex:'username',
    inputType:'select',
    width: 100,
    ruletype:"Notnull text",
    editable:true,
  },
  {
    title:'所属组',
    dataIndex:'groupname',
    // width: 120,
  },
  {
    title:'时间',
    dataIndex:'recordtime',
    inputType:'text',
    width: 150,
    ruletype:"Notnull date",
    editable:true
  },
  {
  title:'大文件夹',
  dataIndex:'big_dir_number',
  inputType:'number',
  // width:120,
  ruletype:"null number",
  editable:true
  },{
  title:'文件夹',
  dataIndex:'dir_number',
  inputType:'number',
  // width:120,
  ruletype:"null number",
  editable:true
  },
  {
  title:'组数',
  dataIndex:'group_number',
  inputType:'number',
  // width:120,
  ruletype:"null number",
  editable:true
  },
  {
  title:'张数',
  dataIndex:'frame',
  inputType:'number',
  // width:120,
  ruletype:"null number",
  editable:true
  },
  {
  title:'框数',
  dataIndex:'box_number',
  inputType:'number',
  // width:120,
  ruletype:"null number",
  editable:true
  },
  {
  title:'段数',
  dataIndex:'span_number',
  inputType:'number',
  // width:120,
  ruletype:"null number",
  editable:true
  },
  {
  title:'个数',
  dataIndex:'number',
  inputType:'number',
  // width:120,
  ruletype:"null number",
  editable:true
  },
  {
    title:'工时',
    dataIndex:'work_hour',
    inputType:'number',
    // width: 120,
    ruletype:"Notnull hour",
    editable:true,
  },
  {
    title:'合格率',
    dataIndex:'pass_percent',
    inputType:'number',
    // width: 120,
    ruletype:"null number",
    editable:true,
  },
  {
    title:'备注',
    dataIndex:'track_note',
    inputType:'select',
    // width: 120,
    ruletype:"null text",
    editable:true,
  },
]
