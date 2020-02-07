import React from 'react';
import Moment from 'react-moment';
import {Link} from "react-router-dom";

import AppContext from '../../../context/AppContext';

const Term = (props) => {

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
            props.onStudentAdded(props.value.id, props.student.index);
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
                            return addRemoveButton();
                        }
                    })()}
                    <hr />
                </div>
            )}
        </AppContext.Consumer>
    );
};

export default Term;
