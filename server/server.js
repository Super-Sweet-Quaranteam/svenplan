const express = require('express');
const app = express();
const { Client } = require('pg');
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const testRouter = require('./routes/template.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes //
app.use('/api/test', testRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// test that database is up
const client = new Client({
  host: 'localhost',
  port: 5432,
})
client
  .connect()
  .then(() => console.log('postgres database connected....'))
  .catch(err => console.error('connection error', err.stack))


