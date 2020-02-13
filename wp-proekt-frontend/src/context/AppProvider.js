import React, {Component} from 'react';
import AppContext from './AppContext';

class AppProvider extends Component {

    state = {
        // role: 'admin'
         role: 'professor'
        // role: 'student'
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

    render() {

        return(
            <AppContext.Provider
                value={{
                    role: this.state.role,
                    setRole: () => {
                        //
                    },
                    convertDay: this.convertDay,
                    getDayOfWeekIntValue: this.getDayOfWeekIntValue,
                    compareTimeVars: this.compareTimeVars
                }}>
                {this.props.children}
            </AppContext.Provider>
        );
    }

};

export default AppProvider;
