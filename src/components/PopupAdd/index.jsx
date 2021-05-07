import React from "react";
import "./PopupAdd.scss";
import add from "../../assets/add.png";
import close from "../../assets/close_add_task.png";

const PopupAdd = React.memo(() => {
  const [popupState, setPopupState] = React.useState(false);
  React.useEffect(() => {
    document.addEventListener("click", popupHideClick);
  }, []);
  const refPopup = React.useRef();
  const refInput = React.useRef();
  const changePopupVisibility = () => {
    setPopupState(!popupState);
  };
  const addTask = () => {
    refInput.current.value = "";
    changePopupVisibility();
  };
  const popupHideClick = (e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(refPopup.current)) {
      setPopupState(false);
    }
  };

  return (
    <div className="add-folder" ref={refPopup}>
      <div className="btn-add" onClick={changePopupVisibility}>
        <img src={add} alt="" />
        <span>Добавить папку</span>
      </div>
      <div className="popup-wrapper">
        <div className={popupState === true ? "popup" : "none"}>
          <input type="text" ref={refInput} placeholder="Название папки" />
          <ul>
            {[].map((item, index) => {
              <li key={`${item}_${index}`}></li>;
            })}
          </ul>
          <button onClick={addTask}>Добавить папку</button>
          <img src={close} alt="#" onClick={changePopupVisibility} />
        </div>
      </div>
    </div>
  );
});

export default PopupAdd;
