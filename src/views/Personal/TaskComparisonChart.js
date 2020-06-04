import React from "react";
import { Card, Row, Col, Tooltip } from "antd";
import { Link } from "react-router-dom";


const TaskComparisonChart = (props) => {
    const data = [
        {
            'head_body标框': '682',
            '自己': '4396框/天',
            '规定': '5000框/天',
            '最高': '6666框/天',
            
        },
        {
            'redo_all_lisence': '682',
            '自己': '4396框/天',
            '规定': '5000框/天',
            '最高': '6666框/天'
        },
        {
            'head_face_new': '682',
            '自己': '4396框/天',
            '规定': '5000框/天',
            '最高': '6666框/天'
        },
        {
            'shelter_face_point1':'682',
            '自己': '4396框/天',
            '规定': '5000框/天',
            '最高': '6666框/天'
        },
        {
            'shenlv1': '682',
            '自己': '4396框/天',
            '规定': '5000框/天',
            '最高': '6666框/天'
        },
        {
            'shelter_face_point1': '682',
            '自己': '4396框/天',
            '规定': '5000框/天',
            '最高': '6666框/天'
        },
        {
            'shenlv1.pair': '682',
            '自己': '4396框/天',
            '规定': '5000框/天',
            '最高': '6666框/天'
        },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["小于5岁", "5至13岁", "14至17岁"],
      // 展开字段集
      key: "年龄段",
      // key字段
      value: "人口数量",
      // value字段
      retains: ["State"] // 保留字段集，默认为除fields以外的所有字段
    });
  
    const Comparative_data = (item) => {

        return (
        <Tooltip title={'与规定相比:' + (item.自己.replace(/[^0-9]/ig,"") - item.规定.replace(/[^0-9]/ig,""))}>
            <span>{'自己:' + item.自己}</span>
        </Tooltip>
      )
    }

    return (
        <>
           <Row gutter={16}>
                
                    {
                        data.map((item, index) => {

                            return (
                                <Col  span={12} key={index}>
                                    <Card title={<Link to={'/manager/MissionAnalysis/' + Object.values(item)[0]}>{Object.keys(item)[0]}</Link>} bordered={false}>
                                        <div>{Comparative_data(item)}</div>
                                        <div>{'规定:' + item.规定}</div>
                                        <div>{'最高:' + item.最高}</div>
                                    </Card>
                                </Col>
                            )
                        })
                    }

           </Row>
           
        </>
    );
}

export default TaskComparisonChart