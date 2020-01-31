import React from 'react';
import Room from '../Rooms/room';

const building = (props) => {

    const rooms = () => {
        return props.value.rooms.map(room =>
            <Room key={room.name} value={room} />
        );
    }

    return (
        <div className="room col-lg-6 col-md-12 mt-3 mb-5">
            <div className="card-body">
                <h5>
                    {props.value.building.name}
                    <button className="btn ml-3" type="button" data-toggle="collapse"
                            data-target={"#collapseExample" + props.index} aria-expanded="false"
                            aria-controls={"collapseExample" + props.index}>
                        <i className="fa fa-angle-down"></i>
                    </button>
                </h5>
                <div className="collapse" id={"collapseExample" + props.index}>
                        {props.value.building.description}
                </div>
            </div>
            <div className="row">
                {rooms()}
            </div>
        </div>
    );
}

export default building;
