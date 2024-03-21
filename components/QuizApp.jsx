"use client"
import React, {  useCallback, useEffect, useRef, useState } from 'react';
import { Layout,theme} from 'antd';
import Count from './Count';
import dynamic from 'next/dynamic';
const QuestionCard = dynamic(() =>
    import('@/components/QuestionCard'), {
        ssr: false,
    });
import {questions} from '@/utils/Web12';
import {  setDeadline, setSubmit } from '@/app/api/route';
import { disconnectDB } from '@/utils/db';
import Loading from '@/app/loading';
import Badge from './Badge';

const { Header, Content, Sider } = Layout;

const QuizApp = ({year,date}) => {

  const { token: { colorBgContainer, borderRadiusLG },} = theme.useToken();




// console.log("date",date)
  const [index,setIndex] = useState(0);
  const [QuestionsArray, setQuestionsArray] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Sloading, setSLoading] = useState(false);
  const [deadline, setdeadline] = useState(null);
  const [tabShiftCount, setTabShiftCount] = useState(0);
  const [selected, setSelected] = useState(1);

  const [selectedAnswerID, setSelectedAnswerID] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(`question_1`) || null;
    }
    return null;
  });

  const getAnswersArray = () => {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('answers')) || [];
    }
    return [];
  }

  const getReviewArray = () => {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('reviews')) || [];
    }
    return [];
  }
  const answers = getAnswersArray();
  const reviews = getReviewArray();


  useEffect(() => {
    function shuffleArray() {
      var array = [];
      for (var i = 0; i < questions.length; i++) {
        array.push(i);
      }
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      typeof window !== "undefined" && localStorage.setItem(`questions`,array);
      return array;
    }

      if (typeof localStorage !== 'undefined') {
      const storedQuestionsArray = localStorage.getItem('questions');
      if (storedQuestionsArray) {
        setQuestionsArray(JSON.parse(storedQuestionsArray));
      } else {
        const shuffledArray = shuffleArray();
        localStorage.setItem('questions', JSON.stringify(shuffledArray));
        // console.log("second")
      }
    }
  }, []);


  useEffect(() => {
    if (QuestionsArray && QuestionsArray.length > 0) {
      setCurrentQuestion(QuestionsArray[0]);
      const setTime=async()=>{
        try {
          const response = await fetch('api/settime',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (response.ok) {
            setdeadline(data.deadline.toString());
            setDeadline(data.deadline.toString());
        } else {
            console.error(data.message);
            console.log('Enter Failed');
        }
        console.log('Message from server:', data.message);
        } catch (error) {
          console.error('Error:', error);
        }
        finally{
          if(loading){
            setLoading(false)
          }
          disconnectDB();
        }
      }
      if(loading){
        setTime();
      }
    }
  }, [QuestionsArray,loading]);


  const handleAnswerOptionClick = (selectedAnswerID) => {
    localStorage.setItem(`question_${questions[currentQuestion].id}`, selectedAnswerID);
    answers.push(index+1);
    localStorage.setItem("answers",JSON.stringify(answers));
    setSelectedAnswerID(selectedAnswerID);
};
const handleReviewQuestion = () => {
  handleNextQuestion();
  const indexToAdd = index + 1;

  // Check if index+1 already exists in reviews
  const indexToRemove = reviews.indexOf(indexToAdd);
  if (indexToRemove !== -1) {
      // If it exists, remove it
      reviews.splice(indexToRemove, 1);
      console.log("Removed index", indexToAdd);
  } else {
      // If it doesn't exist, add it
      reviews.push(indexToAdd);
      console.log("Added index", indexToAdd);
  }

  localStorage.setItem("reviews", JSON.stringify(reviews));
};


const handleNextQuestion = () => {
  if (index < questions.length-1) {
    const indexToRemove = reviews.indexOf(index+1);
  if (indexToRemove !== -1) {
      // If it exists, remove it
      reviews.splice(indexToRemove, 1);
      localStorage.setItem("reviews", JSON.stringify(reviews));
  }
    setIndex(index+1);
    setSelected(prevValue => prevValue + 1);
    const nextQuestion = QuestionsArray[index+1];
      setCurrentQuestion(nextQuestion);
      setSelectedAnswerID(localStorage.getItem(`question_${questions[nextQuestion].id}`) || null);
  }
};

const handlePrevQuestion = () => {
  if (index > 0) {
    setIndex(index-1);
    setSelected(prevValue => prevValue - 1);
    const prevQuestion = QuestionsArray[index-1];
      setCurrentQuestion(prevQuestion);
      setSelectedAnswerID(localStorage.getItem(`question_${questions[prevQuestion].id}`) || null);
  }
};
const handleQuestion = (index) => {
  if (index >= 0 && index <=questions.length -1) {
    setIndex(index);
    setSelected(index+1);
    const prevQuestion = QuestionsArray[index];
    setCurrentQuestion(prevQuestion);
    setSelectedAnswerID(localStorage.getItem(`question_${questions[prevQuestion].id}`) || null);
  }
};

const handleScoreQuiz = useCallback(async () => {
  setSLoading(true);
  let finalScore = 0;
  questions.forEach((question) => {
    const storedAnswer = localStorage.getItem(`question_${question.id}`);
    if (storedAnswer === question.correctResponse) {
      finalScore += 1;
    }
  });
  console.log(finalScore);
  try {
    const response = await fetch('api/setresult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        finalScore
      }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.clear()
      await setSubmit("Submit");
    } else {
      console.error(data.message);
      console.log('Enter Failed');
    }
    console.log('Message from server:', data.message);
  } catch (error) {
    console.error('Error:', error);
  }
}, []);

useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden' && tabShiftCount < 3) {
      if (tabShiftCount === 2) {
        handleScoreQuiz();
      } else {
        setTabShiftCount(prevCount => {
          alert(`Don't Close the Tab(${prevCount + 1}/3)`);
          console.log(prevCount + 1);
          return prevCount + 1;
        });
      }
    }
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, [tabShiftCount, handleScoreQuiz]);


if(loading || Sloading){
  return <Loading/>
}else{
  return (
    <Layout>
      <div className='fixed z-50 w-full top-20'>
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className='flex justify-between w-full text-white'>
      <h1 className='font-bold'>QUIZ TIME</h1>
      <div className='flex items-center'>
    {deadline &&  <Count deadline={deadline} date={date} setLoading={setLoading} handleScoreQuiz={handleScoreQuiz} />}
        </div>
  </div>
    </Header>
    </div>
    <Layout
    style={{
      marginTop:76
    }}
    >
      <Sider
        width={300}
        style={{
          background: colorBgContainer,
        }}
      >
        <div className='flex flex-wrap gap-1 h-[82vh] overflow-y-auto'>
         {QuestionsArray && answers && QuestionsArray.map((num, index) => (
       <Badge key={index} num={index+1} selected={selected} answers={answers} reviews={reviews} handleQuestion={handleQuestion}/>
      ))}</div>
      </Sider>
      <Layout
        style={{
          padding: '0 24px 24px',
        }}
      >
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
                {QuestionsArray && questions[currentQuestion] && <QuestionCard
                    quizLength={questions.length}
                    question={questions[currentQuestion]}
                    index={index}
                    reviews={reviews}
                    selectedAnswerID={selectedAnswerID}
                    handleAnswerOptionClick={handleAnswerOptionClick}
                    handleNextQuestion={handleNextQuestion}
                    handlePrevQuestion={handlePrevQuestion}
                    handleReviewQuestion={handleReviewQuestion}
                    handleScoreQuiz={handleScoreQuiz}
                    />
                }
        </Content>
      </Layout>
    </Layout>
  </Layout>
  )
}}

export default QuizApp