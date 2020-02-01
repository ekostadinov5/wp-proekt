import axios from '../custom-axios/axios';
import qs from 'qs';

const BuildingsService = {
    deleteBuilding: (name) => {
        return axios.delete(`/api/buildings/${name}`);
    }
}

export default BuildingsService;
