const express = require('express');
const swaggerRoutes = require('./routes/swagger');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const app = express();

// use body-parser to our incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes to handle requests for contacts
app.use('/', require('./routes'));
app.use(bodyParser.json())
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

app.use((req,res,next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

// Error handling
app.use((error,req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message
    }
  });
});

const db = require('./models');
db.mongoose
.connect(db.url,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then (() => {    
  app.listen(port, () => {
    console.log(`Connected to DB and listening on ${port}`); 
  });
 
})
.catch (err => {
  console.log('Cannot connect to the database!', err);
  process.exit();
});


  

