import {Form,Input, InputNumber,Select,Cascader,Button,message} from 'antd'
import React from 'react'
const { Option } = Select;

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

  message.config({
    top: 200,
    duration: 2,
    maxCount: 3,
    rtl: true,
  });

const inputNode =(inputType,dataIndex,isPost,selecDataList=[])=>{
    switch (inputType) {
      case "number":
        return <InputNumber disabled={isPost} />
      case "select":
        return (
          <Select disabled={isPost}>
            {selecDataList[dataIndex].map((item)=>{
                return <Option key={item} value={item} >{item}</Option>
            })}
          </Select>
        )
      case "Cascader":
        return (
          <Cascader
          disabled={isPost}
           options={selecDataList[dataIndex]}  
           placeholder="选择类型"  
           defaultValue={['','']} 
           />
        )
      default:
        return <Input disabled={isPost} />
    }
}
const CreatMission = (props) =>{
    const {selecDataList,initmissiondata,isPost}=props.creatmission
    const {columns} = props
    const [form] = Form.useForm();

    const onFinish=(fieldsValue)=>{
      props.creatmission_addmission(fieldsValue).then((resp)=>{
        props.creatmission_changestate({isPost:false})
        if (resp.code === 200){
          message.success('保存成功')
          props.history.goBack()
        }else{
          message.error('任务id已存在');
        }
      })
    }

    return(
        <Form 
          onFinish={onFinish}
          form={form} 
          // name="control-hooks" 
          style={{
            width:'50%'
          }}
          initialValues={{...initmissiondata}}
        >
            {
                columns.map(item=>
                    <Form.Item
                    key={item.dataIndex}
                    name={item.dataIndex}
                    label={item.title}
                    wrapperCol={{
                      span:12
                    }}
                    rules={checkRules(item.ruletype,item.title)}
                  >
                    {inputNode(item.inputType,item.dataIndex,isPost,selecDataList)}
                  </Form.Item>
                )
            }
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
    )
}


export default CreatMission