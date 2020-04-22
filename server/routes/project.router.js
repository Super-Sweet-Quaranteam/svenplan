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

module.exports = router;
