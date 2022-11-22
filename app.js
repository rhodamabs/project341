const express = require('express');
const mongodb = require('./db/connect');

const swaggerRoutes = require('./routes/swagger');

const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const app = express();


// use body-parser to our incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// routes to handle requests for contacts
app.use('/', require('./routes'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type,Accept, Z-Key'
  );
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Headers', 'GET,POST,PUT,DELETE,OPTIONS');
  next();
});

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});


mongodb.initDb((err,mongodb) =>{
 if(err) {
       console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
