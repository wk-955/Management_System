import React from 'react'
import { Table,Input, InputNumber, Popconfirm, Form,Button,Select, Row, Col} from 'antd';
import {usercolumns,rolecolumns,groupcolumns} from './TypeColumns'
const { Option } = Select;
const {Search} = Input;
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
        type :'number',
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

const chosecolumns=(tablename)=>{
  switch (tablename) {
    case 'user':
      return usercolumns
    case 'role':
      return rolecolumns
    case 'group':
      return groupcolumns
    default:
      return []
  }
}

const EditableTable = (props) => {
  const {addRow,dataList,initdata,selecDataList,editingKey,total} = props.datamanager
  const originData = addRow ? [initdata,...dataList]:[...dataList];
  const columns = [...chosecolumns(props.datamanager.tablename)]
  const [form] = Form.useForm();
  const isEditing = record => record.id === editingKey;

  const edit = record => {
    form.setFieldsValue({ ...record });
    props.changeEditingKey(record.id);
  };

  const cancel = () => {
    props.addRow(false)
    props.changeEditingKey('')
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      props.datamanager_postdata({...props.datamanager},{...row,oldid:id})
    } catch (errInfo) {
      
    }
  };

// 表结构插入操作
  const make_columns =()=>{
    columns.push({
      title: '操作',
      dataIndex: 'operation',
      fixed: 'right',
      width: 200,
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

  // 改变页码
  const changepage = (page)=>{
    props.addRow(false)
    props.changeEditingKey('')
    props.datamanager_changeState({page})
    props.datamanager_getdata({...props.datamanager,page})
  }

  // 控制添加行
  const handletablechadd=()=>{
      props.addRow(true)
      form.setFieldsValue({ ...props.datamanager.initdata});
      props.changeEditingKey('/');
  }

  // 选择搜索的条件
  const selectbefore = (
    <Select defaultValue="userid" className="select-before" onSelect={
      (value)=>{
        props.datamanager_changeState({search:value,userid:'',username:''},
        props.datamanager_getdata({...props.datamanager,search:value,userid:'',username:''})
      )}}>
      <Option value="userid">用户编号</Option>
      <Option value="username">用户名字</Option>
    </Select>
  );
  
  // 用户搜索功能
  const usersearch =(value)=>{
    props.datamanager_changeState(
      props.datamanager.search === 'userid'?
        {userid:value}
        :
        {username:value}
      )
    props.datamanager_getdata(
      props.datamanager.search === 'userid'?
      {...props.datamanager,page:1,userid:value}
      :
      {...props.datamanager,page:1,username:value}
    )
  }

  return (
    <div>
      <Row>
        <Col>
          <Button type='primary' onClick={handletablechadd} disabled={props.datamanager.addRow}  > 
                    添加
                </Button>
        </Col>
        <Col>
            <Search  
              addonBefore={selectbefore}
              loading={props.datamanager.searchloading} 
              enterButton 
              onSearch={usersearch}
            />
        </Col>
      </Row>
      <Row>
        <Form form={form} component={false}>
          <Table
            className='test'
            components={{
              body: {
                cell: EditableCell(selecDataList),
              },
            }}
            bordered={true}
            scroll={{ x: 'calc(100% - 10px)' , y: 600 }}
            dataSource={originData}
            columns={mergedColumns}
            rowClassName="editable-row"
            rowKey="id"
            pagination={{
              defaultCurrent:props.datamanager.page,
              total,
              current:props.datamanager.page,
              onChange: changepage,
            }}
          />
        </Form>
      </Row>
    </div>
  );
};

export default EditableTable