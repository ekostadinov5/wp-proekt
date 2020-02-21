import axios from '../custom-axios/axios';
import qs from 'qs';

const SubjectsService = {
    fetchSubjects: () => {
        return axios.get("/api/subjects");
    },
    fetchSubjectsOrdered: () => {
        return axios.get("/api/subjects/ordered");
    },
    searchSubjects: (searchTerm) => {
        return axios.get(`/api/subjects?term=${searchTerm}`);
    },
    fetchById: (id) => {
        return axios.get(`/api/subjects/${id}`);
    },
    addSubject: (room) => {
        const formParams = qs.stringify(room);
        return axios.post("/api/subjects", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    updateSubject: (room) => {
        const id = room.id;
        const formParam = qs.stringify(room);
        return axios.patch(`/api/subjects/${id}`, formParam, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    deleteSubject: (id) => {
        return axios.delete(`/api/subjects/${id}`);
    },
    getProfessors: (id) => {
        return axios.get(`/api/subjects/professors/${id}`);
    },
    addProfessor: (subjectId, professorId) => {
        const formParams = qs.stringify({
            subjectId: subjectId,
            professorId: professorId
        });
        return axios.post("/api/subjects/add/professor", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    removeProfessor: (subjectId, professorId) => {
        const formParams = qs.stringify({
            subjectId: subjectId,
            professorId: professorId
        });
        return axios.post("/api/subjects/remove/professor", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
};

export default SubjectsService;
