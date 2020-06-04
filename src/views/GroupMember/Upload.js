import React from 'react'
import { Form,Button,InputNumber,Select} from 'antd';

const { Option } = Select;
const Upload = (props) => {
        const [form] = Form.useForm();
        const {isLoading,missionid,userid,trackNotelist} = props.groupmember

        const onFinish = (values)=>{
            props.groupmember_changeState({add:false,isLoading:true})
            props.groupmember_postdata({...props.groupmember},{...values,missionid:missionid,userid:userid})
        }

        return (
            <Form 
            form={form}
            className="login-form"
            onFinish={onFinish}
            initialValues={{ 
                big_dir_number: 0 ,
                dir_number:0,
                group_number:0,
                frame:0,
                span_number:0,
                box_number:0,
                number:0,
                work_hour:0,
                track_note:'无'

            }}
            >
                <Form.Item
                    // style={{width:500}}
                    label='大文件夹'
                 rules={[{ type:'number', message: '只能为数字!' },{type :'number',min:0, message: '不能为负' }]}
                 name = 'big_dir_number'
                >
                    <InputNumber
                    style={{width:200}}
                    disabled={isLoading}
                    />
                </Form.Item>
                <Form.Item
                label='文件夹'
                    rules={[{ type:'number', message: '只能为数字!' },{type :'number',min:0, message: '不能为负' }]}
                    name = 'dir_number'
                >
                    <InputNumber
                   style={{width:200}}
                    disabled={isLoading}
                    />
                </Form.Item>
                <Form.Item
                label='组数'
                    rules={[{ type:'number', message: '只能为数字!' },{type :'number',min:0, message: '不能为负' }]}
                    name = 'group_number'
                >
                    <InputNumber
                    style={{width:200}}
                    disabled={isLoading}
                    />
                </Form.Item>
                <Form.Item
                label='张数'
                    rules={[{ type:'number', message: '只能为数字!' },{type :'number',min:0, message: '不能为负' }]}
                    name = 'frame'
                >
                    <InputNumber
                    style={{width:200}}
                    disabled={isLoading}
                    />
                </Form.Item>
                <Form.Item
                label='段数'
                    rules={[{ type:'number', message: '只能为数字!' },{type :'number',min:0, message: '不能为负' }]}
                    name = 'span_number'
                >
                    <InputNumber
                    style={{width:200}}
                    disabled={isLoading}
                    />
                </Form.Item>
                <Form.Item
                label='框数'
                    rules={[{ type:'number', message: '只能为数字!' },{type :'number',min:0, message: '不能为负' }]}
                    name = 'box_number'
                >
                    <InputNumber
                    style={{width:200}}
                    disabled={isLoading}
                    />
                </Form.Item>
                <Form.Item
                label='个数'
                    rules={[{ type:'number', message: '只能为数字!' },{type :'number',min:0, message: '不能为负' }]}
                    name = 'number'
                >
                    <InputNumber
                    style={{width:200}}
                    disabled={isLoading}
                    />
                </Form.Item>
                <Form.Item
                label='工时（单位小时）'
                    rules={[
                    { type:'number', message: '只能为数字!' }
                    ,{
                        type :'number',min:0.1, message: '不能为负或0' 
                    }, {
                        required: true,
                        message: '不能为空',
                      },
                ]}
                    name = 'work_hour'
                >
                    <InputNumber
                    style={{width:200}}
                    disabled={isLoading}
                    precision={1} decimalSeparator='.'
                    />
                </Form.Item>
                <Form.Item
                label='备注'
                    name = 'track_note'
                >
                    <Select
                    defaultValue='无'
                    disabled={isLoading}
                    >
                        {
                            trackNotelist.map((noteName)=>{
                                return <Option value={noteName}>{noteName}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="login-form-button" 
                    disabled={isLoading} 
                    >
                            提交
                    </Button>
                </Form.Item>
            </Form>
        )
}

export default Upload