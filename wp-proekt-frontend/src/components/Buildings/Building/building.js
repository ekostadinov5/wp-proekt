import React, {useState} from 'react';
import {Modal, Button} from "react-bootstrap";
import Room from '../../Rooms/Room/room';

const Building = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const confirmModal = () => {
        return (
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.value.building.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Дали сте сигурни?! ( ВАЖНО: Со ова ќе се избришат и сите простории кои се дел од оваа група
                    на простории, како и сите консултациски термини закажани во тие простории! )</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        handleClose();
                        props.onNewBuildingAdded(props.value.building.name);}}>
                        Избриши
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Откажи
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const rooms = () => {
        return props.value.rooms.map(room =>
            <Room key={room.name} value={room} onDelete={props.onRoomDelete} />
        );
    }

    return (
        <div className="card room col-12 mt-3 mb-5">
            <div className="card-body">
                <h2>
                    {props.value.building.name}
                    <button className="btn btn-outline-info btn-lg ml-3" type="button" data-toggle="collapse"
                            data-target={"#collapseBuilding" + props.index} aria-expanded="false"
                            aria-controls={"collapseBuilding" + props.index}>
                        <i className="fa fa-angle-down"></i>
                    </button>
                    <a href="#" className="btn btn-primary btn-lg ml-2" title="Уреди">
                        <i className="fa fa-fw fa-edit"></i>
                    </a>
                    <Button variant="primary" onClick={handleShow} type={"button"}
                            className="btn btn-danger btn-lg ml-2" title="Избриши">
                        <i className="fa fa-fw fa-trash"></i>
                    </Button>
                    {confirmModal()}
                </h2>
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

export default Building;
