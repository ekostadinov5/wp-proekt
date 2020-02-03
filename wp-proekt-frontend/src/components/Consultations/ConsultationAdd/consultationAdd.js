import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TimeField from 'react-simple-timefield';

const ConsultationAdd = (props) => {

    const [date, setDate] = useState(new Date());

    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();
        let consultationSlot = {
            professorId: props.professor.id,
            roomId: e.target[`building${e.target.building.value}`].value,
            from: e.target.from.value,
            to: e.target.to.value,
        };
        debugger;
        if(e.target.dayDateSelect.value === '1') {
            consultationSlot.dayOfWeek = e.target.dayOfWeek.value
        } else {
            consultationSlot.date = e.target.date.value
        }
        props.onConsultationSlotAdded(consultationSlot);
        history.push("/professor");
    };

    const onClickBack = () => {
        history.push("/professor");
    };

    const optionsBuildings = () => props.buildings.sort((b1, b2) => (b1.name > b2.name) ? 1 : -1)
        .map(b => <option key={b.id} value={b.id}>{b.name}</option>);

    const optionsRooms = () => {
        let flag = true;
        return props.buildings
            .sort((b1, b2) => (b1.name > b2.name) ? 1 : -1)
            .map(b => {
                return (
                    <select style={(flag && !(flag = !flag)) ? {display: "block"} : {display: "none"}} // ;)
                            key={b.id}
                            className="form-control"
                            title={"Просторија"}
                            id={`building${b.id}`}
                            name={`building${b.id}`}>
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

    const onDayDateChange = (e) => {
        const index = e.target.value;
        e.target.parentElement.parentElement.childNodes[index].style.display='block';
        e.target.parentElement.parentElement.childNodes[(index === '1') ? 2 : 1].style.display='none';
    };

    return (
        <div>
            <hr/>
            <form onSubmit={onFormSubmit} className={"mt-5"}>
                <div className="row form-group">
                    <div className="col-md-4 text-right">
                        <select name={"dayDateSelect"} onChange={onDayDateChange}
                                className="form-control-sm border-0 font-weight-bold">
                            <option className={"font-weight-bold"} value={1}>Ден:</option>
                            <option className={"font-weight-bold"} value={2}>Датум:</option>
                        </select>
                    </div>
                    <div className="col-lg-6 col-md-8">
                        <div className={"row"}>
                            <div className={"col-md-8"}>
                                <select name={"dayOfWeek"}
                                        className="form-control"
                                        title={"Ден"}>
                                    <option value={"MONDAY"}>Понеделник</option>
                                    <option value={"TUESDAY"}>Вторник</option>
                                    <option value={"WEDNESDAY"}>Среда</option>
                                    <option value={"THURSDAY"}>Четврток</option>
                                    <option value={"FRIDAY"}>Петок</option>
                                    <option value={"SATURDAY"}>Сабота</option>
                                    <option value={"SUNDAY"}>Недела</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div style={{display: "none"}} className="col-lg-6 col-md-8">
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
                <div className="row form-group">
                    <div className="col-md-4 font-weight-bold text-right">Почеток:</div>
                    <div className="col-lg-6 col-md-8">
                        <div className="row">
                            <div className="col-md-8">
                                <TimeField
                                    name={"from"}
                                    className={"form-control"}
                                    value={""}                          // {String}   required, format '00:00' or '00:00:00'
                                    onChange={() => null}               // {Function} required
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
                                    value={""}                          // {String}   required, format '00:00' or '00:00:00'
                                    onChange={() => null}               // {Function} required
                                    input={<input type={"text"} />}     // {Element}  default: <input type="text" />
                                    colon=":"                           // {String}   default: ":"
                                    showSeconds={false}                 // {Boolean}  default: false
                                    title={"Крај"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-4 font-weight-bold text-right">Група на простории:</div>
                    <div className="col-lg-6 col-md-8">
                        <div className={"row"}>
                            <div className={"col-md-8"}>
                                <select name={"building"}
                                        onChange={listRooms}
                                        className="form-control"
                                        title={"Просторија"}>
                                    {optionsBuildings()}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
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
                <div className="col-md-12 text-right mt-5">
                    <button type="submit" className="btn btn-primary" title="Додади">
                        Додади
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

export default ConsultationAdd;
