const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET Alert List
router.get('/list/all', (req, res) => {
    console.log('in alert GET all alerts:')
    const queryText = `SELECT "alerts"."id", "description", "user_id", TO_CHAR("created", 'FMDay, FMMonth FMDD FMYYYY HH12:MI am') as created,
    "resolved", "users"."firstname" as firstname, "users"."lastname" as lastname, "teams"."name" as teamname, "teams"."id" as team_id
    FROM "alerts" 
    join "users" on "users"."id" = "alerts"."user_id"
    join "teams" on "teams"."id" = "users"."team_id"
    ORDER BY "id" DESC;`;
    pool.query(queryText)
    .then( (result) => {
        console.table(result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in alert list GET ${error}`);
        res.sendStatus(500);
    });
});

// SET alert resolved 
router.put('/resolve/:id', (req, res) => {
    console.log('in resolve alert PUT with id:', req.params.id);
    const queryText = `UPDATE "alerts" SET "resolved"=true WHERE "id"=$1;`;
    pool.query(queryText, [Number(req.params.id)])
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in resolve alert PUT: ${error}`);
        res.sendStatus(500);
    });
});

// post new alert to db
router.post('/new', (req, res) => {
    console.log('in submit alert POST with', req.body);
    const id = req.body.id;
    const desc = req.body.description;
    const queryText = `INSERT INTO "alerts" ("type", "description", "user_id") VALUES ('text', $1, $2)`;
    pool.query(queryText, [desc, Number(id)])
    .then(() => { 
        res.sendStatus(201)
    }).catch((err) => {
      console.log('Error completing new alert POST', err);
      res.sendStatus(500);
    });
});

module.exports = router;