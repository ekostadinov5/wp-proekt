import React from 'react';
import Term from '../Consultations/term'

const professor = (props) => {

    const termsWeekly = () => {
        return props.value.slots.map(term => {
                if(term.dayOfWeek) {
                    return <Term key={term.id} value={term} />
                }
            }
        );
    }

    const termsDay = () => {
        return props.value.slots.map(term => {
                if(term.date) {
                    return <Term key={term.id} value={term} />
                }
            }
        );
    }

    return (
        <div className="col-lg-4 col-md-6 mt-4 col-sm-12">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-8">
                            {props.value.title} {props.value.firstName} {props.value.lastName}
                        </div>
                        <div className="col-4 text-right">
                            <a href="#" className="btn btn-light" title="Следи">
                                <i className="fa fa-fw fa-star"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <button className="btn btn-dark" type="button" data-toggle="collapse"
                        data-target={"#collapseProfessor" + props.index} aria-expanded="false"
                        aria-controls={"collapseProfessor" + props.index}>
                    Термини
                </button>
                <div className={"collapse"} id={"collapseProfessor" + props.index}>
                    <div className="card-body">
                        <div className="card-text">
                            Редовни консултации:
                            <hr />
                            {termsWeekly()}
                            Дополнителни консултации:
                            <hr />
                            {termsDay()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default professor;
