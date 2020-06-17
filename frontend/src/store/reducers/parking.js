import { FETCH_PARKING_SUCCESS } from "../actions/types";

const INITAL_STATE = {
  id: localStorage.getItem("parking_id"),
  parking_name: localStorage.getItem("parking_name"),
};

export default function current_parking(state = INITAL_STATE, action) {
  switch (action.type) {
    case FETCH_PARKING_SUCCESS:
      return action.parking;
    default:
      return state;
  }
}
