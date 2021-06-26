import React from "react";
import "./App.scss";
import SidebarTasks from "./components/SidebarTasks";
import PopupAdd from "./components/PopupAdd";
import TaskContent from "./components/TaskContent";
import axios from "axios";
import reducer from "./reducer";

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    lists: [],
    tasks: [],
    colors: [],
    visibleList: 0,
    changeListsTrigger: 0,
  });
  React.useEffect(() => {}, []);
  React.useLayoutEffect(() => {
    if (!localStorage.getItem("data")) {
      axios
        .get("http://localhost:8080/db.json")
        .then(({ data }) => localStorage.setItem("data", JSON.stringify(data)))
        .then(() => JSON.parse(localStorage.getItem("data")))
        .then((data) => dispatch({ type: "GET_DATA", payload: data }));
    } else if (localStorage.getItem("data")) {
      const { lists, colors, tasks } = JSON.parse(localStorage.getItem("data"));
      dispatch({
        type: "GET_DATA",
        payload: { lists, colors, tasks },
      });
    }
  }, []);
  
  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state));
  }, [state]);

  return (
    <div className="wrapper">
      <main className="main">
        <nav className="menu">
          <SidebarTasks {...state} dispatch={dispatch} />
          <PopupAdd {...state} dispatch={dispatch} />
        </nav>
        <div className="tasks">
          <div className="container">
            <TaskContent {...state} dispatch={dispatch} />
          </div>
        </div>
      </main>
    </div>
  );
}
export default App;
