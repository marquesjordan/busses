const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
    if (req.headers['x-forwarded-proto'] == 'http') {
      res.redirect('https://desolate-shelf-06060.herokuapp.com' + req.url);
    } else {
      return next();
    }
});

require('./routes/busRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
  
const PORT = process.env.PORT || 5000;
app.listen(PORT);