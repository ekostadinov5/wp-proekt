import React, {useEffect, useState} from 'react';
import Moment from 'react-moment';
import {Link} from "react-router-dom";

import AppContext from '../../../context/AppContext';
import {Button, Modal} from "react-bootstrap";
import moment from "moment";

const Term = (props) => {

    const [addedOrRemoved, setAddedOrRemoved] = useState(null);
    const [show, setShow] = useState(false);
    
    useEffect(() => {
        let exists = false;
        if(props.value.dayOfWeek) {
            const termsIds = props.value.slots.map(t => t.id);
            props.studentSlotIds.forEach(studentSlotId => {
                termsIds.forEach(termId => {
                    if(studentSlotId === termId) {
                        exists = true;
                    }
                });
            });
        } else {
            props.studentSlotIds.forEach(studentSlotId => {
                if(studentSlotId === props.value.id) {
                    exists = true;
                }
            });
        }
        setAddedOrRemoved(exists);
    }, [props.studentSlotIds, props.value.dayOfWeek, props.value.id, props.value.slots]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const selectModal = () => {
        return (
            <AppContext.Consumer>
                {context => (
                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Предмет</Modal.Title>
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
                                <label htmlFor={"dayOrDate"} className="font-weight-bold">Датум:</label>
                                {(() => {
                                    if(props.value.dayOfWeek) {
                                        const uncanceledTerms = props.value.slots.filter(t => t.cancel !== true);
                                        return (
                                            <select id={'dayOrDate'}
                                                    className="form-control">
                                                {uncanceledTerms.map(t =>
                                                    <option key={t.id} value={t.id}>
                                                        {moment(t.date).format("DD-MM-YYYY")}
                                                    </option>)}
                                            </select>
                                        );
                                    } else {
                                        return (
                                            <input id={'dayOrDate'}
                                                   className={'form-control'}
                                                   value={context.convertDateFormat(props.value.date)}
                                                   disabled={true} />
                                        );
                                    }
                                })()}
                            </div>
                            <div className="form-group">
                                <label htmlFor={"note"} className="font-weight-bold">Забелешка:</label>
                                <textarea className="form-control" rows={7} id="note"/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={() => {
                                const subjectId = document.getElementById("subject").value;
                                const termId = document.getElementById("dayOrDate").value;
                                const note = document.getElementById("note").value;
                                props.onStudentAdded(props.value.dayOfWeek ? termId : props.value.id, props.student.index, subjectId, note);
                                handleClose();}}>
                                Потврди
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Откажи
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </AppContext.Consumer>
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

    const isCanceled = () => {
        if(props.value.dayOfWeek) {
            const canceledTerms = props.value.slots.filter(t => t.cancel === true);
            if(canceledTerms.length > 0) {
                return (
                    <div className="mt-2">
                        <div style={{color: 'red'}}>
                            <div>
                                <strong>Откажани термини:</strong>
                            </div>
                            {canceledTerms.map(t => <div key={t.id}>{moment(t.date).format("DD-MM-YYYY")}</div>)}
                        </div>
                    </div>
                );
            }
        }
    };

    const addedDate = () => {
        if(props.value.dayOfWeek) {
            const addedTerm = props.value.slots.find(t => props.studentSlotIds.includes(t.id));
            const canceledTermsIds = props.value.slots.filter(t => t.cancel === true).map(t => t.id);
            if(addedTerm && !canceledTermsIds.includes(addedTerm.id)) {
                return (
                    <div className="mt-2">
                        <div style={{color: 'green'}}>
                            <div>
                                <strong>Пријавен за: </strong>
                                {moment(addedTerm.date).format("DD-MM-YYYY")}
                            </div>
                        </div>
                    </div>
                );
            }
        }
    };

    const addRemoveButtonClick = () => {
        if(!addedOrRemoved) {
            handleShow();
        } else {
            if(props.value.dayOfWeek) {
                const termsIds = props.value.slots.map(t => t.id);
                let addedTermId = null;
                props.studentSlotIds.forEach(studentSlotId => {
                    termsIds.forEach(termId => {
                        if(studentSlotId === termId) {
                            addedTermId = termId;
                        }
                    });
                });
                props.onStudentRemoved(addedTermId, props.student.index)
            } else {
                props.onStudentRemoved(props.value.id, props.student.index)
            }
        }
    };

    const addRemoveButton = () => {
        if(!addedOrRemoved) {
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
                    {isCanceled()}
                    {(() => {
                        if(context.role === 'student' && !props.value.cancel) {
                            return (
                                <>
                                    {addedDate()}
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
