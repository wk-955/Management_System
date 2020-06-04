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
      title:'开始日期',
      dataIndex:'startdate',
      inputType:'text',
      width: 200,
      ruletype:"Notnull date",
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
      inputType:'select',
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
      ruletype:"Notnull text",
      width:120,
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
    },    {
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