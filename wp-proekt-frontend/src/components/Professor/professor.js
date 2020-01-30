import React from 'react';
import Term from '../Consultations/term'

const professor = (props) => {

    const termsWeekly = () => {
        return props.value.dayTerms.map(term =>
            <Term key={term.slotId} value={term} />
        );
    }

    const termsDay = () => {
        return props.value.dateTerms.map(term =>
            <Term key={term.slotId} value={term} />
        );
    }

    return (
        <div className="col-lg-4 col-md-6 mt-4 col-sm-12">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-8">
                            {props.value.professor.title} {props.value.professor.firstName} {props.value.professor.lastName}
                        </div>
                        <div className="col-4 text-right">
                            <a href="#" className="btn btn-light" title="Откажи">
                                <i className="fa fa-fw fa-star"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <button className="btn btn-dark" type="button" data-toggle="collapse"
                        data-target={"#collapseExample" + props.index} aria-expanded="false"
                        aria-controls={"collapseExample" + props.index}>
                    Термини
                </button>
                <div className={"collapse"} id={"collapseExample" + props.index}>
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
