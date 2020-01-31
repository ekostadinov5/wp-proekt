import React from 'react';

const room = (props) => {

    const cardHeader = () => {
        return (
            <div className="card-header">
                <div className="row">
                    <div className="col-5">
                        {props.value.name}
                    </div>
                    <div className="col-7 text-right">
                        <a href="#" className="btn btn-primary" title="Уреди">
                            <i className="fa fa-fw fa-edit"></i>
                        </a>
                        <a href="#" className="btn btn-danger ml-1" title="Избриши">
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
