import React, { Component } from 'react'
import {groupmember_getdata,groupmember_changeState,groupmember_postdata} from '../../actionCreators'
import {Table,Button,Card,Popconfirm} from 'antd'
import { connect } from 'react-redux'
import {missioncolumns,trackcolumns} from './TypeColumns'
import Upload from './Upload'

const mapState=(state)=>({
  groupmember:state.groupmember,
  login:state.login,
})

const mapDispath={
  groupmember_getdata,
  groupmember_changeState,
  groupmember_postdata
}

@connect(mapState,mapDispath)
class GroupMember extends Component {
  constructor(props){
    super(props)
    this.props.groupmember_changeState({userid:this.props.login.userid})
    this.props.groupmember_getdata({...this.props.groupmember,userid:this.props.login.userid})
  }
  

    render() {
      const {missionname,add,total,isLoading,missionid} = this.props.groupmember
      const originData =[...this.props.groupmember.dataList]

      const turn_mission=(record)=>{
        this.props.groupmember_changeState({missionname:record.missionname,missionid:record.id})
        this.props.groupmember_getdata({...this.props.groupmember,missionid:record.id})
      }

      const back =()=>{
        if (add){
          this.props.groupmember_changeState({add:false})
          // this.props.groupmember_getdata({...this.props.groupmember})
        }
        else{
          this.props.groupmember_changeState({missionname:'',missionid:''})
          this.props.groupmember_getdata({...this.props.groupmember,missionname:'',missionid:''})
        }
      }

      const detele_track=(id)=>{
        this.props.groupmember_postdata({...this.props.groupmember},{delete:true,trackid:id})
      }

      const push_operation =()=>{
        const columns = missionname ===''? [...missioncolumns] :[...trackcolumns]
        columns.push({
          title: '操作',
          dataIndex: 'operation',
          width: 120,
          render: (_, record) => {
            return missionname ==='' ?(
              <span>
              <Button
                onClick={() => turn_mission(record)}
                style={{
                  marginRight: 8,
                }}
              >
                选择任务
              </Button>
            </span>
            )
            :
            (
              <span>
                <Popconfirm 
                  style={{
                    marginRight: 8,
                  }}
                title="确定删除?" 
                onConfirm={()=>detele_track(record.id)} >
                <Button
                >
                  删除
                </Button>
                </Popconfirm>
            </span>
            )
          }
        })
        return columns
      } 

      const upload =()=>{
        this.props.groupmember_changeState({add:true})
      }

      const changepage=(page)=>{
        this.props.groupmember_getdata({...this.props.groupmember,page})
      }



      return (
        <Card 
          size="small"
          style={{width:'calc(100% )',borderColor:'#000000',padding:'0'}}
          title={missionname ===''? '任务选择界面' : '任务:'+missionid+' '+missionname}
          extra={
          <div>
            <Button onClick={upload} disabled={missionname===''||add} >添加记录</Button> 
            <Button onClick={back} disabled={isLoading||missionname===''}>返回</Button>
          </div>
          }
        >
        {
        add?
          <Upload {...this.props} /> 
          :
          <Table
          scroll={{ x: 500 , y: 500 }}
          dataSource={originData}
          bordered={true}
          columns={push_operation()}
          rowKey="id"
          pagination={{
            defaultCurrent:this.props.groupmember.page,
            total,
            current:this.props.groupmember.page,
            onChange: changepage,
          }}
          />
        }
        </Card>
      )
    }
}

export default GroupMember