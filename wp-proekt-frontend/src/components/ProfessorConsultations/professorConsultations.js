import React from 'react';

const professorConsultations = () => {

    return (
        <div className={"row"}>
            <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-6">
                                проф. д-р Димитар Трајанов
                            </div>
                            <div className="col-md-6 text-right">
                                <a href="#" className="btn btn-light" title="Откажи">
                                    <i className="fa fa-fw fa-star"></i>
                                </a>
                                <a href="#" className="btn btn-info ml-1" title="Студенти">
                                    <i className="fa fa-fw fa-users"></i>
                                </a>
                                <a href="#" className="btn btn-primary ml-1" title="Додади консултации">
                                    <i className="fa fa-fw fa-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="card-text">
                            <div className="consultations">
                                <form>
                                    <div className="row form-group">
                                        <div className="col-md-6 font-weight-bold"> Ден:</div>
                                        <div className="col-md-6">
                                            <select className="form-control">
                                                <option>Понеделник</option>
                                                <option>Вторник</option>
                                                <option>Среда</option>
                                                <option>Четврток</option>
                                                <option>Петок</option>
                                                <option>Сабота</option>
                                                <option>Недела</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-md-6 font-weight-bold"> Време:</div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <input type="text"
                                                           className="form-control"
                                                           pattern="\d\d:?\d\d"
                                                           title="Време од"
                                                           />
                                                </div>
                                                <div className="col-md-2 text-center">
                                                    -
                                                </div>
                                                <div className="col-md-5 text-right">
                                                    <input type="text"
                                                           pattern="\d\d:?\d\d"
                                                           className="form-control"
                                                           title="Време до"
                                                           />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-md-6 font-weight-bold"> Просторија</div>
                                        <div className="col-md-6">
                                            <select className="form-control">
                                                <option>SoCD</option>
                                                <option>Канцеларија 10</option>
                                                <option>Кацнеларија во анекс</option>
                                                <option>Просторија 26</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-12 text-right">
                                        <button href="#" className="btn btn-primary" title="Зачувај">
                                            <i className="fa fa-fw fa-save"></i> Зачувај
                                        </button>
                                        <a href="#" className="btn btn-danger ml-1" title="Избриши">
                                            <i className="fa fa-fw fa-trash"></i>
                                        </a>
                                    </div>
                                </form>
                                <hr />
                            </div>
                            <div className="consultations">
                                <div className="row">
                                    <div className="col-md-6 font-weight-bold">Датум:</div>
                                    <div className="col-md-6">18.10.2019</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 font-weight-bold">Време:</div>
                                    <div className="col-md-6">14:30-16:00</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 font-weight-bold">Просторија</div>
                                    <div className="col-md-6">
                                        <a href="/Home/Rooms">Канцеларија во Анекс</a>
                                    </div>
                                </div>
                                <div className="col-md-12 text-right">
                                    <a href="#" className="btn btn-primary" title="Уреди">
                                        <i className="fa fa-fw fa-edit"></i>
                                    </a>
                                    <a href="#" className="btn btn-danger ml-1" title="Избриши">
                                        <i className="fa fa-fw fa-trash"></i>
                                    </a>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-6">
                                проф. д-р Димитар Трајанов (студенти)
                            </div>
                            <div className="col-md-6 text-right">
                                <a href="#" className="btn btn-light" title="Откажи">
                                    <i className="fa fa-fw fa-star"></i>
                                </a>
                                <a href="#" className="btn btn-light ml-1" title="Сокриј студенти">
                                    <i className="fa fa-fw fa-users"></i>
                                </a>
                                <a href="#" className="btn btn-primary ml-1" title="Додади консултации">
                                    <i className="fa fa-fw fa-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="card-text">
                            <div className="students">
                                <h5>Студенти</h5>
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
        </div>
    );
}

export default professorConsultations;
