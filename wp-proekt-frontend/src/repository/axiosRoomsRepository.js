import axios from '../custom-axios/axios';
import qs from 'qs';

const RoomsService = {
    fetchRooms: () => {
        return axios.get("/api/rooms");
    },
    searchRooms: (searchTerm) => {
        return axios.get(`/api/rooms?term=${searchTerm}`);
    },
    deleteRoom: (name) => {
        return axios.delete(`/api/rooms/${name}`);
    }
}

export default RoomsService;
