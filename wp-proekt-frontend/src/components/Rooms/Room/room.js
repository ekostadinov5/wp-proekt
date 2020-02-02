import React, {useState} from 'react';
import {Modal, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const Room = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const confirmModal = () => {
        return (
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.value.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Дали сте сигурни?! ( ВАЖНО: Со ова ќе се избришат и сите консултациски термини закажани во
                    дадената просторија! )</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        handleClose();
                        props.onNewRoomAdded(props.value.name);}}>
                        Избриши
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Откажи
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const cardHeader = () => {
        return (
            <div className="card-header">
                <div className="row">
                    <div className="col-5">
                        <h5>
                            {props.value.name}
                        </h5>
                    </div>
                    <div className="col-7 text-right">
                        <Link className="btn btn-primary" title="Уреди" to={`/rooms/${props.value.name}/edit`}>
                            <i className="fa fa-fw fa-edit"></i>
                        </Link>
                        <Button variant="primary" onClick={handleShow} type={"button"}
                                className="btn btn-danger ml-1" title="Избриши">
                            <i className="fa fa-fw fa-trash"></i>
                        </Button>
                        {confirmModal()}
                    </div>
                </div>
            </div>
        );
    }

    const cardBody = () => {
        return (
            <div className="card-body">
                <div className="card-text">
                    {props.value.description}
                </div>
            </div>
        );
    }

    return (
        <div className="col-lg-4 col-md-6 col-sm-12 mt-2 col-sm-12">
            <div className="card">
                {cardHeader()}
                {cardBody()}
            </div>
        </div>
    );
}

export default Room;
