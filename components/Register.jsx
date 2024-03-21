"use client"
import React, { useState } from 'react'
import {UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { login } from '@/app/api/route';
import Swal from 'sweetalert2'
import {
    Button,
    Form,
    Input,
    Select,
    Space,
    Divider,
    message
  } from 'antd';
import code from '@/app/code.png';
import Image from 'next/image';



const Register = () => {

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [loadings, setLoadings] = useState([]);
    const [islogin,setLogin] = useState(false);


    const error = (msg) => {
      messageApi.open({
        type: 'error',
        content: msg,
      });
    };

    const enterLoading = (index) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });

    };
    const onFinish = async(values) => {
      enterLoading(0);
      const {
        firstName,
        lastName,
        email,
        phone,
        regdNo,
        year,
        branch,
        college} = values;
        console.log('Received values of form: ', values);

      try {
        let response;
        if(!islogin){
           response = await fetch('api/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              phone,
              regdNo,
              year,
              branch,
              college
             }),
        });
        }
        else{
          response = await fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              phone,
             }),
        });
        }
        const data = await response.json();
        if (response.ok) {
          if(data.result){
            if(data.result==="Timeup"){
              Swal.fire({
                title:'<b>Heyy! Your Exam Time is already Completed. </b>',
                html: '',
                focusConfirm: false,
                showCloseButton: true,
                confirmButtonText:'Okay',
                confirmButtonAriaLabel:
                    'Thumbs up, great!',
            })}
            else{
            Swal.fire({
              title:'<b>Heyy! Your Exam already COMPLETED. </b>',
              html: 'Results will be announce soon',
              focusConfirm: false,
              showCloseButton: true,
              confirmButtonText:'Okay',
              confirmButtonAriaLabel:
                  'Thumbs up, great!',
          })}
          }else{
            await login( JSON.stringify([email,data.year]));
            console.log('Data Entered Successfull');
          }
        } else {
            error(data.message);
            console.log('Enter Failed');
        }
        setTimeout(() => {
          setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = false;
            return newLoadings;
          });
        }, 1000);
        // console.log('Message from server:', data.message);
    } catch (error) {
        console.error('Error:', error);
    }
    };

      const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
  <div className="flex flex-col items-center justify-center h-full px-6 py-0">
      <div className="w-full max-w-lg p-0 mt-0 bg-white rounded-lg shadow">
          <div className="p-8 space-y-6">
          <div className="flex items-center justify-center w-full space-x-2 rtl:space-x-reverse">
    <Image src={code} alt="alt" width={30} height={30} />
    <span className="text-2xl font-bold leading-tight tracking-tight text-center text-gray-900">{islogin?"Login":"Register"}</span>
    </div>
              <Form
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      {contextHolder}
   { !islogin &&   <div className='flex gap-5'>
      <Form.Item
        name="firstName"
        rules={[
          {
            required: true,
            message: 'Please input your First Name!',
          },
        ]}
      >
        <Input size="large" placeholder="First Name" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[
          {
            required: true,
            message: 'Please input your Last Name!',
          },
        ]}
      >
        <Input size="large" placeholder="Last Name" prefix={<UserOutlined />} />
      </Form.Item>
      </div>}
      <Form.Item
        name="email"
        label={<MailOutlined />}
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input placeholder="Email"  />
      </Form.Item>
      <Form.Item
        name="phone"
        label={<PhoneOutlined />}
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore="+91"
          minLength={10}
          maxLength={10}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>
{
!islogin &&
<>
   <Form.Item
        name="regdNo"
        label="Regd No."
        rules={[
          {
            required: true,
            message: 'Please input your Regd No!',
          },
        ]}
      >
    <Input placeholder="Registration Number" prefix={<UserOutlined />} />
    </Form.Item>
    <Form.Item
        name="year"
        label="Select Year"
        style={{
            width:"50%"
            }}
        rules={[
          {
            required: true,
            message: 'Please input your Year!',
          },
        ]}
      >
          <Select
    showSearch
    optionFilterProp="children"
    filterOption={filterOption}
placeholder="Select Year"
    rules={[
        {
          required: true,
          message: 'Please input your Regd No!',
        },
      ]}
    options={[
      {
        value: '1',
        label: '1',
      },
      {
        value: '2',
        label: '2',
      },
    ]}
  />
</Form.Item>

    <Space
    direction="vertical"
    size="middle"
    style={{
      display: 'flex',
    }}
  >
        <Form.Item
        name="branch"
        label="Select Branch"
        rules={[
          {
            required: true,
            message: 'Please input your Branch!',
          },
        ]}
      >
          <Select
    showSearch
    optionFilterProp="children"
    placeholder="Select a Branch"
    style={{
      width:"100%"
      }}
    filterOption={filterOption}
    rules={[
        {
          required: true,
          message: 'Please input your Regd No!',
        },
      ]}
    options={[
      {
        value: 'AIDS',
        label: 'AIDS',
      },
      {
        value: 'AIML',
        label: 'AIML',
      },
      {
        value: 'CSE',
        label: 'CSE',
      },
      {
        value: 'CSBS',
        label: 'CSBS',
      },
      {
        value: 'CSD',
        label: 'CSD',
      },
      {
        value: 'CIC',
        label: 'CIC',
      },
      {
        value: 'CSIT',
        label: 'CSIT',
      },
      {
        value: 'IT',
        label: 'IT',
      },
      {
        value: 'ECE',
        label: 'ECE',
      },
      {
        value: 'EEE',
        label: 'EEE',
      },
      {
        value: 'MECH',
        label: 'MECH',
      },
      {
        value: 'CIVIL',
        label: 'CIVIL',
      },
    ]}
  /></Form.Item>
      </Space>
      <Space
    direction="vertical"
    size="middle"
    style={{
      display: 'flex',
    }}
  >
      <Form.Item
        name="college"
        label="Clg Name & Address"
        rules={[
          {
            required: true,
            message: 'Please input your College Name!',
          },
        ]}
      >
    <Input placeholder="College Name - College Address" prefix={<UserOutlined />} />
    </Form.Item>
    </Space>
    </>}
      <Divider dashed />
      <div className='flex justify-between w-full' >
      <Button type="default"  className='bg-[#ff2b7c] text-white text-end' onClick={() => setLogin(!islogin)}>
          {islogin?"Register Page":"Login Page"}
        </Button>
      <Button type="primary" htmlType="submit" className='bg-[#0d47a1]  text-white text-end' loading={loadings[0]} >
      {islogin?"Login":"Save & Login"}
        </Button>
        </div>
    </Form>
          </div>
      </div>
  </div>

  )
}

export default Register