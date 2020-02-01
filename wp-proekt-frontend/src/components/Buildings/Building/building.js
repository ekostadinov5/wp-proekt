import React from 'react';
import Room from '../../Rooms/Room/room';

import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const building = (props) => {

    const rooms = () => {
        return props.value.rooms.map(room =>
            <Room key={room.name} value={room} onDelete={props.onRoomDelete} />
        );
    }

    const options = {
        title: 'Избриши',
        message: 'Дали сте сигурни? ' +
            '( ВАЖНО: Со ова ќе се избришат и сите простории кои се дел од оваа група на простории, како и и сите ' +
            'консултациски термини закажани во тие простории! )',
        buttons: [
            {
                label: 'Да',
                onClick: () => props.onBuildingDelete(props.value.building.name)
            },
            {
                label: 'Не',
            }
        ]
    }

    return (
        <div className="card room col-12 mt-3 mb-5">
            <div className="card-body">
                <h5>
                    {props.value.building.name}
                    <button className="btn btn-outline-info ml-3" type="button" data-toggle="collapse"
                            data-target={"#collapseBuilding" + props.index} aria-expanded="false"
                            aria-controls={"collapseBuilding" + props.index}>
                        <i className="fa fa-angle-down"></i>
                    </button>
                    <a href="#" className="btn btn-primary ml-2" title="Уреди">
                        <i className="fa fa-fw fa-edit"></i>
                    </a>
                    <a onClick={() => confirmAlert(options)} href="#"
                       className="btn btn-danger ml-2" title="Избриши">
                        <i className="fa fa-fw fa-trash"></i>
                    </a>
                </h5>
                <div className="collapse" id={"collapseBuilding" + props.index}>
                    {props.value.building.description}
                </div>
            </div>
            <div className="row card-body">
                {rooms()}
            </div>
        </div>
    );
}

export default building;
