import React from 'react';
import { Alert, Flex, Spin } from 'antd';
const Loading = () => (
<div className='h-full w-full flex justify-center items-center'>
      <Spin tip="Loading" size="large">
        <div className="p-12 rounded" />
        </Spin>
      </div>
);
export default Loading;