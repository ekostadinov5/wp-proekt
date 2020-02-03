import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import Moment from "react-moment";

const ProfessorConsultationTerm = (props) => {

    const termDayOrDate = () => {
        if(props.value.dayOfWeek) {
            return (
                <div className="row">
                    <div className="col-md-6 font-weight-bold">Ден:</div>
                    <div className="col-md-6">{props.value.dayOfWeek}</div>
                </div>
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

    return (
        <div className="col-lg-6 col-md-12 col-sm-12 mt-5">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-7">
                            {termDayOrDate()}
                            {termTime()}
                            {termRoom()}
                        </div>
                        <div className="col-md-5 mt-3">
                            <Link className="btn btn-primary btn-lg ml-2" title="Промени"
                                  to={``}>
                                <i className="fa fa-fw fa-edit" />
                            </Link>
                            <Button variant="primary" onClick={0} type={"button"}
                                    className="btn btn-danger btn-lg ml-2" title="Избриши">
                                <i className="fa fa-fw fa-trash" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="card-text">
                        <div className="students">
                            <h5>Студенти (?)</h5>
                            <ul>
                                <li>Petko Petkov (123456)</li>
                                <li>Petko Petkov (123456)</li>
                                <li>Petko Petkov (123456)</li>
                                <li>Petko Petkov (123456)</li>
                                <li>Petko Petkov (123456)</li>
                                <li>Petko Petkov (123456)</li>
                            </ul>
                            <nav aria-label="Page navigation example" className="mt-5">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item"><a className="page-link"
                                                                 href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">2</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">3</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfessorConsultationTerm;