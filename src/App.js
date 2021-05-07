import React from "react";
import "./App.scss";
import SidebarTasks from "./components/SidebarTasks";
import PopupAdd from "./components/PopupAdd";

import edit from "./assets/edit.png";

function App() {
  const refInput = React.useRef();
  const refEdit = React.useRef();
  const [inputValue, setInputValue] = React.useState("Фронтенд и Бэкенд");

  const onEdit = () => {
    refInput.current.removeAttribute("disabled");
  };
  const setAttr = () => {
    refInput.current.setAttribute("disabled", "disabled");
  };

  const saveTitle = (e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(refInput.current) && !path.includes(refEdit.current)) {
      setInputValue(refInput.current.value);
      setAttr();
    }
    if (
      refInput.current.hasAttribute("disabled") &&
      path.includes(refEdit.current)
    ) {
      onEdit();
      refInput.current.focus();
    } else if (
      !refInput.current.hasAttribute("disabled") &&
      path.includes(refEdit.current)
    ) {
      setInputValue(refInput.current.value);
      setAttr();
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", saveTitle);
  }, []);

  React.useEffect(() => {
    refInput.current.style.width =
      (refInput.current.value.length + 1) * 20 + "px";
  }, [inputValue]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setInputValue(refInput.current.value);
      setAttr();
    }
  };
  
  return (
    <div className="wrapper">
      <main className="main">
        <nav className="menu">
          <SidebarTasks />
          <PopupAdd />
        </nav>
        <div className="tasks">
          <div className="container">
            <header className="header">
              <input
                onKeyPress={handleKeyPress}
                ref={refInput}
                onChange={(e) => setInputValue(e.target.value)}
                disabled
                type="text"
                value={inputValue}
              />
              <img ref={refEdit} src={edit} alt="#" />
            </header>
          </div>
        </div>
      </main>
    </div>
  );
}
export default App;
