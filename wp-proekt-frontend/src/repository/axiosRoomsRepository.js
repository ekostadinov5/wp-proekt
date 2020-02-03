import axios from '../custom-axios/axios';
import qs from 'qs';

const RoomsService = {
    fetchRooms: () => {
        return axios.get("/api/rooms");
    },
    fetchRoomsOrdered: () => {
        return axios.get("/api/rooms/ordered");
    },
    searchRooms: (searchTerm) => {
        return axios.get(`/api/rooms?term=${searchTerm}`);
    },
    fetchById: (id) => {
        return axios.get(`/api/rooms/${id}`);
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
        const id = room.id;
        const formParam = qs.stringify(room);
        return axios.patch(`/api/rooms/${id}`, formParam, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    deleteRoom: (id) => {
        return axios.delete(`/api/rooms/${id}`);
    }
};

export default RoomsService;
