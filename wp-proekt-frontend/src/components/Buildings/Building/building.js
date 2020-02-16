import React, {useState} from 'react';
import {Modal, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import Room from '../../Rooms/Room/room';

import AppContext from '../../../context/AppContext';

const Building = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const confirmModal = () => {
        return (
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.building.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Дали сте сигурни?! ( ВАЖНО: Со ова ќе се избришат и сите простории кои се дел од оваа група
                    на простории, како и сите консултациски термини закажани во тие простории! )</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        handleClose();
                        props.onBuildingDelete(props.id);}}>
                        Избриши
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Откажи
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const rooms = () => {
        return props.rooms.sort((r1, r2) => (r1.name > r2.name) ? 1 : -1)
            .map(room => <Room key={room.id} id={room.id} value={room} onDelete={props.onRoomDelete} />
        );
    };

    return (
        <AppContext.Consumer>
            {context => (
                <div className="card col-12 mt-5 mb-3">
                    <div className="card-body">
                        <h2>
                            {props.building.name}
                            <button className="btn btn-outline-info btn-lg ml-3" type="button" data-toggle="collapse"
                                    data-target={"#collapseBuilding" + props.id} aria-expanded="false"
                                    aria-controls={"collapseBuilding" + props.id} title={"Повеќе..."}>
                                <i className="fa fa-angle-down" />
                            </button>
                            {(() => {
                                if(context.role === 'admin') {
                                    return (
                                        <>
                                            <Link className="btn btn-primary btn-lg ml-2" title="Уреди"
                                                  to={`/buildings/${props.id}/edit`}>
                                                <i className="fa fa-fw fa-edit" />
                                            </Link>
                                            <Button variant="primary" onClick={handleShow} type={"button"}
                                                    className="btn btn-danger btn-lg ml-2" title="Избриши">
                                                <i className="fa fa-fw fa-trash" />
                                            </Button>
                                            {confirmModal()}
                                        </>
                                    );
                                }
                            })()}
                        </h2>
                        <div className="collapse col-md-8 m-auto" id={"collapseBuilding" + props.id}>
                            {props.building.description}
                        </div>
                    </div>
                    <div className="row card-body">
                        {rooms()}
                    </div>
                </div>
            )}
        </AppContext.Consumer>
    );
};

export default Building;
