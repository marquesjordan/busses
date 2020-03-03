const moment = require('moment');

module.exports = app => {
    
    const getTimes = (defaultTime, diffTimeNowDayStart, stop) => {

        const startTimeStop1Route1 = moment(defaultTime).add((stop - 1) * 2, 'm');
        const startTimeStop1Route2 = moment(startTimeStop1Route1).add(2, 'm');
        const startTimeStop1Route3 = moment(startTimeStop1Route1).add(4, 'm');
        
        const mulitple15 = Math.floor(diffTimeNowDayStart/15);
        const addTime = 15 * mulitple15;
        
        return {
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

    app.get("/api/routes", function(req, res) {
        const {
            stops
        } = req.body;

        const date = new Date();
        const defaultTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        
        const diffTimeNowDayStart = moment(date).diff(moment(defaultTime), 'm');
        
        let finalGroup = []

        for ( var x = 0; x < stops.length; x++) {
            finalGroup.push( getTimes(defaultTime, diffTimeNowDayStart, stops[x] ) );
        }

        res.json(finalGroup);
    });
}