import React, { useEffect, useState } from 'react'
import binImage from '../assets/icons/bin.png'

function TodoList() {

  const [inpuValue, setInputValue] = useState('')
  const [array, setArray] = useState([])
  
  function addTodo () {
    if(inpuValue){
      let object = {
        value: inpuValue,
        completed: false
      }
      setArray([...array, object])
      localStorage.setItem('todo-list', JSON.stringify([...array, object]))
    }
  }

  useEffect(()=>{
    let getItem = JSON.parse(localStorage.getItem('todo-list'))
    if(getItem !== null){
      setArray(getItem)
    }
  },[])

  function ischecked(e) {
    console.log(e.target.checked);
  let newArray = []
  for (let i = 0; i < array.length; i++) {
    if (i === parseInt(e.target.parentElement.classList[0])){
      newArray.push(array[i])
      if (!newArray[i].completed){
        newArray[i].completed = true
        e.target.parentElement.style.opacity = '50%'
      }else{
        newArray[i].completed = false
        e.target.parentElement.style.opacity = '100%'
      }
    }else{
      newArray.push(array[i])
    }
  }
    setArray(newArray)
    localStorage.setItem('todo-list', JSON.stringify(newArray))
  }
  
  function delet(e) {
  let newArray = []
  for (let i = 0; i < array.length; i++) {
    if (i !== parseInt(e.target.parentElement.classList[0])){
      newArray.push(array[i])
    }
  }
  setArray(newArray);
  localStorage.setItem('todo-list', JSON.stringify(newArray))
  }

  return (
    <>
    <div className="">
      <input type="text" className="todo-input" onChange={(e)=>{setInputValue(e.target.value)}}/>
      <button className="add-todo-btn" onClick={addTodo}>+</button>
    </div>
    <ul className="">
      {(array)? array.map((e, index) => (
      <li key={index} className={index}>
          <input type="checkbox" checked={e.completed} onChange={ischecked}/>
        {e.value}
          <img src={binImage} alt="bin" onClick={delet} />
      </li>
      )): ''}
    </ul>
    </>
  )
}

export default TodoList;