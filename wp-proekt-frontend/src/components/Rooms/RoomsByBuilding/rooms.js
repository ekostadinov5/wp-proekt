import React, {useEffect} from 'react';
import Building from '../../Buildings/Building/building';
import {loadConsultations} from "../../../repository/consultationsRepository";
import {Link} from "react-router-dom";

const rooms = (props) => {
    
    const roomsByBuilding = () => {
        const data = props.rooms.reduce((acc, curr) => {
            if(!acc[curr.building.name]) {
                acc[curr.building.name] = {
                    building: curr.building,
                    rooms: []
                }
            }
            acc[curr.building.name].rooms.push({
                name: curr.name,
                description: curr.description
            });
            return acc;
        }, {});
        let i = 0;
        return Object.values(data).map(building =>
            <Building key={building.building.name} value={building} index={i++} 
                      onBuildingDelete={props.onBuildingDelete} onRoomDelete={props.onRoomDelete} />
        );
    }
    
    return (
        <div role="main" className="mt-3">
            <div className="container">
                <Link className={"btn btn-primary btn-lg rounded"} to={"/buildings/add"}>
                    <i className="fa fa-fw fa-plus mr-3"></i>
                    Додади група на простории
                </Link>
                <Link className={"btn btn-primary btn-lg rounded ml-5"} to={"/rooms/add"}>
                    <i className="fa fa-fw fa-plus mr-3"></i>
                    Додади просторија
                </Link>
                <div className={"row"}>
                    {roomsByBuilding()}
                </div>
            </div>
        </div>
    );
}

export default rooms;
