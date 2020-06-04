import React from 'react';
import {
  Form,
  Input,
  Select,
  Button,
} from 'antd';
const { Option } = Select;

const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };


const tailFormItemLayout = {
    wrapperCol: {
        xs: {
        span: 24,
        offset: 0,
        },
        sm: {
        span: 16,
        offset: 8,
        },
    },
};
const RegisterForm=(props)=>{
    const [form] = Form.useForm()
    const onFinish = values => {
        props.register_postdata(values)
        props.login.register ?
        props.history.push('/sucess')
        :
        props.history.push('/register')
      };

    
    return(
        <Form
            {...formItemLayout}
            form={form}
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name='id'
                label='工号'
                rules={[
                    {
                        required:true,
                        message:'不能为空'
                    },
                    {
                        pattern:/^[A-Za-z0-9]+$/,
                        message: '只能为英文和数字'
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='username'
                label='用户名'
                rules={[
                    {
                        required:true,
                        message:'不能为空'
                    },
                    {
                        pattern:/^[\u4e00-\u9fa5]+$/,
                        message: '只能为中文'
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='password'
                label='密码'
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
                label="二次密码"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: '不能为空',
                },
                ({ getFieldValue }) => ({
                    validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject('两次密码不一致');
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="groupname"
                label="所属组"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '不能为空',
                    }
                ]}
            >
                <Select>
                    {
                        props.login.grouplist.map((value)=>{
                          return  <Option value={value} key={value}>{value}</Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                注册
                </Button>
            </Form.Item>
        </Form>
    )
}

export default RegisterForm