import axios from '../custom-axios/axios';
//import qs from 'qs';

const ProfessorsService = {
    fetchProfessors: () => {
        return axios.get("/api/professors", {
            headers: {
                'page': 0,
                'pageSize': 1000
            }
        });
    },
    fetchProfessorsPaged: (page, pageSize) => {
        return axios.get("/api/professors", {
            headers: {
                'page': page,
                'pageSize': pageSize
            }
        });
    },
    searchProfessors: (searchTerm) => {
        return axios.get(`/api/professors?term=${searchTerm}`);
    },
    fetchById : (id) => {
        return axios.get(`/api/professors/${id}`);
    }
};

export default ProfessorsService;