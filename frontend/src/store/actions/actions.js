import axios from 'axios'
// import myConfig from '../../configs/config'
import api from '../../services/api'

import {
    // FETCH_FARMS,
    SET_PARKING,
    FETCH_PARKING_SUCCESS
} from './types';

// const FARM_URL = `${myConfig.API_URL}/farm/`;

export const setParking = (id) => {
    return {
        type: SET_PARKING,
        payload: id
    }
};

export const fetchParkingSuccess = (parking) => {
    return {
        type: FETCH_PARKING_SUCCESS,
        parking
    }
}

export function fetchParking(id) {
    return function (dispatch) {

        if (id !== undefined) {
            return axios({
                baseURL: `${api}parkings/${id}/`,
                method: 'get',
                headers: {
                    'Authorization': `Bearer  ${localStorage.getItem('parking-token')}`
                },
            })
                .then(({ data }) => {

                    if (data.error) {
                        throw (data.error)
                    }
                    console.log('*****************')
                    console.log("fetchFarm ",data)
                    console.log('*****************')

                    localStorage.setItem("parking_id", JSON.stringify(data.id))
                    localStorage.setItem("parking_name", data.name_establishment)

                    dispatch(fetchParkingSuccess(data))

                    return data

                })
                .catch(error => {
                    console.log("ERROR!", error)
                });
        }
        else {
            console.log('LOADING...')
        }
    };
}

// export const setParkings = (farms) => {
//     return {
//         type: FETCH_FARMS,
//         farms
//     }
// };

// export function fetchFarms() {
//     return function (dispatch) {
//         return axios({
//             baseURL: FARM_URL,
//             method: 'get',
//             headers: {
//                 'Authorization': `Bearer  ${localStorage.getItem('parking-token')}`
//             },
//         })
//             .then(({ data }) => {
//                 dispatch(setParkings(data))

//             })
//             .catch(error => {
//                 console.log("ERROR!", error)
//                 throw (error);
//             });
//     };
// }

