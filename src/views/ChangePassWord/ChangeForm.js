import React from 'react'
import { Form,Button,Input} from 'antd';


export const ChangeForm =(props) => {
        const [form] = Form.useForm();

        const onFinish = (values)=>{
            props.changepassword({...values})
        }

        return (
            <Form 
            form={form}
            className="login-form"
            onFinish={onFinish}
            >
                <Form.Item
                    name='oldpassword'
                    label='现在的密码'
                    rules={[
                        {
                        required: true,
                        message: '不能为空',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name='newpassword'
                    label='新密码'
                    rules={[
                        {
                        required: true,
                        message: '不能为空',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="二次新密码"
                    dependencies={['newpassword']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: '不能为空',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                        if (!value || getFieldValue('newpassword') === value) {
                            return Promise.resolve();
                        }

                        return Promise.reject('两次密码不一致');
                        },
                    }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="login-form-button" 
                    style={{width:150}}
                    >
                            提交
                    </Button>
                </Form.Item>
            </Form>
        )

}