import React from "react";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loading = () => {
    return (
        <Spin indicator={<LoadingOutlined
            style={{
                fontSize: 24,
                marginBottom: '20px'
            }}
            spin
            size='large'
        />} size='large' tip='Loading...' />
    )
}

export default Loading;