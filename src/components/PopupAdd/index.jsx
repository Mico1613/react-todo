import React from "react";
import "./PopupAdd.scss";
import add from "../../assets/add.png";
import close from "../../assets/close_add_task.png";
import classnames from "classnames";

const PopupAdd = React.memo(({ colors, lists, dispatch }) => {
  const [color, setColor] = React.useState(0);
  const [inputValue, setInputValue] = React.useState("");
  const [popupState, setPopupState] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener("click", popupHideClick);
  }, []);
  const refPopup = React.useRef();
  const refInput = React.useRef();
  const changePopupVisibility = () => {
    setPopupState(!popupState);
    setTimeout(() => {
      refInput.current.focus();
    }, 0);
  };
  const onEnterAddFolder = (e) => {
    if (e.key === "Enter") {
      addFolder();
    }
  };
  const addFolder = () => {
    dispatch({
      type: "ADD_FOLDER",
      payload: {
        id: Math.random(),
        name: inputValue,
        colorId: color + 1,
      },
    });
    dispatch({ type: "TRIGGER_LISTS" });
    refInput.current.value = "";
    changePopupVisibility();
    setInputValue("");
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
          <input
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            type="text"
            ref={refInput}
            placeholder="Название папки"
            onKeyPress={(e) => onEnterAddFolder(e)}
          />
          <ul>
            {colors.map((item, index) => (
              <li
                key={`${item}_${index}`}
                className={classnames("circle", {
                  choosen: color === index,
                })}
                style={{ backgroundColor: item.hex, borderColor: item.name }}
                onClick={() => setColor(index)}
              ></li>
            ))}
          </ul>
          <button onClick={addFolder}>Добавить папку</button>
          <img src={close} alt="#" onClick={changePopupVisibility} />
        </div>
      </div>
    </div>
  );
});

export default PopupAdd;
