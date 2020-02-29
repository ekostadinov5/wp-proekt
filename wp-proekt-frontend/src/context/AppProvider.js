import React, {Component} from 'react';
import AppContext from './AppContext';
import LocalStorageService from '../services/localStorageService';
import moment from 'moment';

class AppProvider extends Component {

    state = {
        role: LocalStorageService.getRole()
    };

    convertDay = (day) => {
        if(day === 'MONDAY') {
            return 'Понеделник';
        } else if(day === 'TUESDAY') {
            return 'Вторник';
        } else if(day === 'WEDNESDAY') {
            return 'Среда';
        } else if(day === 'THURSDAY') {
            return 'Четврток';
        } else if(day === 'FRIDAY') {
            return 'Петок';
        } else if(day === 'SATURDAY') {
            return 'Сабота';
        } else if(day === 'SUNDAY') {
            return 'Недела';
        } else {
            return null;
        }
    };

    getDayOfWeekIntValue = (dayOfWeek) => {
        if(dayOfWeek === 'MONDAY') {
            return 1;
        } else if(dayOfWeek === 'TUESDAY') {
            return 2;
        } else if(dayOfWeek === 'WEDNESDAY') {
            return 3;
        } else if(dayOfWeek === 'THURSDAY') {
            return 4;
        } else if(dayOfWeek === 'FRIDAY') {
            return 5;
        } else if(dayOfWeek === 'SATURDAY') {
            return 6;
        } else if(dayOfWeek === 'SUNDAY') {
            return 7;
        } else {
            return null;
        }
    };

    compareTimeVars = (time1, time2) => {
        let t1 = time1.split(':');
        let t2 = time2.split(':');
        let h1 = parseInt(t1[0]);
        let m1 = parseInt(t1[1]);
        let h2 = parseInt(t2[0]);
        let m2 = parseInt(t2[1]);
        if(h1 > h2) {
            return 1;
        } else if (h1 < h2) {
            return -1;
        } else {
            if(m1 > m2) {
                return 1;
            } else if(m1 < m2) {
                return -1;
            } else {
                return 0;
            }
        }
    };

    convertDateFormat = (date) => {
        return moment(date).format("DD-MM-YYYY");
    };

    convertDayToNearestDate = (dayOfWeek, time) => {
        let intValueDayOfWeek = this.getDayOfWeekIntValue(dayOfWeek);
        let hours = parseInt(time.split(':')[0]);
        let minutes = parseInt(time.split(':')[1]);
        console.log(hours + ' ' + minutes);
        intValueDayOfWeek = intValueDayOfWeek !== 7 ? intValueDayOfWeek : 0;
        let date = new Date();
        let safetyFlag = 0;
        if(date.getDay() !== intValueDayOfWeek) {
            while(date.getDay() !== intValueDayOfWeek) {
                date.setDate(date.getDate() + 1);
                if(safetyFlag++ > 7) {
                    break;
                }
            }
        } else {
            if(date.getHours() > hours || (date.getHours() === hours && date.getMinutes() > minutes)) {
                date.setDate(date.getDate() + 7);
            }
        }
        return this.convertDateFormat(date);
    };

    render() {

        return(
            <AppContext.Provider
                value={{
                    role: this.state.role,
                    convertDay: this.convertDay,
                    getDayOfWeekIntValue: this.getDayOfWeekIntValue,
                    compareTimeVars: this.compareTimeVars,
                    convertDateFormat: this.convertDateFormat,
                    convertDayToNearestDate: this.convertDayToNearestDate
                }}>
                {this.props.children}
            </AppContext.Provider>
        );
    }

}

export default AppProvider;
