import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Loading =()=>{
    return (
        <Spin 
        style = {{height:'calc(100% - 10px)',width:'calc(100% - 10px)',lineHeight:'calc(100% - 10px)'}}
        indicator={
               <LoadingOutlined style={{ fontSize: 36,margin:'25% auto' }} spin />  
            } 
        />
    );
}

export default Loading
