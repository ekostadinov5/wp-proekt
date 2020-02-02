import axios from '../custom-axios/axios';
import qs from 'qs';

const RoomsService = {
    fetchRoomsOrdered: () => {
        return axios.get("/api/rooms");
    },
    searchRooms: (searchTerm) => {
        return axios.get(`/api/rooms?term=${searchTerm}`);
    },
    fetchByName: (name) => {
        return axios.get(`/api/rooms/${name}`);
    },
    addRoom: (room) => {
        const formParams = qs.stringify(room);
        return axios.post("/api/rooms", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    updateRoom: (room) => {
        const name = room.name;
        const formParam = qs.stringify(room);
        return axios.patch(`/api/rooms/${name}`, formParam, {
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
