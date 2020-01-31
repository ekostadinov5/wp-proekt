import React from 'react';
import Moment from 'react-moment';

const term = (props) => {

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
                    <div className="col-md-6 font-weight-bold"> Датум:</div>
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
    }

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
    }

    const termRoom = () => {
        return (
            <div className="row">
                <div className="col-md-6 font-weight-bold"> Просторија:</div>
                <div className="col-md-6">
                    <a href="/Home/Rooms">Канцеларија во Анекс</a>
                </div>
            </div>
        );
    }

    return (
        <div className="consultations">
            {termDayOrDate()}
            {termTime()}
            {termRoom()}

            <a href="#" className="btn btn-light" title="Откажи">
                <i className="fa fa-arrow-circle-left"></i>
            </a>

            <hr />
        </div>
    );
}

export default term;
