const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get all workflows
router.get('/all', (req, res) => {
    console.log('in workflow GET all')
     const queryText = `SELECT * FROM "workflows" ORDER BY "id" ASC;`;
    pool.query(queryText)
    .then( (result) => {
        console.log(result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in all workflow GET ${error}`);
        res.sendStatus(500);
    });
});

// get requested workflow
router.get('/requested/:id', (req, res) => {
    console.log('in GET this workflow with id:', req.params.id)
    const queryText = `SELECT "phases"."name" as ph_name, "phases"."description" as ph_description, "phases"."sequence" as ph_sequence
    FROM "workflows"
    join "phases" on "phases"."workflow_id" = "workflows".id
    WHERE "workflows"."id"=$1 order by "phases"."sequence" ASC;`;
    pool.query(queryText, [req.params.id])
    .then( (result) => {
        console.log(result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error GET this workflow ${error}`);
        res.sendStatus(500);
    });
});

// get requested workflow
router.get('/phase/:id', (req, res) => {
    console.log('in GET this phase with id:', req.params.id)
    const queryText = `SELECT "phases"."name" as ph_name, "default_tasks"."name" as task_name, "default_tasks"."description" as task_description, "default_tasks"."sequence" as task_sequence
    FROM "phases"
    join "default_tasks" on "default_tasks"."phase_id" = "phases"."id"
    WHERE "phases"."id"=$1 order by "default_tasks"."sequence" ASC;;`;
    pool.query(queryText, [req.params.id])
    .then( (result) => {
        console.log(result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error GET this phase ${error}`);
        res.sendStatus(500);
    });
});

//set workflow name / description 
router.put('/new-wf-name/:id', (req, res) => {
    console.log('in workflow name PUT with id:', req.params.id, req.body);
    const queryText = `UPDATE "workflows" SET "name"=$1, "description"=$2, "edited"=$3 WHERE "id"=$4;`;
    pool.query(queryText, [req.body.name, req.body.description, req.body.time, Number(req.params.id)])
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in workflow-name edit: ${error}`);
        res.sendStatus(500);
    });
});

module.exports = router;