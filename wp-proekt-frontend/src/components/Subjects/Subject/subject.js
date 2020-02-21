import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";

const Subject = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const confirmModal = () => {
        return (
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.value.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Дали сте сигурни?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        handleClose();
                        props.onDelete(props.value.id);}}>
                        Избриши
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Откажи
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    return(
        <div className="col-lg-4 col-md-6 col-sm-12 mt-4">
            <div className="card-body border border-info">
                <div className="row">
                    <div className="col-6 pt-3">
                        <h6 title={props.value.shortName}>
                            {props.value.name}
                        </h6>
                    </div>
                    <div className="col-6 text-right">
                        <Link className="btn btn-success mt-1" title="Додади професор"
                              to={`/subjects/${props.value.id}/add/professor`}>
                            <i className="fa fa-fw fa-plus"/>
                        </Link>
                        <Link className="btn btn-danger mt-1 ml-1" title="Отстрани професор"
                              to={`/subjects/${props.value.id}/remove/professor`}>
                            <i className="fa fa-fw fa-times"/>
                        </Link>
                        <Link className="btn btn-primary mt-1 ml-1" title="Уреди"
                              to={`/subjects/${props.value.id}/edit`}>
                            <i className="fa fa-fw fa-edit"/>
                        </Link>
                        <Button variant="primary" onClick={handleShow} type={"button"}
                                className="btn btn-danger mt-1 ml-1" title="Избриши">
                            <i className="fa fa-fw fa-trash"/>
                        </Button>
                        {confirmModal()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subject;
