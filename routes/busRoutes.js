const moment = require('moment');

module.exports = app => {
    
    const getTimes = (defaultTime, diffTimeNowDayStart, stop, utc) => {

        const utcUpdate = moment(defaultTime).add(utc, 'm')._d;
        const startTimeStop1Route1 = moment(utcUpdate).add((stop - 1) * 2, 'm')._d;
        const startTimeStop1Route2 = moment(startTimeStop1Route1).add(2, 'm')._d;
        const startTimeStop1Route3 = moment(startTimeStop1Route1).add(4, 'm')._d;
        
        const mulitple15 = Math.floor(diffTimeNowDayStart/15);
        const addTime = 15 * mulitple15;
        
        return {
            stop: stop,
            route1: {
                time1: moment(startTimeStop1Route1).add(addTime + 15, 'm').format('h:mm a'),
                time2: moment(startTimeStop1Route1).add(addTime + 30, 'm').format('h:mm a')
            },
            route2: {
                time1: moment(startTimeStop1Route2).add(addTime + 15, 'm').format('h:mm a'),
                time2: moment(startTimeStop1Route2).add(addTime + 30, 'm').format('h:mm a')
            },
            route3: {
                time1: moment(startTimeStop1Route3).add(addTime + 15, 'm').format('h:mm a'),
                time2: moment(startTimeStop1Route3).add(addTime + 30, 'm').format('h:mm a')
            }
        }
    }          

    app.post("/api/routes", function(req, res) {
        const {
            stops,
            time
        } = req.body;

        const d = new Date();
        d.setTime(time);
        const utc = d.getTimezoneOffset()
        const defaultTime = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        
        const diffTimeNowDayStart = moment(d).diff(moment(defaultTime), 'm');
        
        let finalGroup = []

        for ( var x = 0; x < stops.length; x++) {
            finalGroup.push( getTimes(defaultTime, diffTimeNowDayStart, stops[x], utc ) );
        }

        res.json(finalGroup);
    });
}