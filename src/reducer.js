export default (state, { type, payload }) => {
  switch (type) {
    case "GET_DATA":
      return { ...state, ...payload };
    case "ADD_FOLDER":
      return { ...state, lists: [...state.lists, payload] };
    case "REMOVE_TASK":
      return { ...state, lists: [...payload] };
    case "CHANGE_COMPLETED":
      return {
        ...state,
        tasks: [...state.tasks, payload],
      };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, payload] };
    case "DELETE_TASK":
      return { ...state, tasks: payload };
    case "CHANGE_VISIBLE":
      return { ...state, visibleList: payload };
    case "TOGGLE_ABLE":
      return { ...state, lists: [...state.lists, payload] };
    case "CHANGE_TITLE":
      return { ...state, lists: [...payload] };
    case "TRIGGER_LISTS":
      return { ...state, changeListsTrigger: state.changeListsTrigger + 1 };
    default:
      return state;
  }
};
