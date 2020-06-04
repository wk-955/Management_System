import React, { Component} from 'react';
import {Row,DatePicker, Select,Input, Card,Spin, Col} from 'antd';
import {
  missionselectable_getmission,
  missionselectable_changestate,
  missionselectable_searchcondition
} from '../../../actionCreators'
import { connect } from 'react-redux'
import MissonTable from './MissonTable'
import moment from 'moment'
import "moment/locale/zh-cn";
moment.locale('zh-cn');
const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;
//获得state
const mapState=(state)=>({
    missionselectable:state.missionselectable,
    login:state.login,
})

//派发行动
const mapDispath={
    missionselectable_getmission,
    missionselectable_changestate,
    
    missionselectable_searchcondition,
}


@connect(mapState,mapDispath)
class MissionSelectTable extends Component {
    constructor(props){
        super(props)
        const {searchCondition,selecDataList} =this.props.missionselectable

        let responsible
        if (searchCondition.responsible){
          responsible=searchCondition.responsible
        }else{
          responsible = selecDataList.responsible.indexOf(this.props.login.username) ===-1? '全部' :this.props.login.username
        }
        this.props.missionselectable_getmission({...searchCondition,responsible})
        this.handle_progress_change=this.handle_progress_change.bind(this)
        this.handle_responsible_change=this.handle_responsible_change.bind(this)
        this.handle_selectbefor_change=this.handle_selectbefor_change.bind(this)
        this.startdateonChange=this.startdateonChange.bind(this)
        this.enddateonChange=this.enddateonChange.bind(this)
        this.missionSearch = this.missionSearch.bind(this)
        this.handle_classSearch = this.handle_classSearch.bind(this)
    }

    demandPersonSearch = (value) =>{
      const{searchCondition} = this.props.missionselectable
      this.props.missionselectable_getmission({...searchCondition,demand_person:value,page:1})
    }

    handle_classSearch = (value) =>{
      const{searchCondition} = this.props.missionselectable
      this.props.missionselectable_getmission({...searchCondition,classSearch:value,page:1})
    }

    handle_responsible_change = (value)=>{
      const{searchCondition} = this.props.missionselectable
      this.props.missionselectable_getmission({...searchCondition,responsible:value,page:1})
    }

    handle_progress_change = (value)=>{
      const{searchCondition} = this.props.missionselectable
      this.props.missionselectable_getmission({...searchCondition,progress:value,page:1})
    }
    
    handle_selectbefor_change =(value)=>{
      this.props.missionselectable_searchcondition({search:value})
    }

    startdateonChange=(_,dateStrings)=>{
      const{searchCondition} = this.props.missionselectable
      this.props.missionselectable_getmission({...searchCondition,startdates:dateStrings,page:1})
    }

    enddateonChange=(_,dateStrings)=>{
      const{searchCondition} = this.props.missionselectable
      this.props.missionselectable_getmission({...searchCondition,page:1,enddates:dateStrings})
    }


    missionSearch = (value)=>{
      const {searchCondition} = this.props.missionselectable
      const initdata = {
        responsible:'全部',
        progress:'',
        startdates:['',''],
        enddates:['',''],
      }
      this.props.missionselectable_getmission(
        searchCondition.search === 'missionid'?
        {...searchCondition,page:1,missionid:value,missionname:'',...initdata}
        :
        {...searchCondition,page:1,missionname:value,missionid:'',...initdata}
      )
    }

    render(){
        const {selecDataList,searchCondition} = this.props.missionselectable

        const selectbefore = (
          <Select defaultValue="missionid" className="select-before" onSelect={this.handle_selectbefor_change}>
            <Option value="missionid">任务编号</Option>
            <Option value="missionname">任务名字</Option>
          </Select>
        );
        
        return(
            <div style={{backgroundColor:'#f2f4f5'}}>
              <Row gutter={[0, 16]}>
              <Card size='small' bordered={false} >
              <Card.Grid hoverable={false} style={{width:'50%',padding:'8px 16px'}}>
                      <span>任务开始日期查询： </span>
                      <RangePicker 
                        key='startdate'
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={this.startdateonChange}
                        value={searchCondition.startdates[0] ? [moment(searchCondition.startdates[0]),moment(searchCondition.startdates[1])]: ['','']}
                        showTime={{
                          defaultValue: [moment('00:00:01', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                        }}
                      />
              </Card.Grid>
              <Card.Grid hoverable={false} style={{width:'50%',padding:'8px 16px'}}>
                      <span>任务结束日期查询： </span>
                      <RangePicker 
                        key='enddate'
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={this.enddateonChange}
                        value={searchCondition.enddates[0] ? [moment(searchCondition.enddates[0]),moment(searchCondition.enddates[1])] : ['','']}
                        showTime={{
                          defaultValue: [moment('00:00:01', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                        }}
                      />
              </Card.Grid>
              <Card.Grid hoverable={false} style={{width:'25%',padding:'8px 16px',textAlign:'center'}}>
                <Search  
                  addonBefore={selectbefore}
                  defaultValue={searchCondition.missionid? searchCondition.missionid:searchCondition.missionname}
                  loading={searchCondition.searchloading} 
                  enterButton 
                  onSearch={this.missionSearch}
                />
              </Card.Grid>
              <Card.Grid hoverable={false} style={{width:'15%',padding:'8px 16px',textAlign:'center'}} >
                    <span>姓名查询： </span>
                    <Select 
                          value={searchCondition.responsible}
                          onChange={this.handle_responsible_change} 
                          >
                            {selecDataList.responsible.map((username)=>{
                              return <Option key={username} value={username} >{username}</Option>
                            })}
                            <Option key="全部" value='全部' >全部</Option>
                    </Select>
              </Card.Grid>
              <Card.Grid hoverable={false} style={{width:'15%',padding:'8px 16px',textAlign:'center'}} >
                <Search  
                  placeholder='需求人查询'
                  defaultValue={searchCondition.demand_person}
                  loading={searchCondition.searchloading} 
                  enterButton 
                  onSearch={this.demandPersonSearch}
                />
              </Card.Grid>
              <Card.Grid hoverable={false} style={{width:'25%',padding:'8px 16px',textAlign:'center'}}>
                  <span>进度查询： </span>
                  <Select   
                            value={searchCondition.progress}
                            style={{ width: 100 }} 
                            onChange={this.handle_progress_change} 
                            >
                              <Option value='' >全部</Option>
                              <Option value='进行中' >进行中</Option>
                              <Option value='完成' >完成</Option>
                              <Option value='暂停' >暂停</Option>
                        </Select>
              </Card.Grid>
              <Card.Grid hoverable={false} style={{width:'20%',padding:'8px 16px',textAlign:'center'}}>
                  <Search  
                    placeholder='类型查询'
                    loading={searchCondition.searchloading} 
                    enterButton 
                    onSearch={this.handle_classSearch}
                />
              </Card.Grid>
              </Card>
              </Row>
              <Row>
                <Col span={24} >
                  <Spin spinning={searchCondition.searchloading}  size='large' delay={500} >
                      <MissonTable {...this.props} />
                  </Spin>
                </Col>
              </Row>
            </div>
        )
    }
}

export default MissionSelectTable;