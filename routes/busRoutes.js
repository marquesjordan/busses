module.exports = app => {
    app.get("/api/routes", function(req, res) {
        const {
            stop1,
            stop2,
            current_time
        } = req.body;

        res.json([stop1,stop2,current_time]);
    });
}