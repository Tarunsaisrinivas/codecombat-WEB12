import React from 'react'

const Badge = ({num,selected,answers,reviews,handleQuestion}) => {
  return (
    <button type="button" onClick={()=>handleQuestion(num-1)}
    className={
      (num === selected
        ? 'bg-blue-600 text-xl h-10 text-white rounded-bl-xl rounded-br-xl p-2 m-2 leading-none flex items-center'
        :( reviews.includes(num)?"bg-amber-500 text-xl h-10 text-white rounded-bl-xl rounded-br-xl p-2 m-2 leading-none flex items-center":(answers.includes(num)?'bg-green-600 text-xl h-10 text-white rounded-bl-xl rounded-br-xl p-2 m-2 leading-none flex items-center':'bg-blue-400 text-xl h-10 text-white rounded-bl-xl rounded-br-xl p-2 m-2 leading-none flex items-center')))
    }>
    {num < 10 ? "0" : ""}{num}
</button>
  )
}


export default Badge