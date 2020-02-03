import axios from '../custom-axios/axios';
import qs from 'qs';

const StudentsService = {
    fetchByIndex: (index) => {
        return axios.get(`/api/students/${index}`)
    },
    addToSlot: (slotId, index) => {
        const formParams = qs.stringify({
            slotId: slotId,
            index: index
        });
        return axios.post("/api/students/add", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    removeFromSlot: (slotId, index) => {
        const formParams = qs.stringify({
            slotId: slotId,
            index: index
        });
        return axios.post("/api/students/remove", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
};

export default StudentsService;
