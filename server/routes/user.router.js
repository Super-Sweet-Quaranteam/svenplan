const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  // console.log('req.user:', req.user);
  // console.log('req.session:', req.session);
  res.send(req.user);
});

router.get('/team', rejectUnauthenticated, (req, res)=>{
  console.log('req.user.id', req.user.id);
  
  const queryText = `SELECT "users"."alias" AS "user", "teams"."name" AS "team"
                    FROM "teams" JOIN "users"
                    ON "teams"."id" = "users"."team_id"
                    WHERE "users"."id" = $1;`;
  pool.query(queryText, [req.user.id])
    .then((response) => {
      res.send(response.rows[0].team);})
    .catch(() => res.sendStatus(500));
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  let alias = req.body.alias;
    if (alias===''){alias=req.body.firstname;}
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const company = req.body.company;

  const queryText = 'INSERT INTO "users" (email, password, alias, firstname, lastname, phone, company) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
  pool.query(queryText, [username, password, alias, firstname, lastname, phone, company])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;