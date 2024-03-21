"use client"
import React, { useState } from 'react'
import { Button,Space,Drawer,Alert,Checkbox } from 'antd';
import {  setValue } from '@/app/api/route';
import Combat from '@/app/Code Combat.jpg'
import Image from 'next/image'

const StartPage = () => {
  const [open, setOpen] = useState(false);
  const [checked,Setchecked] = useState(false);

  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
    const handleClick = async()=>{
      enterLoading(0)
      await setValue("value");
      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[0] = false;
          return newLoadings;
        });
      }, 6000);
    };

  return (
    <div className='h-full relative'>
    <Image src={Combat} alt="alt" style={{position:'fixed',height:"100%"}} />
    <div className='w-full mt-8 fixed flex justify-end z-10'>
    <button type="button" onClick={showDrawer} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start The Exam</button>
    </div>
    <>
        <Drawer
        title="Instructions"
        placement="bottom"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button  type="primary" className='bg-[#0d47a1] text-white' loading={loadings[0]} onClick={handleClick} disabled={!checked}>
              Agree and Continue
            </Button>
          </Space>
        }
      >
        <ul className="list-disc">
        <Space direction="vertical" style={{ width: '100%' }}>
 <li><strong>Number of Questions:</strong> The quiz comprises a total of 45 questions.</li>
<li><strong>Scoring:</strong> Each question carries one mark. No Negative Marking. Ensure to answer each question carefully.</li>
<li><strong>Exam Duration:</strong>The total duration of the quiz is 1 hour. Please manage your time efficiently.</li>
<li><strong>Question Selection:</strong> Questions will be tailored to your academic year, ensuring relevance and suitability.</li>
<li><strong>Qualification Criteria:</strong> Students must achieve the cutoff score to qualify for the next round.</li>
<li><strong>Round 2 Eligibility:</strong> Qualified students will proceed to the second round of the quiz.</li>
    <Alert message="Notice that tab switching and any form of malpractice during the quiz are strictly prohibited. Violation of these rules may lead to disqualification." type="error" showIcon />
    <Checkbox checked={checked} onChange={()=>Setchecked(!checked)}>
    <p className='font-thin'>By clicking here, You state that you have read and understood the terms and conditions.</p>
        </Checkbox>
  </Space>
</ul>
      </Drawer>
       </>
     </div>
  )
}

export default StartPage
