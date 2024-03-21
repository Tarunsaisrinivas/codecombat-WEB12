"use client"
import React from 'react'
import { FloatButton,Modal } from 'antd';
import {  LogoutOutlined,ExclamationCircleOutlined } from '@ant-design/icons'
import { logout } from '@/app/api/route';

const PopLogOut = () => {

      const [modal, contextHolder] = Modal.useModal();
      const confirm = () => {
        modal.confirm({
          title: 'Confirm',
          icon: <ExclamationCircleOutlined />,
          content: 'Are You Sure Want to Log Out??',
          okText: 'Confirm',
          cancelText: 'Cancel',
          async onOk(){
            localStorage.clear();
            await logout();
          },
          okButtonProps:{
            type:"default",
            danger:true
          }
        });}

  return (
    <>
    {contextHolder}
    <FloatButton
    trigger="click"
    type="primary"
    style={{
      right: 24,
    }}
    onClick={confirm}
    icon={<LogoutOutlined />}
    >
   </FloatButton>
    </>
  )
}

export default PopLogOut