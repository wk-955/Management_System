import React from 'react'
import { Table,Input, InputNumber, Popconfirm, Form,Button,Select,Row,Col,DatePicker,Switch, Card,Spin} from 'antd';
import {trackcolumns} from './TypeColumns'
import moment from 'moment'
import "moment/locale/zh-cn";
import zhCN from 'antd/lib/date-picker/locale/zh_CN';
const { Option } = Select;
const { RangePicker } = DatePicker;
const {Search} = Input;
moment.locale('zh-cn');
const checkRules = (ruletype,title)=>{
  switch (ruletype) {
    case "Notnull textid":
      return([{
        required:true,
        pattern:/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
        message: `${title} 不能为空或包含任何符号`
      }])
    case "Notnull text":
      return([{
        required:true,
        message: `${title} 不能为空`
      }])
    case "null text":
      return([])
    case "Notnull number":
      return([{
        required:true,
        type :'number',
        message: `${title} 不能为空，只能为数字`
      },{
        min:0,
        message: `${title} 不能为负`
      }
    ])
    case "null number":
      return([{
        type :'number',
        message: `${title} 只能为数字`,

      },{
        type :'number',
        min:0,
        message: `${title} 不能为负`
      }
    ])
    case "Notnull date":
      return([{
        required:true,
        pattern:/[0-9][0-9][0-9][0-9][-][0-1][0-9][-][0-3][0-9][ ][0-2][0-9][:][0-6][0-9]/,
        message: `${title} 格式应为 2020-03-01 08:00`
      }])
      case "null date":
    return([{
      pattern:/[0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9] [0-2][0-9]:[0-6][0-9]/,
      message: `${title} 格式应为 2020-03-01 08:00`
    }])
    case "Notnull hour":
      return([{
        type :'number',
        message: `${title} 只能为数字`,

      },{
        type :'number',
        min:0.1,
        message: `${title} 不能为负或0`
      }
    ])
    default:
      return([]);
  }
}


const EditableCell =(selecDataList)=>({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ruletype,
  ...restProps
}) => {
  const inputNode =(inputType)=>{
    switch (inputType) {
      case "number":
        return <InputNumber precision={1} decimalSeparator='.' style={{width:'calc(100%)'}}/>
      case "select":
        return (
          <Select  >
          {selecDataList[dataIndex].map((item)=>{
            return <Option key={item} value={item} >{item}</Option>
          })}
          </Select>
        )
      default:
        return <Input />
    }
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
            border:'10px',
            padding:0,
            // width:100
          }}
          rules={checkRules(ruletype,title)}
        >
          {inputNode(inputType)}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};



const MissionTrackManager = (props) => {
  const [form] = Form.useForm();
  const {addRow,dataList,initdata,selecDataList,editingKey,total,tracksearchcondition} = props

  const addrecordtime=(data)=>{
    data['recordtime']=moment().format("YYYY-MM-DD 18:30")
    form.setFieldsValue({ ...data });
    return data
  }

  const originData =addRow ? [addrecordtime(initdata),...dataList]:[...dataList];
  const columns = [...trackcolumns]
  const isEditing = record => record.id === editingKey;

  const edit = record => {
    form.setFieldsValue({ ...record });
    props.missiondetail_changestate({editingKey:record.id});
  };

  const cancel = () => {
    props.missiondetail_changestate({addRow:false,editingKey:''})
  };

  const save = async (record) => {
      const row = await form.validateFields();
      props.missiondetail_changemissiontrack({...record,...row},tracksearchcondition)
      props.missiondetail_changestate({addRow:false,editingKey:''})
  };
  const delete_track = (id) => {
    props.missiondetail_changemissiontrack({id,delete:true},tracksearchcondition)
  };

 // 表结构插入操作
  const make_columns =()=>{
    columns.push({
      title: '操作',
      dataIndex: 'operation',
      // fixed: 'right',
      // width: 120,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </Button>
            <Popconfirm title="确定取消?" onConfirm={cancel}>
              <Button >取消</Button>
            </Popconfirm>
          </span>
        ) : (
          <span>
          <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
            编辑
          </Button>
          <Popconfirm title="确定删除?" onConfirm={() => delete_track(record.id)}>
            <Button disabled={editingKey !== ''} >
              删除
            </Button>
          </Popconfirm>
          </span>
        );
      },
    })
    return columns
  } 

 
  const mergedColumns =make_columns().map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => (
        {record,
        inputType: col.inputType,
        ruletype:col.ruletype,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const changepage = (page)=>{
    props.missiondetail_changestate({addRow:false,editingKey:''})
    props.missiondetail_getTrack({...tracksearchcondition,page:page})
  }

  const handleaddrow=()=>{
      props.missiondetail_changestate({addRow:true,editingKey:'/'})
  }


  const dateonChange=(_,dateStrings)=>{
    props.missiondetail_getTrack({...tracksearchcondition,page:1,date:dateStrings})
  }

  const groupChange=()=>{
    props.missiondetail_getTrack({...tracksearchcondition,onlygroup:!tracksearchcondition.onlygroup,page:1})
  }

  const usernameSerch=(value)=>{
    props.missiondetail_getTrack({...tracksearchcondition,page:1,search:value})
  }

  return (
    <Spin spinning={tracksearchcondition.searchloading}  size='large'>
        <Card size='small' >
        <Row>
            <Col>
            <Button type="primary"  onClick={()=>handleaddrow()} disabled={addRow}>
            添加记录
            </Button>
            </Col>
            <Col offset={1}>
              <Search  
                  loading={tracksearchcondition.searchloading} 
                  enterButton 
                  onSearch={usernameSerch}
              />
            </Col>
            <Col offset={1}>
              <RangePicker 
                format="YYYY-MM-DD HH:mm:ss"
                locale={zhCN}
                onChange={dateonChange}
                showTime={{
                  defaultValue: [moment('00:00:01', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                }}
              />
            </Col>
            <Col offset={1}>
              <Switch checked={tracksearchcondition.onlygroup} onChange={groupChange} checkedChildren="仅看自己组" unCheckedChildren="所有人"/>
            </Col>
        </Row>
        </Card>
        <Card size='small' >
        <Form form={form} component={false}>
        <Table
            components={{
              body: {
                  cell: EditableCell(selecDataList),
              },
            }}
            size="small"
            bordered={true}
            scroll={{ x: 'calc(100%)' }}
            dataSource={originData}
            columns={mergedColumns}
            rowClassName="editable-row"
            rowKey="id"
            pagination={{
            defaultCurrent:tracksearchcondition.page,
            current:tracksearchcondition.page,
            total,
            onChange: changepage,
            }}
        />
        </Form>
        </Card>
    </Spin>
  );
};

export default MissionTrackManager