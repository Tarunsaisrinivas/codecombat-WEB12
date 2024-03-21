"use client"
import React, { useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result,Rate } from 'antd';
import { getTime, logout } from '@/app/api/route';
import moment from 'moment';

const Submit = () => {
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

const [rate,setRate]  =  useState(0);
const [feedback,setFeedback]  =  useState("");

// console.log("time:",moment().hour())

const handleSubmit= async()=>{
  enterLoading(0);
  try {
    const response = await fetch('api/feedback',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rate,feedback
       }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.clear();
    await logout();
} else {
    console.error(data.message);
    console.log('Enter Failed');
}
console.log('Message from server:', data.message);
} catch (error) {

  console.error('Error:', error);
}
}


  return (
    <div className='w-full flex flex-col justify-center items-center '>
    <Result
    icon={<SmileOutlined />}
    style={{
      padding:"30px 0px 0px 0px",
    }}
    title="Exam Finished!"
    extra={
    <div className="max-w-xl mx-auto flex w-full flex-col border rounded-lg bg-lime-50 p-6">
    <h2 className="title-font mb-1 text-lg font-medium text-gray-900 ">Feedback</h2>
    <p className="mb-2 leading-relaxed text-gray-600">If you had any issues or you liked our event, please share with us!
    </p>
    <div className="mb-4">
<Rate style={{
          fontSize: '30px',
        }} onChange={setRate} value={rate} />
    </div>
    <div className="mb-4">
        <label htmlFor="message" className="text-sm leading-7 text-gray-600">Message</label>
        <textarea id="message" name="message" onChange={(e)=>setFeedback(e.target.value)} className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" value={feedback}></textarea>
    </div>
    <Button type="primary" loading={loadings[0]} className="text-center rounded border-0 bg-blue-500 pb-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none" onClick={handleSubmit}>Submit</Button>
    <p className="mt-3 text-xs text-gray-500">Feel free to connect with us.</p>
</div>}
  />
  </div>
  )
}

export default Submit

