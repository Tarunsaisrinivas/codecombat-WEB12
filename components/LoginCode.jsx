"use client"
import React, {  useEffect, useRef, useState } from 'react';
import { LockFilled } from '@ant-design/icons';
import { Input,Space, Card ,message,Button,Form} from 'antd';
import { login } from '@/app/api/route';

const LoginCode = () => {
  const buttonRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();

  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  const onFinish = async (values) => {
      try {
          if (values.logincode === "ISTENipuna") {
              enterLoading(0);
              await login("Logged");
          } else {
              error();
          }
      } catch (error) {
          console.log(error);
      }
  };


const handleClick = () => {
  if (buttonRef.current) {
    buttonRef.current.click();
  }
};

const error = () => {
  messageApi.open({
    type: 'error',
    content: 'Please Enter Valid Pass Code',
  });
};

   return(
     <div className='h-full flex justify-center items-center'>
  <Card
    style={{
      width: 400,
      padding:20
    }}
    cover={
      <h1 className='text-3xl text-center'>CODE COMBAT</h1>
    }
    actions={[
        <Button key="btn" loading={loadings[0]} className='bg-[#0d47a1] text-white' onClick={handleClick}>
        LOGIN
      </Button>
    ]}
  >
    <Space direction="horizontal" className='flex justify-evenly items-center'>
   <Form
   name="basic"
   onFinish={onFinish}
   autoComplete="off"
   className='flex'
   >
     {contextHolder}
    <Form.Item
      label={<LockFilled />}
      name="logincode"
      rules={[
        {
          required: true,
          message: 'Please input your login code!',
        },
      ]}
    >
      <Input.Password size='large' placeholder='Login Code'/>
    </Form.Item>
    <button type='submit' ref={buttonRef} hidden>Submit</button>
    </Form>
         </Space>
  </Card>
  </div>);
};
export default LoginCode;