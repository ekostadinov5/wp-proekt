import axios from '../custom-axios/axios';
import qs from 'qs';

const ProfessorsService = {
    fetchProfessors: () => {
        return axios.get("/api/professors");
    },
    fetchProfessorsPaged: (page, pageSize) => {
        return axios.get("/api/professors", {
            headers: {
                'page': page,
                'pageSize': pageSize
            }
        });
    }
}

export default ProfessorsService;