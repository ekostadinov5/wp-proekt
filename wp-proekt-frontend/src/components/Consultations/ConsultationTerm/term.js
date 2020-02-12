import React, {useState} from 'react';
import Moment from 'react-moment';
import {Link} from "react-router-dom";

import AppContext from '../../../context/AppContext';
import {Button, Modal} from "react-bootstrap";

const Term = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const selectModal = () => {
        return (
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Избери предмет</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor={"subject"} className="font-weight-bold">Предмет:</label>
                        <select className="form-control" id="subject">
                            {props.professor.subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            <option value={"0"}>Останато</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor={"note"} className="font-weight-bold">Забелешка:</label>
                        <textarea className="form-control" rows={7} id="note"/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => {
                        handleClose();
                        props.onStudentAdded(props.value.id, props.student.index);}}>
                        Избери
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Откажи
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const termDayOrDate = () => {
        if(props.value.dayOfWeek) {
            return (
                <AppContext.Consumer>
                    {context => (
                        <div className="row">
                            <div className="col-md-6 font-weight-bold">Ден:</div>
                            <div className="col-md-6">{context.convertDay(props.value.dayOfWeek)}</div>
                        </div>
                    )}
                </AppContext.Consumer>
            );
        } else if(props.value.date) {
            return (
                <div className="row">
                    <div className="col-md-6 font-weight-bold">Датум:</div>
                    <div className="col-md-6">
                        <Moment parse={"YYYY-MM-DD"} format={"DD-MM-YYYY"}>
                            {props.value.date}
                        </Moment>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    };

    const termTime = () => {
        return (
            <div className="row">
                <div className="col-md-6 font-weight-bold">Време:</div>
                <div className="col-md-6">
                    <Moment parse={"hh:mm:ss"} format={"HH:mm"}>
                        {props.value.from}
                    </Moment>
                    -
                    <Moment parse={"hh:mm:ss"} format={"HH:mm"}>
                        {props.value.to}
                    </Moment>
                </div>
            </div>
        );
    };

    const termRoom = () => {
        return (
            <div className="row">
                <div className="col-md-6 font-weight-bold">Просторија:</div>
                <div className="col-md-6">
                    <Link onClick={() => {
                        document.getElementById("menu").childNodes.item(0).classList.remove("active");
                        document.getElementById("menu").childNodes.item(1).classList.add("active");
                    }}
                          to={"/rooms"}>
                        {props.value.room.name}
                    </Link>
                </div>
            </div>
        );
    };

    const isAddedInStudentsList = () => {
        let exists = false;
        props.studentSlotIds.forEach(id => {
            if(id === props.value.id) {
                exists = true;
            }
        });
        return exists;
    };

    const addRemoveButtonClick = () => {
        if(!isAddedInStudentsList()) {
            handleShow();
        } else {
            props.onStudentRemoved(props.value.id, props.student.index)
        }
    };

    const addRemoveButton = () => {
        if(!isAddedInStudentsList()) {
            return (
                <button onClick={addRemoveButtonClick} className="btn btn-outline-success mt-3" title="Пријави се">
                    <i className="fa fa-plus"/>
                </button>
            );
        } else {
            return (
                <button onClick={addRemoveButtonClick} className="btn btn-danger mt-3" title="Откажи се">
                    <i className="fa fa-times"/>
                </button>
            );
        }
    };

    return (
        <AppContext.Consumer>
            {context => (
                <div>
                    {termDayOrDate()}
                    {termTime()}
                    {termRoom()}
                    {(() => {
                        if(context.role === 'student') {
                            return (
                                <>
                                    {addRemoveButton()}
                                    {selectModal()}
                                </>
                            );
                        }
                    })()}
                    <hr />
                </div>
            )}
        </AppContext.Consumer>
    );
};

export default Term;
