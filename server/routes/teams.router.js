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

// COREYS UNEDITED POST FOR CREATING A TEAM
// router.post('/', rejectUnauthenticated, (req, res) => {
//   const queryText = 'INSERT INTO "teams" ("name") VALUES ($1);'
//   pool.query(queryText, [req.body.teamName])
//     .then((response) => {
//       res.send(response.rows);
//     })
//     .catch(() => res.sendStatus(500));
// });

//this is for when a user creates their team 
router.post('/', rejectUnauthenticated, async (req, res) => {
  console.log(req.user);
  // initiate connection
  const connection = await pool.connect()
  // Using basic JavaScript try/catch/finally 
  try {
    await connection.query('BEGIN');
    //insert team into db
    const queryText1 = 'INSERT INTO "teams" ("name") VALUES ($1) RETURNING "id";';
    const createTeamGetId = await connection.query(queryText1, [req.body.teamName]);
    const newTeamId = createTeamGetId.rows[0].id;
    //update user info
    const queryText2 = `UPDATE "users" SET "team_id" = $1 WHERE "id"=$2;`
    await connection.query(queryText2, [newTeamId, req.user.id]);
    //if everything goes through, then send it all through and send 'OK'
    await connection.query('COMMIT');
    res.sendStatus(200);
  } catch (error) {
    await connection.query('ROLLBACK');
    console.log(`Transaction Error - Rolling back transfer`, error);
    res.sendStatus(500);
  } finally {
    // release connection
    connection.release()
  }
});

//this is for when a user joins a team (very similar to above)
router.put('/join', rejectUnauthenticated, async (req, res) => {
  console.log(req.user);
  // initiate connection
  const connection = await pool.connect()
  // Using basic JavaScript try/catch/finally 
  try {
    await connection.query('BEGIN');
    //insert team into db
    const queryText1 = 'SELECT "id" FROM "teams" WHERE "name"=$1;';
    const getId = await connection.query(queryText1, [req.body.teamName]);
    const teamId = getId.rows[0].id;
    //update user info
    const queryText2 = `UPDATE "users" SET "team_id" = $1 WHERE "id"=$2;`
    await connection.query(queryText2, [teamId, req.user.id]);
    //if everything goes through, then send it all through and send 'OK'
    await connection.query('COMMIT');
    res.sendStatus(200);
  } catch (error) {
    await connection.query('ROLLBACK');
    console.log(`Transaction Error - Rolling back transfer`, error);
    res.sendStatus(500);
  } finally {
    // release connection
    connection.release()
  }
});

// PUT routes needed for changing user level or editing a profile in general


module.exports = router;