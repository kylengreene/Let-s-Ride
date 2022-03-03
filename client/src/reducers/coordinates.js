const coordinates = (state = { arr: [] }, action) => {
  switch (action.type) {
    case "COORDINATES_SET":
      return { ...state, arr: [action.payload, ...state.arr] };
    default:
      return state;
  }
};
