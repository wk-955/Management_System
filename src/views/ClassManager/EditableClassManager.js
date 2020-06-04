import React from 'react'
import { Table, Button, Row, Popconfirm, Form } from 'antd';
import EditableCell from './EditableCell'
import './index.less'
import { Link } from 'react-router-dom';


const EditableTable = (props) => {
    const {dataList, addRow, initdata, editingKey} = props.classmanager
    const [form] = Form.useForm()
    const finalData = addRow ? [initdata, ...dataList] : [...dataList]
    const isEditing = record => record.id === editingKey

    const edit = record => {
        form.setFieldsValue({ ...record });
        props.classmanager_changeEditingKey(record.id);
    }

    const cancel = () => {
        props.classmanager_addRow(false)
        props.classmanager_changeEditingKey('')
    }

    const save = async id => {
        try {
            const row = await form.validateFields()
            props.classmanager_changeEditingKey('')
            props.classmanager_addRow(false)
            props.classmanager_postData({
                ...row, 
                id: id === '/' ? '' : id , 
                delete: false, 
                parentclass_id: props.classmanager.currentClass === '' ? '' : props.classmanager.currentClass 
            },
                props.classmanager.currentClass
            )
        } catch (errInfo) {
        }
    }
    
    const add = () => {
        props.classmanager_addRow(true)
        form.setFieldsValue({...initdata})
        props.classmanager_changeEditingKey('/')
    }
    
    const remove = id => {
        props.classmanager_postData({id , delete: true, parentclass_id: props.classmanager.currentClass},props.classmanager.currentClass)
    }
    
    const select_mission=(record)=>{
        props.classmanager_changeState({currentClass: record.id, currentClassname: record.classname })
        props.classmanager_getData({parentclass_id: record.id})
    }

    const back = () => {
        props.classmanager_changeState({currentClass: '', currentClassname: ''})
        props.classmanager_getData({parentclass_id: ''})
    }

    const columns = [
        props.classmanager.currentClass === '' ?
        {
            title: '任务名',
            dataIndex: 'classname',
            width: 500,
            editable: true,
            align: 'center',
            render: (_, record) => <Link to='/manager/ClassManager' onClick={()=>select_mission(record)}>{record.classname}</Link>,
        }
        :
        {
            title: '子类名',
            dataIndex: 'childclassname',
            width: 500,
            editable: true,
            align: 'center',
        }
    ]
    
    const make_columns = () => {
        columns.push({
            title: '操作',
            dataIndex: 'operation',
            width: 400,
            align: 'center',
            render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
                <span>
                <Button
                    style={{
                    marginRight: 8,
                    }}
                    onClick={() => save(record.id)}
                >
                    保存
                </Button>
                <Popconfirm title="确定取消?" onConfirm={cancel}>
                    <Button >取消</Button>
                </Popconfirm>
                </span>
            ) : (
                <span>
                    <Button 
                        type='primary'
                        style={{
                            marginRight: 32,
                            }}
                        onClick={() => edit(record)}
                    >
                        编辑
                    </Button>
                    <Popconfirm title="确定删除?" 
                        onConfirm={() => remove(record.id)}
                    >
                        <Button type='danger'>删除</Button>
                    </Popconfirm>
                </span>
            );
            },
        })
        return columns
    } 
    
    const mergedColumns = make_columns().map(col => {
        if (!col.editable) {
          return col;
        }
        return {
            ...col,
            onCell: record => (
                {record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
          }),
        };
    });
    
    return (
        <div className='classmananger'>
            <Form form={form} component={false} >
                <Row>
                    <span>
                        <Button type='primary' onClick={add} > 
                                    添加
                        </Button>
                        {
                            props.classmanager.currentClass === '' 
                            ? 
                            ''
                            :
                            <Button type='default' 
                                style={{
                                    marginLeft: 8,
                                    }}
                                onClick={() => back()}
                                > 
                                返回
                            </Button>
                        }
                    </span>
                </Row>
                <Row>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell
                            }
                        }}
                        rowKey='id'
                        bordered={true}
                        columns={mergedColumns}
                        dataSource={finalData}
                    />
                </Row>
            </Form>
        </div>
  );
};

export default EditableTable