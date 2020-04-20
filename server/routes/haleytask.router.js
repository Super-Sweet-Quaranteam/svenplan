const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get all riskareas
router.get('/risktypes/:id', (req, res) => {
    console.log('in /haley-task/risktypes/:id get with id:', req.params.id);
    const queryText = `SELECT "riskareas"."name" AS "riskarea"
                        FROM "riskareas"
                        JOIN "workflows" ON "riskareas"."workflow_id"="workflows"."id"
                        JOIN "phases" ON "phases"."workflow_id"="workflows"."id"
                        WHERE "phases"."id"=$1;
                        `;
    const values = [req.params.id];
    pool.query(queryText, values)
    .then( (result) => {
        console.log(result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in all workflow GET ${error}`);
        res.sendStatus(500);
    });
});

// post new task to phase
router.post('/add-new-task', (req, res) => {
    console.log('in new task POST with', req.body);
    // // const phID = req.body.id;
    // // const name = req.body.task.name;
    // // const desc = req.body.task.description;
    // // const time = req.body.task.time;
    // // const seq = req.body.seq;
    // // const queryText = `INSERT INTO "default_tasks" ("name", "description", "phase_id", "sequence", "created") VALUES ($1, $2, $3, $4, $5)`;
    // // pool.query(queryText, [name, desc, phID, Number(seq), time])
    // .then(() => { 
    //     res.sendStatus(201)
    // }).catch((err) => {
    //   console.log('Error completing new task POST', err);
    //   res.sendStatus(500);
    // });
});

module.exports = router;
