import React from 'react';
import Building from '../../Buildings/Building/building';
//import {loadConsultations} from "../../../repository/consultationsRepository";
import {Link} from "react-router-dom";

import AppContext from '../../../context/AppContext';

const Rooms = (props) => {
    
    const roomsByBuilding = () => {
        return props.buildings.sort((b1, b2) => (b1.name > b2.name) ? 1 : -1).map(b =>
            <Building key={b.id} id={b.id} building={b} rooms={props.rooms.filter(r => r.building.id === b.id)}
                      onBuildingDelete={props.onBuildingDelete} onRoomDelete={props.onRoomDelete} />);
    };
    
    return (
        <AppContext.Consumer>
            {context => (
                <div role="main" className="mt-3">
                    <div className="container">
                        {(() => {
                            if(context.role === 'admin') {
                                return (
                                    <>
                                        <Link className={"btn btn-success btn-lg rounded mt-2"} to={"/buildings/add"}>
                                            <i className="fa fa-fw fa-plus mr-3"/>
                                            Додади група на простории
                                        </Link>
                                        <Link className={"btn btn-success btn-lg rounded ml-5 mt-2"} to={"/rooms/add"}>
                                            <i className="fa fa-fw fa-plus mr-3"/>
                                            Додади просторија
                                        </Link>
                                    </>
                                );
                            }
                        })()}
                        <div className={"row mt-2"}>
                            {roomsByBuilding()}
                        </div>
                    </div>
                </div>
            )}
        </AppContext.Consumer>
    );
};

export default Rooms;
