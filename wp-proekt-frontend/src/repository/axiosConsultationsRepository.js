import axios from '../custom-axios/axios';
import qs from 'qs';

const ConsultationsService = {
    fetchById: (slotId) => {
        return axios.get(`/api/consultations/${slotId}`);
    },
    addConsultationSlot: (slot) => {
        const formParams = qs.stringify(slot);
        return axios.post('/api/consultations', formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    updateConsultationSlot: (slot) => {
        const id = slot.id;
        const formParams = qs.stringify(slot);
        return axios.patch(`/api/consultations/${id}`, formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    deleteConsultationSlot: (id) => {
        return axios.delete(`/api/consultations/${id}`);
    }
};

export default ConsultationsService;
