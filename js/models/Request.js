"use strict";

class Request 
{
    fill(form) {
        console.log(form);
        this.target = localStorage.getItem('userId');
        this.from = form.dateBegin.value;
        this.fromType = form.typeBegin.value;
        this.to = form.dateEnd.value;
        this.toType = form.typeEnd.value;
        this.reason = form.reason.value;
        this.remark = form.remark.value;

        return this;
    }
    
    splitIntervals() {
        const intervals = [];

        let date, interval;
        let begin, end, type;

        const firstDayTS = new Date(this.from).getTime();
        const lastDayTS = new Date(this.to).getTime();
        let currentDayTS = firstDayTS;

        this._defineDayTypes();

        for(; currentDayTS <= lastDayTS; currentDayTS += miliSecondsPerDay) {
            date = new Date(currentDayTS).toUnixFormat();

            if(currentDayTS === firstDayTS) {
                type = this.fromType;
            } else if (currentDayTS === lastDayTS) {
                type = this.toType;
            } else {
                type = 'wholeday';
            }
            
            if (type === 'morning') {
                type = 'halfday';
                begin = '06:00';
                end = '06:00';
            } else if (type === 'afternoon') {
                type = 'halfday';
                begin = '12:01';
                end = '12:01';
            } else if (type === 'wholeday') {
                begin = '06:00';
                end = '06:00';
            } else {
                type = 'time';
            }

            interval = new Interval(this.target, 
                                    date + 'T' + begin + ':00Z',
                                    date + 'T' + end + ':00Z',
                                    type, 
                                    this.reason, 
                                    this.remark);
            
           intervals.push(interval);
        }

        return intervals;
    }

    _defineDayTypes() {
        const requestOnOneDay = this.from === this.to;

        if (requestOnOneDay) {
            if (this.fromType === 'morning' && this.toType === 'afternoon') {
                this.fromType = 'wholeday';
                this.toType = 'wholeday';
            }
        } else {
            if (this.fromType === 'morning') {
                this.fromType = 'wholeday';
            }
            if (this.toType === 'afternoon') {
                this.toType = 'wholeday';
            }
        }

        return this;
    }
}