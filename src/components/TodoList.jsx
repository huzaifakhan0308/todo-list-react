import React, { useEffect, useState } from 'react'
import binImage from '../assets/icons/bin.png'

function TodoList() {

  const [inpuValue, setInputValue] = useState('')

  // const [object, setObject] = useState({
  //   value: '',
  //   index: 0,
  // })

  const [array, setArray] = useState([])
  // const [number, setNumber] = useState(0)

  function addTodo () {
    // object.value = inpuValue
    // object.index = number
    setArray([...array,inpuValue])
    // setNumber(number + 1)
  }

  useEffect(()=> {
console.log(array);
  },[array])

  function abc(e) {
  e.target.parentElement.remove();
  const newArray = array.filter((_, index) => index !== Number(e.target.parentElement.className[0]));
  setArray(newArray);
}

  return (
    <>
    <div className="">
      <input type="text" onChange={(e)=>{setInputValue(e.target.value)}}/>
      <button onClick={addTodo}>+</button>
    </div>
    <ul className="">
    {(array)? array.map((e, index) => (
    <li key={index} className={index}>
      <input type="checkbox" onClick={abc} />
      {e}
      <img src={binImage} alt="" onClick={abc} />
    </li>
    )): ''}
    </ul>
    </>
  )
}

export default TodoList;