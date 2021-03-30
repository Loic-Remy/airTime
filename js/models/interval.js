"use strict";

class Interval
{
    constructor(target, begin, end, type, reason, remark)
    {
        this._hydrate(target, begin, end, type, reason, remark);

    }

    _hydrate(target, begin, end, type, reason, remark)
    {
       this.target = target;
        this.begin = begin;
        this.end = end;
        this.type = type;
        this.reason = reason;
        this.remark = remark;
    }

    fill(form)
    {
		let formDate = form.date.value;
		let formBegin = form.begin.value;
		let formEnd = form.end.value;
        let formType = form.type.value;

        if (formType === 'morning')
        {
            formType = 'halfday';
            formBegin = '06:00';
            formEnd = '06:00';
        }
        else if (formType === 'afternoon')
        {
            formType = 'halfday';
            formBegin = '12:01';
            formEnd = '12:01';
        }
        else if (formType === 'wholeday')
        {
            formBegin = '06:00';
            formEnd = '06:00';
        }
        else
        {
            formType = 'time';
        }
        
        this._hydrate(
            sessionStorage.getItem('userId'),
            formDate + 'T' + formBegin + ':00Z',
            formDate + 'T' + formEnd + ':00Z',
            formType,
            form.reason.value,
            form.remark.value);

        this.from = formDate + 'T00:00:00Z';
        this.until = formDate + 'T23:59:59Z';

        this._endIsBiggerThanBegin();
    }

    _endIsBiggerThanBegin()
    {
        if(this.end < this.begin){
            console.log("Begin is bigger than end hour of interval");
            new AppStatus("L'enregistrement a échoué car l'heure de début est supérieure à l'heure de fin", "Attention - ").printAsFailure();
        }
    }

}

class IntervalManager
{
    constructor(url)
    {
        this.url = url;
    }

    async getIntervals(interval)
    {
        let url = new URL(this.url);
        let result;

		url.searchParams.append('from', interval.from);
		url.searchParams.append('until', interval.until);
        url.searchParams.append('target', interval.target);
        
        result = await fetch(url).then(response => response.json());

        console.log(url);
        console.log(result);

        return await result;
    }

    async sendInterval(interval)
    {
        let url = new URL(this.url);
        let result;

		url.searchParams.append('begin', interval.begin);
		url.searchParams.append('end', interval.end);
		url.searchParams.append('target', interval.target);
		url.searchParams.append('type', interval.type);
		url.searchParams.append('reason', interval.reason);
        url.searchParams.append('remark', interval.remark);
       
        let init =  {method: 'POST'};
        result = await fetch(url, init).then(response => response.json());
        console.log(url);
        console.log(result);

        if (result.success === true) {
            new AppStatus("Le timbrage a bien été enregistré").printAsSuccess();
        }

        return await result;
    }

    static getIntervalsForGivenDay(intervals, day) {

        function checkTheDay (givenDay) {

            return function (element) {
                const dayToCheck = element.begin.substring(0, 10);
                const targetDay = givenDay.substring(0, 10);
                console.log(dayToCheck);
                console.log(targetDay);
                return dayToCheck === targetDay;
            }
        }

        const results = intervals.filter(checkTheDay(day));
        console.log(results);
        return results;
    }

}
