"use client"
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { getTime } from '@/app/api/route';

const calculateTimeLeft = (deadline,date) => (deadline - Date.now()) / 1000;

const CountdownTimer =({ deadline,date,handleScoreQuiz}) => {

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(deadline,date));


  useEffect(() => {
    if(timeLeft>0){
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(deadline);
      if (newTimeLeft <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
        Swal.fire({
          title:'<strong>Time`s Up! Exam Finished. </strong>',
          html: 'Please Submit your Answers',
          focusConfirm: false,
          confirmButtonText:
' Submit',
          confirmButtonAriaLabel:
              'Thumbs up, great!',
      }).then(()=>{
        handleScoreQuiz();
      })
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);}
    else{
      setTimeLeft(0);
    }
  }, [deadline,timeLeft,handleScoreQuiz]);

  const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');

  const minutes = formatTime(timeLeft / 60);
  const seconds = formatTime(timeLeft % 60);

  return (
    <div className="text-center mt-2">
      <h2 className="text-lg font-semibold" suppressHydrationWarning>
        {minutes} : {seconds}
      </h2>
    </div>
  );
};

export default CountdownTimer;
