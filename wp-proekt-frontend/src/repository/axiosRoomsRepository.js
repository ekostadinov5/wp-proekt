import axios from '../custom-axios/axios';
import qs from 'qs';

const RoomsService = {
    fetchRooms: () => {
        return axios.get("/api/rooms");
    },
    searchRooms: (searchTerm) => {
        return axios.get(`/api/rooms?term=${searchTerm}`);
    }
}

export default RoomsService;
