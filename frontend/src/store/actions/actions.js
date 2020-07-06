import axios from "axios";
import api from "../../services/api";
import { SET_PARKING, FETCH_PARKING_SUCCESS } from "./types";

export const setParking = (id) => {
  return {
    type: SET_PARKING,
    payload: id,
  };
};

export const fetchParkingSuccess = (parking) => {
  return {
    type: FETCH_PARKING_SUCCESS,
    parking,
  };
};

export function fetchParking(id) {
  return function (dispatch) {
    if (id !== undefined) {
      return axios({
        baseURL: `${api}parkings/${id}/`,
        method: "get",
        headers: {
          Authorization: `Bearer  ${localStorage.getItem("parking-token")}`,
        },
      })
        .then(({ data }) => {
          if (data.error) {
            throw data.error;
          }
          // console.log('*****************')
          // console.log(" ",data)
          // console.log('*****************')

          localStorage.setItem("parking_id", JSON.stringify(data.id));
          localStorage.setItem("parking_name", data.name_establishment);

          dispatch(fetchParkingSuccess(data));

          return data;
        })
        .catch((error) => {
          console.log("ERROR!", error);
        });
    } else {
      console.log("LOADING...");
    }
  };
}
