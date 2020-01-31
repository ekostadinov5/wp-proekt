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
            <div className="card card-body">
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
                <div className={"mt-3"}>
                    <button className="btn btn-primary rounded ml-3">
                        <i className="fa fa-fw fa-plus mr-3"></i>
                        Додади просторија
                    </button>
                    <a href="#" className="btn btn-primary ml-1" title="Уреди">
                        <i className="fa fa-fw fa-edit"></i>
                    </a>
                    <a href="#" className="btn btn-danger ml-1" title="Избриши">
                        <i className="fa fa-fw fa-trash"></i>
                    </a>
                </div>
            </div>
            <div className="row">
                {rooms()}
            </div>
        </div>
    );
}

export default building;
