const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res)=>{
  const queryText= 'SELECT * FROM "teams";'
  pool.query(queryText)
    .then((response) => { 
      res.send(response.rows);})
    .catch(() => res.sendStatus(500));
});

router.get('/members/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "users"."alias" AS "user", "users"."firstname", "users"."lastname", "users"."id"
                    FROM "teams" JOIN "users"
                    ON "teams"."id" = "users"."team_id"
                    WHERE "teams"."id" = $1;`
  pool.query(queryText, [req.params.id])
    .then((response) => {
      res.send(response.rows);
    })
    .catch(() => res.sendStatus(500));
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
// router.post('/register', (req, res, next) => {
//   const username = req.body.username;
//   const password = encryptLib.encryptPassword(req.body.password);
//   let alias = req.body.alias;
//     if (alias===''){alias=req.body.firstname;}
//   const firstname = req.body.firstname;
//   const lastname = req.body.lastname;
//   const phone = req.body.phone;
//   const company = req.body.company;

//   const queryText = 'INSERT INTO "users" (email, password, alias, firstname, lastname, phone, company) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
//   pool.query(queryText, [username, password, alias, firstname, lastname, phone, company])
//     .then(() => res.sendStatus(201))
//     .catch(() => res.sendStatus(500));
// });


module.exports = router;