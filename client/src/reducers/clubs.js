import { findClubsByPostal } from "../api/club";

const inititalState = {
  clubs: [],
  loading: false,
  error: null,
};
const clubs = (state = inititalState, action) => {
  switch (action.type) {
    case "CLUB_BY_POSTAL_REQUESTED":
      return { ...state, loading: true};
    case "CLUB_BY_POSTAL_SUCCESS":
      return { ...state, loading: false, clubs: action.clubs };
    case "CLUB_BY_POSTAL_FAIL":
      return { ...state, loading: false, error: action.message };
    default:
      return state;
  }
};

export default clubs;
