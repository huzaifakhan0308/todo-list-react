import React, { useEffect, useState } from 'react';
import binImage from '../assets/icons/bin.png';

function TodoList() {
  const [inpuValue, setInputValue] = useState('');
  const [array, setArray] = useState([]);

  function addTodo() {
    if (inpuValue) {
      const object = {
        value: inpuValue,
        completed: false,
      };
      setArray([...array, object]);
      localStorage.setItem('todo-list', JSON.stringify([...array, object]));
    }
  }

  useEffect(() => {
    const getItem = JSON.parse(localStorage.getItem('todo-list'));
    if (getItem !== null) {
      setArray(getItem);
    }
  }, []);

  function ischecked(e) {
    const newArray = [];
    for (let i = 0; i < array.length; i += 1) {
      if (i === parseInt(e.target.parentElement.classList[0], 10)) {
        newArray.push(array[i]);
        if (!newArray[i].completed) {
          newArray[i].completed = true;
        } else {
          newArray[i].completed = false;
        }
      } else {
        newArray.push(array[i]);
      }
    }
    setArray(newArray);
    localStorage.setItem('todo-list', JSON.stringify(newArray));
  }

  function delet(e) {
    const newArray = [];
    for (let i = 0; i < array.length; i += 1) {
      if (i !== parseInt(e.target.parentElement.classList[0], 10)) {
        newArray.push(array[i]);
      }
    }
    setArray(newArray);
    localStorage.setItem('todo-list', JSON.stringify(newArray));
  }

  return (
    <>
      <div className="">
        <input type="text" className="todo-input" onChange={(e) => { setInputValue(e.target.value); }} />
        <button type="button" className="add-todo-btn" onClick={addTodo}>+</button>
      </div>
      <ul className="">
        {(array) ? array.map((e, index) => (
          // eslint-disable-next-line
          <li key={`li-${index}`} className={index} style={{ opacity: (e.completed ? '50%' : '100%') }}>
            <input type="checkbox" checked={e.completed} onChange={ischecked} />
            {e.value}
            {/* eslint-disable-next-line */}
            <img
              src={binImage}
              alt="bin"
              onClick={delet}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  delet(event);
                }
              }}
            />
          </li>
        )) : ''}
      </ul>
    </>
  );
}

export default TodoList;
