import axios from '../custom-axios/axios';
import qs from 'qs';

const BuildingsService = {
    fetchBuildings: () => {
        return axios.get("/api/buildings");
    },
    fetchBuildingsOrdered: () => {
        return axios.get("/api/buildings/ordered");
    },
    fetchById: (id) => {
        return axios.get(`/api/buildings/${id}`);
    },
    addBuilding: (building) => {
        const formParams = qs.stringify(building);
        return axios.post("/api/buildings", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    updateBuilding: (building) => {
        const id = building.id;
        const formParams = qs.stringify(building);
        return axios.patch(`/api/buildings/${id}`, formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    deleteBuilding: (id) => {
        return axios.delete(`/api/buildings/${id}`);
    }
};

export default BuildingsService;
