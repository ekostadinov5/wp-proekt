import axios from '../custom-axios/axios';
import qs from 'qs';

const RoomsService = {
    fetchRooms: () => {
        return axios.get("/api/rooms");
    },
    searchRooms: (searchTerm) => {
        return axios.get(`/api/rooms?term=${searchTerm}`);
    },
    addRoom: (room) => {
        const formParams = qs.stringify(room);
        return axios.post("/api/rooms", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    deleteRoom: (name) => {
        return axios.delete(`/api/rooms/${name}`);
    }
}

export default RoomsService;
