import React, {useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import Moment from "react-moment";
import StudentsService from '../../../repository/axiosStudentsRepository';
import ReactPaginate from "react-paginate";
import moment from 'moment';

import AppContext from '../../../context/AppContext';

const ProfessorConsultationTerm = (props) => {

    const [term, setTerm] = useState(null);
    const [students, setStudents] = useState([]);
    const [totalStudentsCount, setTotalStudentsCount] = useState(null);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(1); // 1 ili 7?
    const [totalPages, setTotalPages] = useState(0);

    const fetchStudents = useCallback((page = 0) => {
        StudentsService
            .fetchStudentsBySlotId(props.value.dayOfWeek ? (term ? term.id : props.value.slots[0].id) : props.value.id, page, pageSize)
                .then((promise) => {
                    const students = promise.data.content.map(student => {
                        const studentSlot = student.slots
                            .find(slot => slot.consultationSlot.id === (props.value.dayOfWeek ? (term ? term.id : props.value.slots[0].id) : props.value.id));
                        return {
                            index: student.index,
                            firstName: student.firstName,
                            lastName: student.lastName,
                            subjectName: studentSlot.subject ? studentSlot.subject.name : "Останато",
                            subjectShortName: studentSlot.subject ? studentSlot.subject.shortName : "/",
                            note: studentSlot.note
                        }
                    });
                    setStudents(students);
                    setTotalStudentsCount(promise.data.totalElements);
                    setPage(promise.data.number);
                    setPageSize(promise.data.size);
                    setTotalPages(promise.data.totalPages);
                });
    }, [term, pageSize, props.value.dayOfWeek, props.value.id, props.value.slots]);

    useEffect(() => {
        if(props.value.dayOfWeek) {
            let newTerm = props.value.slots[0];
            if(term) {
                newTerm = props.value.slots.find(t => t.id === term.id);
            }
            setTerm(newTerm);
        }
        fetchStudents();
    }, [term, props.value.dayOfWeek, props.value.slots, fetchStudents]);

    // Pagination of students
    const handlePageClick = (e) => {
        fetchStudents(e.selected);
    };

    const pagination = () => {
        if (totalPages !== 0) {
            return (
                <ReactPaginate previousLabel={"<"}
                               nextLabel={">"}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={totalPages}
                               marginPagesDisplayed={1}
                               pageRangeDisplayed={2}
                               pageClassName={"page-item"}
                               pageLinkClassName={"btn page-link"}
                               previousClassName={"page-item"}
                               nextClassName={"page-item"}
                               previousLinkClassName={"btn page-link"}
                               nextLinkClassName={"btn page-link"}
                               forcePage={page}
                               onPageChange={handlePageClick}
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"}
                               className={"d-block"}/>
            )
        }
    };
    //

    // For showing delete confirm message
    const [showDelete, setShowDelete] = useState(false);
    const [showCancel, setShowCancel] = useState(false);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const handleCloseCancel = () => setShowCancel(false);
    const handleShowCancel = () => setShowCancel(true);

    const confirmDeleteModal = () => {
        return (
            <Modal show={showDelete} onHide={handleCloseDelete} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Избриши</Modal.Title>
                </Modal.Header>
                <Modal.Body>Дали сте сигурни дека сакате да го избришете консултацискиот термин?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        handleCloseDelete();
                        props.onTermDeleted(props.value.id);}}>
                        Избриши
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Назад
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const confirmCancelModal = () => {
        return props.value.dayOfWeek ? (
            <Modal show={showCancel} onHide={handleCloseCancel} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Откажи</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Дали сте сигурни дека сакате да го откажете консултацискиот термин на
                    датум {moment(term.date).format("DD/MM/YYYY")}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        handleCloseCancel();
                        props.onTermCanceled(term.id);}}>
                        Откажи
                    </Button>
                    <Button variant="secondary" onClick={handleCloseCancel}>
                        Назад
                    </Button>
                </Modal.Footer>
            </Modal>
        ) : null;
    };
    //

    const onDateChange = (e) => {
        const value = parseInt(e.target.value);
        const selectedTerm = props.value.slots.find(t => t.id === value);
        setTerm(selectedTerm);
        StudentsService
            .fetchStudentsBySlotId(value, page, pageSize)
            .then((promise) => {
                const students = promise.data.content.map(student => {
                    const studentSlot = student.slots
                        .find(slot => slot.consultationSlot.id === value);
                    return {
                        index: student.index,
                        firstName: student.firstName,
                        lastName: student.lastName,
                        subjectName: studentSlot.subject ? studentSlot.subject.name : "Останато",
                        subjectShortName: studentSlot.subject ? studentSlot.subject.shortName : "/",
                        note: studentSlot.note
                    }
                });
                setStudents(students);
                setTotalStudentsCount(promise.data.totalElements);
                setPage(promise.data.number);
                setPageSize(promise.data.size);
                setTotalPages(promise.data.totalPages);
            });
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
                        document.getElementById("menu").childNodes.item(2).classList.remove("active");
                        document.getElementById("menu").childNodes.item(1).classList.add("active");
                    }}
                          to={"/rooms"}>
                        {props.value.room.name}
                    </Link>
                </div>
            </div>
        );
    };

    const cardHeader = () => {
        return (
            <div className="card-header">
                <div className="row">
                    <div className="col-md-7">
                        {termDayOrDate()}
                        {(() => {
                            return props.value.dayOfWeek ? (
                                <div className="row">
                                    <div className="col-md-6 font-weight-bold">Датум:</div>
                                    <div className="col-md-6">
                                        <select onChange={onDateChange}
                                                className="form-control-sm border-0 bg-light"
                                                value={term.id}>
                                            {props.value.slots.map(s => {
                                                return (
                                                    <option key={s.id} value={s.id}>
                                                        {moment(s.date).format("DD/MM/YYYY")}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            ) : null;
                        })()}
                        {termTime()}
                        {termRoom()}
                    </div>
                    <div className="col-md-5 mt-3">
                        {(() => {
                            if(props.value.dayOfWeek) {
                                if(!term.cancel) {
                                    return (
                                        <>
                                            <Button variant="primary" onClick={handleShowCancel} type={"button"}
                                                    className="btn btn-danger ml-2 mt-1" title="Откажи">
                                                <i className="fa fa-fw fa-times" />
                                            </Button>
                                            {confirmCancelModal()}
                                        </>
                                    );
                                } else {
                                    return (
                                        <>
                                            <Button variant="primary"
                                                    onClick={() => props.onTermUncanceled(term.id)}
                                                    type={"button"}
                                                    className="btn btn-success ml-2 mt-1" title="Врати назад">
                                                <i className="fa fa-fw fa-undo" />
                                            </Button>
                                        </>
                                    );
                                }
                            }
                        })()}
                        {(() => {
                            if(props.value.dayOfWeek) {
                                return (
                                    <Link className="btn btn-primary ml-2 mt-1" title="Промени"
                                          to={`/consultations/weekly/${props.value.id}/edit`}>
                                        <i className="fa fa-fw fa-edit" />
                                    </Link>
                                );
                            } else {
                                return (
                                    <Link className="btn btn-primary ml-2 mt-1" title="Промени"
                                          to={`/consultations/date/${props.value.id}/edit`}>
                                        <i className="fa fa-fw fa-edit" />
                                    </Link>
                                );
                            }
                        })()}
                        <Button variant="primary" onClick={handleShowDelete} type={"button"}
                                className="btn btn-danger ml-2 mt-1" title="Избриши">
                            <i className="fa fa-fw fa-trash" />
                        </Button>
                        {confirmDeleteModal()}
                    </div>
                </div>
                <hr />
                <h4>Студенти ({totalStudentsCount})</h4>
            </div>
        );
    };

    const cardBody = () => {
        return (
            <div className="card-body students">
                <div className="card-text">
                    <div>
                        <div className={"mb-4"}>
                            {students.map(s => {
                                return (
                                    <div key={s.index}>
                                        <div className="card-body">
                                            <h5 className="card-title">{s.firstName} {s.lastName} - {s.index}</h5>
                                            <h6 className="card-text">{s.subjectName}</h6>
                                        </div>
                                        <div className='note'>
                                            <p className="card-text">{s.note}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={"studentsPagination"}>
                            {pagination()}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        (totalStudentsCount !== null) ?
            <div className="col-lg-6 col-md-12 col-sm-12 mt-4">
                <div className="professorTerms card">
                    {cardHeader()}
                    {cardBody()}
                </div>
            </div>
            : null
    );
};

export default ProfessorConsultationTerm;
