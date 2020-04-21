const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// get all team info (just ids and names) from teams table
router.get('/', rejectUnauthenticated, (req, res)=>{
  const queryText= 'SELECT * FROM "teams";'
  pool.query(queryText)
    .then((response) => { 
      res.send(response.rows);})
    .catch(() => res.sendStatus(500));
});

// use join to get members from a specific team from users table
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

// PUT routes needed for changing user level or editing a profile in general


module.exports = router;