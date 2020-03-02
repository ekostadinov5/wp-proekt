import axios from '../custom-axios/axios';
import qs from 'qs';

const TermsService = {
    fetchById: (termId) => {
        return axios.get(`/api/terms/${termId}`);
    },
    addWeeklyConsultationTerm: (term) => {
        const formParams = qs.stringify(term);
        return axios.post('/api/terms', formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    updateWeeklyConsultationTerm: (term) => {
        const id = term.id;
        const formParams = qs.stringify(term);
        return axios.patch(`/api/terms/${id}`, formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    deleteWeeklyConsultationTerm: (id) => {
        return axios.delete(`/api/terms/${id}`);
    }
};

export default TermsService;
