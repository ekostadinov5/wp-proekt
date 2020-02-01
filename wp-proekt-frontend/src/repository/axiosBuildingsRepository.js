import axios from '../custom-axios/axios';
import qs from 'qs';

const BuildingsService = {
    fetchBuildingsSorted: () => {
        return axios.get("/api/buildings");
    },
    addBuilding: (building) => {
        const formParams = qs.stringify(building);
        return axios.post("/api/buildings", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    deleteBuilding: (name) => {
        return axios.delete(`/api/buildings/${name}`);
    }
}

export default BuildingsService;
