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
    const [pageSize, setPageSize] = useState(7); // 5 ili 7
    const [totalPages, setTotalPages] = useState(0);

    const fetchStudents = useCallback((page = 0) => {
        StudentsService.fetchStudentsBySlotId(props.value.id, page, pageSize).then((promise) => {
            setStudents(promise.data.content);
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
                <ReactPaginate previousLabel={"претходна"}
                               nextLabel={"следна"}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={totalPages}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
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
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const confirmModal = () => {
        return (
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Избриши</Modal.Title>
                </Modal.Header>
                <Modal.Body>Дали сте сигурни дека сакате да го избришете консултацискиот термин?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        handleClose();
                        props.onTermDeleted(props.value.id);}}>
                        Избриши
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Откажи
                    </Button>
                </Modal.Footer>
            </Modal>
        );
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
                        <Link className="btn btn-primary btn-lg ml-2" title="Промени"
                              to={`/consultations/${props.value.id}/edit`}>
                            <i className="fa fa-fw fa-edit" />
                        </Link>
                        <Button variant="primary" onClick={handleShow} type={"button"}
                                className="btn btn-danger btn-lg ml-2" title="Избриши">
                            <i className="fa fa-fw fa-trash" />
                        </Button>
                        {confirmModal()}
                    </div>
                </div>
            </div>
        );
    };

    const cardBody = () => {
        return (
            <div className="card-body">
                <div className="card-text">
                    <div className="students">
                        <h5>Студенти ({totalStudentsCount})</h5>
                        <ul className={"mt-4 mb-4"}>
                            {students.map(s => <li key={s.index}>{s.firstName} {s.lastName} ({s.index})</li>)}
                        </ul>
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
