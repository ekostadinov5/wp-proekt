import React, {useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import Moment from "react-moment";
import StudentsService from '../../../repository/axiosStudentsRepository';
import ReactPaginate from "react-paginate";

import AppContext from '../../../context/AppContext';

const ProfessorConsultationTerm = (props) => {

    const [students, setStudents] = useState([]);
    const [totalStudentsCount, setTotalStudentsCount] = useState(null);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(1); // 1 ili 7?
    const [totalPages, setTotalPages] = useState(0);

    const fetchStudents = useCallback((page = 0) => {
        StudentsService.fetchStudentsBySlotId(props.value.id, page, pageSize).then((promise) => {
            const students = promise.data.content.map(student => {
                const studentSlot = student.slots.find(slot => slot.consultationSlot.id === props.value.id);
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
    }, [props.value.id, pageSize]);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

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
            <AppContext.Consumer>
                {context => (
                    <Modal show={showCancel} onHide={handleCloseCancel} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Откажи</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Дали сте сигурни дека сакате да го откажете овој консултациски термин за тековната недела?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={() => {
                                handleCloseCancel();
                                props.onTermCanceled(props.value.id);}}>
                                Откажи
                            </Button>
                            <Button variant="secondary" onClick={handleCloseCancel}>
                                Назад
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </AppContext.Consumer>
        ) : null;
    };
    //

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
                        {termTime()}
                        {termRoom()}
                    </div>
                    <div className="col-md-5 mt-3">
                        {(() => {
                            if(props.value.dayOfWeek) {
                                if(!props.value.cancel) {
                                    return (
                                        <>
                                            <Button variant="primary" onClick={handleShowCancel} type={"button"}
                                                    className="btn btn-danger ml-2" title="Откажи">
                                                <i className="fa fa-fw fa-times" />
                                            </Button>
                                            {confirmCancelModal()}
                                        </>
                                    );
                                } else {
                                    return (
                                        <>
                                            <Button variant="primary"
                                                    onClick={() => props.onTermUncanceled(props.value.id)}
                                                    type={"button"}
                                                    className="btn btn-success ml-2" title="Врати назад">
                                                <i className="fa fa-fw fa-undo" />
                                            </Button>
                                        </>
                                    );
                                }
                            }
                        })()}
                        <Link className="btn btn-primary ml-2" title="Промени"
                              to={`/consultations/${props.value.id}/edit`}>
                            <i className="fa fa-fw fa-edit" />
                        </Link>
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
            <div className="col-lg-6 col-md-12 col-sm-12 mt-5">
                <div className="professorTerms card">
                    {cardHeader()}
                    {cardBody()}
                </div>
            </div>
            : null
    );
};

export default ProfessorConsultationTerm;
