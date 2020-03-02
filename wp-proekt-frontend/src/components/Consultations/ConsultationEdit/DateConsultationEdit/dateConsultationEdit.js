import React, {useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import TimeField from "react-simple-timefield";
import {useHistory, useParams} from "react-router-dom";
import ConsultationsService from '../../../../repository/axiosConsultationsRepository';
import moment from 'moment';

const DateConsultationEdit = (props) => {

    const [term, setTerm] = useState({});
    const [date, setDate] = useState(null);
    const [dateTimeErrorMsg, setDateTimeErrorMsg] = useState('');
    const [timeErrorMsg, setTimeErrorMsg] = useState('');

    const {slotId} = useParams();

    useEffect(() => {
        ConsultationsService.fetchById(slotId).then((promise) => {
            setTerm({
                buildingId: promise.data.room.building.id,
                roomId: promise.data.room.id,
                dayOfWeek: promise.data.dayOfWeek,
                from: promise.data.from,
                to: promise.data.to
            });
            setDate(new Date(promise.data.date));
        });
    }, [slotId]);

    const history = useHistory();

    const validate = (e) => {
        let result = true;

        const hoursFromInMs = e.target.from.value.split(':')[0] * 1000 * 60 * 60;
        const minutesFromInMs = e.target.from.value.split(':')[1] * 1000 * 60;
        const hoursToInMs = e.target.to.value.split(':')[0] * 1000 * 60 * 60;
        const minutesToInMs = e.target.to.value.split(':')[1] * 1000 * 60;

        if(e.target.date !== undefined) {
            const dayInMs = new Date(moment(e.target.date.value, ['DD/MM/YYYY', 'MM/DD/YYYY'])).getTime();
            if(new Date().getTime() -  dayInMs - hoursFromInMs - minutesFromInMs >= 0){
                setDateTimeErrorMsg('Не можете да закажете консултациски термин во минатото');
                result = false;
            } else {
                setDateTimeErrorMsg('');
            }
        }

        if(hoursFromInMs + minutesFromInMs - hoursToInMs - minutesToInMs >= 0) {
            setTimeErrorMsg('Времето на крај мора да биде по времето на почеток');
            result = false;
        } else {
            setTimeErrorMsg('');
        }

        return result;
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        if(!validate(e)) {
            return;
        }
        let consultationSlot = {
            id: slotId,
            professorId: props.professor.id,
            roomId: e.target[`building${e.target.buildingId.value}`].value,
            date: ((e.target.date === undefined) ? undefined : e.target.date.value),
            from: e.target.from.value,
            to: e.target.to.value,
        };
        props.onConsultationSlotEdited(consultationSlot);
        history.push("/professor");
    };

    const onClickBack = () => {
        history.push("/professor");
    };

    const handleTermOnChange = (e) => {
        const paramName = (!isNaN(e.target.id[8])) ? 'roomId' : e.target.name;
        const paramValue = e.target.value;
        setTerm({...term, [paramName] : paramValue})
    };

    const optionsBuildings = () => props.buildings.sort((b1, b2) => (b1.name > b2.name) ? 1 : -1)
        .map(b => <option key={b.id} value={b.id}>{b.name}</option>);

    const optionsRooms = () => {
        return props.buildings
            .sort((b1, b2) => (b1.name > b2.name) ? 1 : -1)
            .map(b => {
                return (
                    <select style={(b.id === term.buildingId) ? {display: "block"} : {display: "none"}} // ;)
                            key={b.id}
                            className="form-control"
                            title={"Просторија"}
                            id={`building${b.id}`}
                            name={`building${b.id}`}
                            value={term.roomId}
                            onChange={handleTermOnChange}>
                        {
                            props.rooms.filter(r => r.building.id === b.id)
                                .sort((r1, r2) => (r1.name > r2.name) ? 1 : -1)
                                .map(r => <option key={r.id} value={r.id}>{r.name}</option>)
                        }
                    </select>
                );
            });
    };

    const listRooms = (e) => {
        const roomsContainer = document.getElementById("roomsContainer");
        roomsContainer.childNodes.forEach(c => {
            if(c.id === `building${e.target.childNodes[e.target.selectedIndex].value}`) {
                c.style.display = 'block';
            } else {
                c.style.display = 'none';
            }
        });
    };

    const termDate = () => {
        return (
            <div className="row form-group">
                <div className="col-md-4 font-weight-bold text-right">
                    Датум:
                </div>
                <div className="col-lg-6 col-md-8">
                    <div className={"row"}>
                        <div className={"col-md-8"}>
                            <DatePicker name={"date"}
                                        className={"form-control"}
                                        selected={date}
                                        onChange={(date) => setDate(date)}
                                        dateFormat={"dd/MM/yyyy"}
                                        title={"Датум"} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const termFromAndTo = () => {
        return (
            <>
                <div className="row form-group">
                    <div className="col-md-4 font-weight-bold text-right">Почеток:</div>
                    <div className="col-lg-6 col-md-8">
                        <div className="row">
                            <div className="col-md-8">
                                <TimeField
                                    name={"from"}
                                    className={"form-control"}
                                    value={term.from ? term.from : ""}  // {String}   required, format '00:00' or '00:00:00'
                                    onChange={handleTermOnChange}       // {Function} required
                                    input={<input type={"text"} />}     // {Element}  default: <input type="text" />
                                    colon={":"}                         // {String}   default: ":"
                                    showSeconds={false}                 // {Boolean}  default: false
                                    title={"Почеток"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-4 font-weight-bold text-right">Крај:</div>
                    <div className="col-lg-6 col-md-8">
                        <div className="row">
                            <div className="col-md-8">
                                <TimeField
                                    name={"to"}
                                    className={"form-control"}
                                    value={term.to ? term.to : ""}      // {String}   required, format '00:00' or '00:00:00'
                                    onChange={handleTermOnChange}       // {Function} required
                                    input={<input type={"text"} />}     // {Element}  default: <input type="text" />
                                    colon=":"                           // {String}   default: ":"
                                    showSeconds={false}                 // {Boolean}  default: false
                                    title={"Крај"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const termBuilding = () => {
        return (
            <div className="row form-group">
                <div className="col-md-4 font-weight-bold text-right">Група на простории:</div>
                <div className="col-lg-6 col-md-8">
                    <div className={"row"}>
                        <div className={"col-md-8"}>
                            <select name={"buildingId"}
                                    onChange={(e) => {handleTermOnChange(e); listRooms(e);}}
                                    className="form-control"
                                    title={"Просторија"}
                                    value={term.buildingId}>
                                {optionsBuildings()}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const termRoom = () => {
        return (
            <div className="row form-group">
                <div className="col-md-4 font-weight-bold text-right">Просторија:</div>
                <div className="col-lg-6 col-md-8">
                    <div className={"row"}>
                        <div id={"roomsContainer"} className={"col-md-8"}>
                            {optionsRooms()}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const errorMessages = () => {
        return (
            <div className='row'>
                <div className='col-8 text-right'>
                    <small className='text-danger'>
                        <div>
                            {dateTimeErrorMsg}
                        </div>
                        <div>
                            {timeErrorMsg}
                        </div>
                    </small>
                </div>
            </div>
        );
    };

    return (
        <div>
            <hr/>
            <form onSubmit={onFormSubmit} className={"mt-5"}>
                {termDate()}
                {termFromAndTo()}
                {termBuilding()}
                {termRoom()}
                {errorMessages()}
                <div className="col-md-12 text-right mt-5">
                    <button type="submit" className="btn btn-primary" title="Промени">
                        Промени
                    </button>
                    <button onClick={onClickBack} type="submit"
                            className="btn btn-secondary ml-2" title="Назад">
                        Назад
                    </button>
                </div>
            </form>
            <hr/>
        </div>
    );
};

export default DateConsultationEdit;
