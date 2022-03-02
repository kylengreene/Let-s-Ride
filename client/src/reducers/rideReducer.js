const rideReducer = (state = 10, action) => {
  switch (action.type) {
    case "RIDE_INCREASED":
        console.log("increase");
      return state + action.payload;
    case "RIDE_DECREASED":
        console.log("decrease");
      return state - 1;
    default:
      return state;
  }
};

export default rideReducer;
