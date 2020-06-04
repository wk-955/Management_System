import React from 'react'
import { Upload,Button} from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import {picURL} from '../../../requests'

const StandardFile =(props)=> {
    const {fileList,missiondetail,currenttable} = props.missionmanager

    

    const cleanfileList=fileList.map((item)=>{
        if(item.url.indexOf(picURL) === -1){
            item.url=picURL+item.url
        }
        return item
    })

    const uploadButton = (
        <Button>
            <UploadOutlined /> Click to Upload
        </Button>
        // <div>
        //   <PlusOutlined />
        //   <div className="ant-upload-text">Upload</div>
        // </div>
      );
    
    const customRequest=(data)=>{
        let formData = new FormData();
        formData.append('missionid',missiondetail[0].id)
        formData.append('filename',data.file.name)
        formData.append(data.filename,data.file)
        props.missionmanager_postfile(formData,currenttable)
    }

    const removeFile=(file)=>{
        let formData = new FormData();
        formData.append('id',file.id)
        return props.missionmanager_postfile(formData,currenttable) 
    }


    return (
        <div>
            <Upload
                name='missionfile'
                fileList={cleanfileList}
                onRemove={removeFile}
                customRequest={(data)=>customRequest(data)}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
        </div>
    )
}

export default StandardFile