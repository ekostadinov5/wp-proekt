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
    },
    fetchStudentsBySlotId: (slotId, page, pageSize) => {
        return axios.get(`/api/students/bySlotId/${slotId}`, {
            headers : {
                page: page,
                pageSize: pageSize
            }
        });
    },
    followProfessor: (index, professorId) => {
        const formParams = qs.stringify({
            index: index,
            professorId: professorId
        });
        return axios.post("/api/students/follow", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    unfollowProfessor: (index, professorId) => {
        const formParams = qs.stringify({
            index: index,
            professorId: professorId
        });
        return axios.post("/api/students/unfollow", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
};

export default StudentsService;
