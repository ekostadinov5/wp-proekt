import axios from '../custom-axios/axios';
import qs from 'qs';

const BuildingsService = {
    fetchBuildings: () => {
        return axios.get("/api/buildings");
    },
    fetchBuildingsOrdered: () => {
        return axios.get("/api/buildings/ordered");
    },
    fetchByName: (name) => {
        return axios.get(`/api/buildings/${name}`);
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
        const name = building.name;
        const formParams = qs.stringify(building);
        return axios.patch(`/api/buildings/${name}`, formParams, {
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
