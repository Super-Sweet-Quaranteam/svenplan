const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();



router.get('/task/default-info/:id', rejectUnauthenticated, (req, res) => {
    let taskId=req.params.id
    const queryText = 'SELECT * FROM "default_tasks" WHERE "id"=$1;'
    pool.query(queryText, [taskId])
        .then((response) => {
            res.send(response.rows);
        })
        .catch(() => {
            console.log('something went wrong getting default info')
            res.sendStatus(500)
        });
});

router.get('/task/link-info/:id', rejectUnauthenticated, (req, res) => {
    let taskId = req.params.id
    const queryText = 'SELECT "links"."url" AS "url", "links"."description" AS "textToShow" FROM "links" WHERE "task_id"=$1;'
    pool.query(queryText, [taskId])
        .then((response) => {
            res.send(response.rows);
        })
        .catch(() => {
            console.log('something went wrong getting link info')
            res.sendStatus(500)
        });
});

router.get('/task/input-info/:id', rejectUnauthenticated, (req, res) => {
    let taskId = req.params.id
    const queryText = 'SELECT "inputs"."type" AS "inputType", "inputs"."prompt" AS "prompt" FROM "inputs" WHERE "task_id"=$1;'
    pool.query(queryText, [taskId])
        .then((response) => {
            res.send(response.rows);
        })
        .catch(() => {
            console.log('something went wrong getting input info')
            res.sendStatus(500)
        });
});

router.get('/task/risk-info/:id', rejectUnauthenticated, (req, res) => {
    let taskId = req.params.id
    const queryText = `SELECT "riskareas"."name" AS "riskarea", "riskareas"."id" AS "riskarea_id"
                        FROM "riskareas"
                        JOIN "tasks_riskareas" ON "tasks_riskareas"."riskarea_id"="riskareas"."id"
                        WHERE "tasks_riskareas"."task_id"=$1;
                        `;
    pool.query(queryText, [taskId])
        .then((response) => {
            res.send(response.rows);
        })
        .catch(() => {
            console.log('something went wrong getting risk info')
            res.sendStatus(500)
        });
});




router.get('/riskareas/:id', (req, res) => {
    console.log('in /haley-task/riskareas/:id get with id:', req.params.id);
    const queryText = `SELECT "riskareas"."name" AS "riskarea", "riskareas"."id" AS "id"
                        FROM "riskareas"
                        JOIN "workflows" ON "riskareas"."workflow_id"="workflows"."id"
                        JOIN "phases" ON "phases"."workflow_id"="workflows"."id"
                        WHERE "phases"."id"=$1;
                        `;
    const values = [req.params.id];
    pool.query(queryText, values)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error in all riskarea GET ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;
