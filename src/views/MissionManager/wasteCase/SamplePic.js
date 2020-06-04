import React from 'react'
import { Upload,Modal} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {picURL} from '../../../requests'

// const getBase64=(file)=>{
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = error => reject(error);
//     });
// }


const SamplePic =(props)=> {
    const {picList,missiondetail,currenttable,previewVisible,previewImage} = props.missionmanager

    

    const cleanpicList=picList.map((item)=>{
        if(item.url.indexOf(picURL) === -1){
            item.url=picURL+item.url
        }
        return item
    })

    const uploadButton = (
        <div>
          <PlusOutlined />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
    
    const customRequest=(data)=>{
        let formData = new FormData();
        formData.append('missionid',missiondetail[0].id)
        formData.append('filename',data.file.name)
        formData.append(data.filename,data.file)
        props.missionmanager_postpic(formData,currenttable)
    }

    const removePic=(file)=>{
        let formData = new FormData();
        formData.append('id',file.id)
        return props.missionmanager_postpic(formData,currenttable) 
    }

    const handlePreview = async file => {
        props.missionmanager_changeState({
          previewImage: file.url,
          previewVisible: true,
        });
      };
    const  handleCancel = () => props.missionmanager_changeState({ previewVisible: false });

    return (
        <div>
            <Upload
                listType="picture-card"
                name='missionpic'
                fileList={cleanpicList}
                accept='image/*'
                onRemove={removePic}
                onPreview={handlePreview}
                customRequest={(data)=>customRequest(data)}
            >
                {picList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
}

export default SamplePic

