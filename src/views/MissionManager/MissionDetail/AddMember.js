import { Transfer, Switch, Table} from 'antd';
import difference from 'lodash/difference';
import React from 'react';
import {addMembercolumns} from './TypeColumns'
// import { connect } from 'react-redux'
// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false} style={{width:'calc(100%)',borderColor:'#000000'}} titles={['任务人员','尚未加入人员']} >
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
                    //boolean  表格里的行组成的[]
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled) // 过滤数据源中disabled的数据
            .map(({ id }) => id); // 获得一个由id组成的列表
          //获得不同的key
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ id }, selected) {
          onItemSelect(id, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          rowKey='id'
          size="small"
          style={{ pointerEvents: listDisabled ? 'none' : null }}
          onRow={({ id, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              //  如果在id在listSelectedKeys中就是反选
              onItemSelect(id, !listSelectedKeys.includes(id));
            },
          })}
        />
      );
    }}
  </Transfer>
);



class AddMember extends React.Component {
    constructor(props){
        super(props)

        this.onChange=this.onChange.bind(this)
        this.triggerDisable=this.triggerDisable.bind(this)
        this.triggerShowSearch=this.triggerShowSearch.bind(this)
    }
  
  onChange = (nextTargetKeys,direction, moveKeys) => {
    // console.log('AddMember obchange',nextTargetKeys,direction, moveKeys)
    this.props.missiondetail_switchmember(this.props.missiondetail.missionid,{
      missionid:this.props.missiondetail.missionid,
      userids:moveKeys,
      action:direction==='left'?'add':'detele'})
    this.props.missiondetail_changestate({ targetKeys: nextTargetKeys })
  };

  triggerDisable = disabled => {
    this.props.missiondetail_changestate({ disabled });
  };

  triggerShowSearch = showSearch => {
    this.props.missiondetail_changestate({ showSearch });
  };

  render() {
    const { targetKeys, disabled, showSearch } = this.props.missiondetail;
    const dataSource = [...this.props.missiondetail.dataList]
    return (
      <div>
        <TableTransfer 
          // 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外。
          dataSource={dataSource}
          // 显示在右侧框数据的 key 集合
          targetKeys={targetKeys}
          disabled={disabled}
          rowKey={record => record.id}
          showSearch={showSearch}
          onChange={this.onChange}
          
          // 接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。
          filterOption={(inputValue, item) =>
            item.rolename.indexOf(inputValue) !== -1 || item.id.indexOf(inputValue) !== -1 
            || item.groupname.indexOf(inputValue) !== -1
            || item.username.indexOf(inputValue) !== -1
          }
          leftColumns={addMembercolumns}
          rightColumns={addMembercolumns}

        />
        <Switch
          unCheckedChildren="启用搜索框"
          checkedChildren="禁用搜索框"
          checked={showSearch}
          onChange={this.triggerShowSearch}
          style={{ marginTop: 16 }}
        />
      </div>
    );
  }
}

export default AddMember