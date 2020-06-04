import React from 'react'
import { Table, Row, Input, Button } from 'antd'
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

const PersonalList = (props) => {

	const {filters} = props.personalform
	const data = props.personalform.userlist

    const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({selectedKeys, setSelectedKeys, confirm, clearFilters}) => (
			<div style={{ padding: 8 }}>
				<Input
					placeholder={`搜索 ${dataIndex}`}
					style={{width: 188, marginBottom: 8, display: 'block'}}
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(confirm)}
				/>
				<Button
					type='primary'
					icon={<SearchOutlined />}
					size='small'
					style={{width: 90, marginRight: 8}}
					onClick={() => handleSearch(confirm)}
				>
					搜索
				</Button>
				<Button
					onClick={() => handleReset(clearFilters)}
					size='small'
					style={{width: 90}}
				>
					重设
				</Button>
			</div>
			),
			filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined  }} />,
			onFilter: (value, record) =>
  				record.username
        			.toString()
        			.toLowerCase()
					.includes(value.toLowerCase())
				||
				record.id
        			.toString()
        			.toLowerCase()
        			.includes(value.toLowerCase()),
    })

	const handleSearch = (confirm) => {
		confirm()
    }

    const handleReset = clearFilters  => {
		clearFilters()
    }


  	const columns = [
		{
			title: '工号',
			dataIndex: 'id',
			width: 100,
			align: 'center',
			...getColumnSearchProps('工号')
		},
		{
			title: '名字',
			dataIndex: 'username',
			width: 400,
			align: 'center',
			...getColumnSearchProps('名字'),
			render: (_, record) => <Link to={{pathname: `/manager/Personal/${record.id}`}} >{record.username}</Link>
		},
		{
			title: '所属组',
			dataIndex: 'groupname',
			width: 400,
			align: 'center',
			filterMultiple: true,
			defaultFilteredValue:filters.groupname,
			filters: [
				{text: '安防一组', value: '安防一组'},
				{text: '安防二组', value: '安防二组'},
				{text: '安防三组', value: '安防三组'},
				{text: '安防四组', value: '安防四组'},
				{text: '商业一组', value: '商业一组'},
				{text: '数据采集组', value: '数据采集组'},
				{text: '新人组', value: '新人组'},
			],
			onFilter: (value, record) => {
				return record.groupname.indexOf(value) === 0
			},
		},  
  	]
  
	function onChange(pagination,filters, ) {
		props.personalform.pagination=pagination
		props.personalform.filters=filters
	}

	return (
        <Row>
			<Table
				columns={columns}
				rowKey='id'
				dataSource={data}
				bordered={true}  
				onChange={onChange}
				pagination={{
					defaultCurrent:props.personalform.pagination.current
				}}
			/>
        </Row>
	)
}

export default PersonalList