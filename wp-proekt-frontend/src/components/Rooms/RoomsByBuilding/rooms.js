import React, {useEffect} from 'react';
import Building from '../../Buildings/Building/building';
import {loadConsultations} from "../../../repository/consultationsRepository";
import {Link} from "react-router-dom";

const Rooms = (props) => {

    const getBuilding = (buildingName) => {
        return props.buildings.find(b => b.name === buildingName);
    }

    const roomsByBuilding = () => {
        const data = props.rooms.reduce((acc, curr) => {
            if(!acc[curr.building.name]) {
                acc[curr.building.name] = {
                    buildingName: curr.building.name,
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
        return Object.values(data).sort((b1, b2) => (b1.buildingName > b2.buildingName) ? 1 : -1)
            .map(b => <Building key={b.buildingName} building={getBuilding(b.buildingName)} rooms={b.rooms}
                      index={i++} onBuildingDelete={props.onBuildingDelete} onRoomDelete={props.onRoomDelete} />
        );
    }
    
    return (
        <div role="main" className="mt-3">
            <div className="container">
                <Link className={"btn btn-primary btn-lg rounded mt-2"} to={"/buildings/add"}>
                    <i className="fa fa-fw fa-plus mr-3"></i>
                    Додади група на простории
                </Link>
                <Link className={"btn btn-primary btn-lg rounded ml-5 mt-2"} to={"/rooms/add"}>
                    <i className="fa fa-fw fa-plus mr-3"></i>
                    Додади просторија
                </Link>
                <div className={"row mt-2"}>
                    {roomsByBuilding()}
                </div>
            </div>
        </div>
    );
}

export default Rooms;
