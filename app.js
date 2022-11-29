const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const swaggerRoutes = require('./routes/swagger');
const bodyParser = require('body-parser');
const { auth ,requiresAuth } = require('express-openid-connect');
const port = process.env.PORT || 5000;
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.secret,
  baseURL: process.env.PORT?'https://rhodamabs341.onrender.com': 'http://localhost:5000',
  clientID: process.env.clientID,
  issuerBaseURL: process.env.issuerBaseURL
};
const app = express();

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// use body-parser to our incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// routes to handle requests for contacts
app.use('/test',requiresAuth(), require('./routes'));
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


// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
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
