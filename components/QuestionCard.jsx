"use client"
import React, { useEffect } from 'react';
import { Radio, Space } from 'antd'
import { FloatButton,Modal } from 'antd';
import {  LogoutOutlined,ExclamationCircleOutlined } from '@ant-design/icons'
import Image from 'next/image'

const QuestionCard = ({
    quizLength,
    question,
    index,
    selectedAnswerID,
    handleAnswerOptionClick,
    handleNextQuestion,
    handlePrevQuestion,
    handleReviewQuestion,
    handleScoreQuiz
}) => {

  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Are You Sure Want to Submit??',
      okText: 'Confirm',
      cancelText: 'Cancel',
      async onOk(){
        handleScoreQuiz();
      },
      okButtonProps:{
        type:"default",
        danger:true
      }
    });}

    useEffect(() => {
      function handleKeyPress(event) {
          if (event.keyCode === 37 && index > 0) {
              handlePrevQuestion();
          } else if (event.keyCode === 39 && index < quizLength - 1) {
              handleNextQuestion();
          }
      }

      document.addEventListener("keydown", handleKeyPress);

      return () => {
          document.removeEventListener("keydown", handleKeyPress);
      };
  }, [index, handlePrevQuestion, handleNextQuestion, quizLength]);



    return (
      <div className="flex justify-center h-[72vh] select-none">
            <div className='relative w-full  p-4 bg-slate-50 border border-gray-200 rounded-md shadow'>
                <div className='flex items-center justify-between mb-2'>
                    <h2 className='text-xl font-bold leading-none text-gray-900'>
                    Question {index+1} of {quizLength}
                    </h2>
          {contextHolder}
                    <button type="button" onClick={confirm} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Submit</button>
                </div>
                <div className="flow-root h-[75%] overflow-x-auto">
                    <hr className=" border-gray-200 sm:mx-auto " />
                    <div className='px-4'>
                        <p className="my-6 font-bold text-lg text-black">
                          {question.questionText}
                          </p>
                          {question.code && (
                          <pre className="my-6 font-thin text-md text-black w-full">
                            <code>{question.code}</code>
                           </pre>)}
                         { question.img && <Image src={question.img} alt="alt" width={200} height={200} />}
                        <hr className="mb-2 border-gray-200 sm:mx-auto  lg:mb-2" />
                        <Radio.Group onChange={(e) => handleAnswerOptionClick(e.target.value)} value={selectedAnswerID}>
  <Space direction="vertical">
    {question.answerOptions.map((answerOption) => (
      <Radio
        key={answerOption.answerID}
        value={answerOption.answerID}
        className={
          selectedAnswerID === answerOption.answerID
            ? 'ant-radio-checked'
            : ''
        }
      >
        {answerOption.answerText}
      </Radio>
    ))}
  </Space>
</Radio.Group>
                    </div>
                </div>
                <div className='absolute bottom-0 right-0 flex justify-end items-end p-4'>
                     { index>0 &&<button
                            onClick={handlePrevQuestion}
                            type='button'
                            className='text-white bg-sky-700 hover:bg-sky-800 font-medium rounded-full text-sm px-5 py-2.5 mr-6 mb-2  focus:outline-none'
                            >
                            Prev
                            </button>}
                           { index < quizLength-1 && <button
                            onClick={handleNextQuestion}
                            type='button'
                            className='text-white bg-sky-700 hover:bg-sky-800 font-medium rounded-full text-sm px-5 py-2.5 mb-2  focus:outline-none'
                            >
                            Next
                            </button>}
                </div>
                <div className='absolute bottom-0 left-0 flex justify-start items-end p-4'>
                     <button
                            onClick={handleReviewQuestion}
                            type='button'
                            className='text-white bg-amber-500 hover:bg-amber-200 font-medium rounded-full text-sm px-5 py-2.5 mr-6 mb-2 focus:outline-none'
                            >
                            Review For Later
                            </button>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
