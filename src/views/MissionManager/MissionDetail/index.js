import React,{ Component }from 'react'
import { Row, Card,PageHeader, Spin,Button,Modal} from 'antd';
import AddMember from './AddMember'
import { connect } from 'react-redux'
import MissionDetailTable from './MissionDetailTable'
import './index.less'
import {missiondetailcolumns,tracknumber_columns} from './TypeColumns'
import DetailForm from './DetailForm'
import {
  missiondetail_getmissiondetail,
  missiondetail_switchmember,
  missiondetail_changestate,
  missiondetail_changemissiondetail,
  missiondetail_getTrack,
  missiondetail_track_searchcondition,
  missiondetail_changemissiontrack
} from '../../../actionCreators'
import MissionTrackManager from './MissionTrackManager'
const mapState=(state)=>({
    missiondetail:state.missiondetail,
    login:state.login,
  })
  
const mapDispath ={
  missiondetail_getmissiondetail,
  missiondetail_switchmember,
  missiondetail_changestate,
  missiondetail_changemissiondetail,
  missiondetail_getTrack,
  missiondetail_track_searchcondition,
  missiondetail_changemissiontrack
}

@connect(mapState,mapDispath)
class ManagerMission extends Component {
  constructor(props){
      super(props)
      const {tracksearchcondition} =this.props.missiondetail
      const missionid = this.props.match.params.missionid
      this.props.missiondetail_getmissiondetail(missionid)
      this.props.missiondetail_getTrack({...tracksearchcondition,missionid:missionid})
      this.showModel = this.showModel.bind(this)
      this.onTabChange =this.onTabChange.bind(this)
  }

  showModel = ()=>{
    const modalvisble = !this.props.missiondetail.modalvisble
    this.props.missiondetail_changestate({
      modalvisble
    })
  }

  onTabChange = (key) =>{
    this.props.missiondetail_changestate({
      activeTabKey:key
    })
  }

  render() {
    const {
      isLoading,
      missiondetail,
      missionid,
      totaltrack,
      standardtrack,
      modalvisble,
      isPost,
      selecDataList,
      activeTabKey,

      trackdatalist,
      tracksearchcondition,
      addRow,
      editingKey,
      tracktotal,
      trackselecDataList,
      initdata
    }=this.props.missiondetail
    
    const tabList=[
      {
        key: 'basicinfo',
        tab: '任务基本信息设置',
      },
      {
        key: 'totaltrack',
        tab: '数据总量（导入量）设置',
      },
      {
          key: 'standardtrack',
          tab: '数据规定量设置',
      },
    ]


    const setting = {
      basicinfo:{data:missiondetail,columns:missiondetailcolumns,url:'mission'},
      totaltrack:{data:totaltrack,columns:tracknumber_columns,url:'missiontrack'},
      standardtrack:{data:standardtrack,columns:tracknumber_columns,url:'missiontrack'}
    }

    return (
      <div style={{height:'100%',width:'100%'}}>
        {
          isLoading ?
          <Spin />
          :
          <Card>
              <PageHeader
                style={{width:'calc(100%)'}}
                className="site-page-header"
                onBack={() =>{
                  this.props.missiondetail_track_searchcondition({
                    page:1,
                    search:'',
                    date:['',''],
                  })
                  this.props.history.goBack()}}
                title={'任务：'+missiondetail.missionname}
                subTitle={'任务id：'+missionid}
                />
            <Row>
              <Card style={{width:'100%'}} title={'任务信息'} 
                    extra={<Button onClick={this.showModel} >更改</Button>} 
              >
                <MissionDetailTable 
                  data={missiondetail}  
                  totaltrack={totaltrack} 
                  standardtrack={standardtrack} 
                />
              </Card>
            </Row>
            <Row >
              <Card title='人员调整' style = {{width:'calc(100%)'}} headStyle={{fontSize:'15px'}} size='small'>
                    <AddMember  {...this.props} />
              </Card>
            </Row>
            <Row>
              <MissionTrackManager  
                  dataList={trackdatalist}
                  tracksearchcondition={tracksearchcondition}
                  addRow={addRow}
                  editingKey={editingKey}
                  total = {tracktotal}
                  missionid={missiondetail.id}
                  initdata={initdata}
                  selecDataList={trackselecDataList}
                  missiondetail_getTrack={this.props.missiondetail_getTrack}
                  missiondetail_changestate={this.props.missiondetail_changestate}
                  missiondetail_changemissiontrack={this.props.missiondetail_changemissiontrack}
                  missiondetail_track_searchcondition={this.props.missiondetail_track_searchcondition}
              />
            </Row>
            <Modal 
              title={missiondetail.missionname}
              visible={modalvisble} 
              footer={null} 
              onCancel={this.showModel}
              width={'40%'}
              >
                <Card
                  style={{ width: '100%' }}
                  tabList={tabList}
                  activeTabKey={activeTabKey}
                  onTabChange={key => {
                    this.onTabChange(key);
                  }}
                >
                  <DetailForm  
                      key ={activeTabKey}
                      missionid={missiondetail.id}
                      columns={setting[activeTabKey].columns}
                      data={setting[activeTabKey].data}
                      url={setting[activeTabKey].url}
                      selecDataList={selecDataList}
                      missiondetail_changemissiondetail={this.props.missiondetail_changemissiondetail}
                      isPost={isPost}
                    />
                </Card>
            </Modal>
         </Card>
        }
      </div>

    )
  }
}


export default ManagerMission