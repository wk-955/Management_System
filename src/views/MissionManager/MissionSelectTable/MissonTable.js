import {Card,Table,Form,Button} from 'antd'
import React from 'react'
import {missioncolumns} from './TypeColumns'



const MissonTable = (props) => {
    const {dataList,total,searchCondition} =props.missionselectable
    const [form] = Form.useForm();
    
    const changepage = (page)=>{
        props.missionselectable_getmission({...props.missionselectable.searchCondition,page})
    }

    const handletablechadd=()=>{
        props.history.push('/manager/missionmanager/CreatMission')
    }

    return(
        <Card
        size='small'
        style={{width:'calc(100%)'}}
        title='任务管理'
        bordered={true}
        extra={
        <Button type='primary' onClick={handletablechadd}  > 
            添加
        </Button>
        }
    >
        <Form form={form} component={false}>
          <Table
          // scroll={{ x: 900  }}
          size="small"
          bordered={true}
          dataSource={dataList}
          columns={missioncolumns}
          rowClassName="editable-row"
          rowKey="id"
          pagination={{
          defaultCurrent:1,
          current:searchCondition.page,
          total:total,
          onChange: changepage,
          }}
          />
        </Form>
    </Card>
    )
}

export default MissonTable