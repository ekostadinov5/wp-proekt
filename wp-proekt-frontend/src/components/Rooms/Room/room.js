import React, {useState} from 'react';
import {Modal, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

import AppContext from '../../../context/AppContext';

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
                        props.onDelete(props.id);}}>
                        Избриши
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Откажи
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const cardHeader = () => {
        return (
            <AppContext.Consumer>
                {context => (
                    <div className="card-header bg-info">
                        <div className="row">
                            <div className="col-5">
                                <h5>
                                    {props.value.name}
                                </h5>
                            </div>
                            {(() => {
                                if(context.role === 'admin') {
                                    return (
                                        <div className="col-7 text-right">
                                            <Link className="btn btn-light" title="Уреди" to={`/rooms/${props.id}/edit`}>
                                                <i className="fa fa-fw fa-edit"/>
                                            </Link>
                                            <Button variant="primary" onClick={handleShow} type={"button"}
                                                    className="btn btn-danger ml-1" title="Избриши">
                                                <i className="fa fa-fw fa-trash"/>
                                            </Button>
                                            {confirmModal()}
                                        </div>
                                    );
                                }
                            })()}
                        </div>
                    </div>
                )}
            </AppContext.Consumer>
        );
    };

    const cardBody = () => {
        return (
            <div className="card-body">
                <div className="card-text">
                    {props.value.description}
                </div>
            </div>
        );
    };

    return (
        <div className="col-lg-4 col-md-6 col-sm-12 mt-4 col-sm-12">
            <div className="card">
                {cardHeader()}
                {cardBody()}
            </div>
        </div>
    );
};

export default Room;
