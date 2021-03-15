import React from "react";
import "./App.scss";

function App() {
  const ref = React.useRef(0);
  const [Arr, setArr] = React.useState([]);
  const addTask = () => {
    setArr([...Arr, ref.current.value]);
    ref.current.value = "";
  };
  return (
    <>
      <div className='kek'>
      <ul>
        {Arr.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
        <div className='lol'>
          <button onClick={addTask}> Добавить </button>
          <button onClick={() => setArr([])}> Очистить </button>
        </div>
        <input ref={ref} type="text" name="name" placeholder="Введите задачу" />
      </div>
    </>
  );
}

export default App;
