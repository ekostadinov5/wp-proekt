import React from 'react';
import Moment from 'react-moment';
import {Link} from "react-router-dom";

const Term = (props) => {

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
        <div className="consultations">
            {termDayOrDate()}
            {termTime()}
            {termRoom()}
            <a href="#" className="btn btn-outline-success mt-3" title="Додади се">
                <i className="fa fa-plus"/>
            </a>

            <hr />
        </div>
    );
};

export default Term;
