import React from 'react';

import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const room = (props) => {

    const options = {
        title: 'Избриши',
        message: 'Дали сте сигурни? ' +
                 '( ВАЖНО: Со ова ќе се избришат и сите консултациски термини закажани во дадената просторија! )',
        buttons: [
            {
                label: 'Да',
                onClick: () => props.onDelete(props.value.name)
            },
            {
                label: 'Не',
            }
        ]
    }

    const cardHeader = () => {
        return (
            <div className="card-header">
                <div className="row">
                    <div className="col-5">
                        {props.value.name}
                    </div>
                    <div className="col-7 text-right">
                        <a href="#" className="btn btn-primary btn-sm" title="Уреди">
                            <i className="fa fa-fw fa-edit"></i>
                        </a>
                        <a onClick={() => {confirmAlert(options)}} href="#"
                           className="btn btn-danger btn-sm ml-1" title="Избриши">
                            <i className="fa fa-fw fa-trash"></i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    const cardBody = () => {
        return (
            <div className="card-body">
                <div className="card-text">
                    {props.value.description}
                </div>
            </div>
        );
    }

    return (
        <div className="col-md-6 mt-2 col-sm-12">
            <div className="card">
                {cardHeader()}
                {cardBody()}
            </div>
        </div>
    );
}

export default room;
