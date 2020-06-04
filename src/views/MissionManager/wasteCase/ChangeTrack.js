import React from 'react'
import { Table,Input, InputNumber, Popconfirm, Form,Button,Select,Cascader} from 'antd';
import {tracknumber_columns} from '../TypeColumns'
import {missiondetailcolumns} from  '../TypeColumns'

const {Option}=Select

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
        return <InputNumber />
      case "select":
        return (
          <Select >
          {selecDataList[dataIndex].map((item)=>{
            return <Option key={item} value={item} >{item}</Option>
          })}
          </Select>
        )
      case "Cascader":
        return (
          <Cascader options={selecDataList[dataIndex]}  placeholder="Please select"  defaultValue={['','']} />
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

const chosecolumns=(type)=>{
  switch (type) {
    case 'mission':
      return missiondetailcolumns
    case 'total' :
      return tracknumber_columns
    case 'standard':
      return tracknumber_columns
    default:
      return []
  }
}



const ChangeTrack = (props) => {
  const {totaltrack,standardtrack,editingKey,missiondetail} = props.missionmanager
  const choseoriginData = () =>{
    switch (props.tabletype) {
        case 'mission':
          return missiondetail
        case 'total':
            return [totaltrack]
        case 'standard':
            return [standardtrack]
        default:
            return []
      }
  }
  const originData =choseoriginData();
  const columns = [...chosecolumns(props.tabletype)]
  const [form] = Form.useForm();
  const isEditing = record => record.id === editingKey;

  const edit = record => {
    if (!record.mission_class){
      form.setFieldsValue({ ...record});
    }else{
      form.setFieldsValue({ ...record,mission_class:record.mission_class.split('/') });
    }
    props.missionmanager_changeEditingKey(record.id);
  };

  const cancel = () => {
    props.missionmanager_changeEditingKey('')
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      // console.log('editble',row)
      props.missionmanager_changeEditingKey('')
      props.missionmanager_changedata(props.match.params.missionid,{...row,oldid:id,tabletype:props.tabletype})
      if (row.id && row.id !== id){
        props.history.goBack()
      }
    } catch (errInfo) {
      
    }
  };

  //往列格式插入操作
  const make_columns =()=>{
    columns.push({
      title: '操作',
      dataIndex: 'operation',
      fixed: 'right',
      width: 100,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record.id)}
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
          <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
            编辑
          </Button>
        );
      },
    })
    return columns
  } 

  // 表结构插入操作
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

  return (
    <Form form={form} component={false} >
      <Table
        components={{
          body: {
            cell: EditableCell(props.missionmanager.selecDataList),
          },
        }}
        bordered={true}
        scroll={{ x: 900 }}
        style = {{width:'calc(100% - 10px)'}}
        dataSource={originData}
        columns={mergedColumns}
        rowClassName="editable-row"
        size='small'
        rowKey="id"
        pagination={false}
      />
    </Form>
  );
};

export default ChangeTrack