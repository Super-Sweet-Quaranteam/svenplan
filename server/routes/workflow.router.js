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
    const queryText = `SELECT "phases"."name" as ph_name, "phases"."description" as ph_description, 
    "phases"."sequence" as ph_sequence, "phases"."id" as ph_id
    FROM "workflows"
    JOIN "phases" ON "phases"."workflow_id" = "workflows".id
    WHERE "workflows"."id"=$1 ORDER BY "phases"."sequence" ASC;`;
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

// get requested phase
router.get('/phase/:id', (req, res) => {
    console.log('in GET this phase with id:', req.params.id)
    const queryText = `SELECT "phases"."name" as ph_name, "phases"."description" as ph_description,
    "default_tasks"."name" as task_name, "default_tasks"."description" as task_description, "phases"."id" as ph_id,
    "default_tasks"."sequence" as task_sequence, "default_tasks"."id" as task_id
    FROM "phases"
    FULL OUTER JOIN "default_tasks" ON "default_tasks"."phase_id" = "phases"."id"
    WHERE "phases"."id"=$1 ORDER BY "default_tasks"."sequence" ASC;`;
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

// set workflow name / description 
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

// set phase name / description 
router.put('/new-phase-name/:id', (req, res) => {
    console.log('in workflow name PUT with id:', req.body);
    const queryText = `UPDATE "phases" SET "name"=$1, "description"=$2, "edited"=$3 WHERE "id"=$4;`;
    pool.query(queryText, [req.body.phase.name, req.body.phase.description, req.body.phase.time, Number(req.body.phase.id)])
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in workflow-name edit: ${error}`);
        res.sendStatus(500);
    });
});

//post new phase to workflow
router.post('/add/phase', (req, res) => {
    console.log('in new phase POST with', req.body);
    const wfID = req.body.id;
    const name = req.body.phase.name;
    const desc = req.body.phase.description;
    const time = req.body.phase.time;
    const seq = req.body.sequence;
    const queryText = `INSERT INTO "phases" ("name", "description", "workflow_id", "sequence", "created") VALUES ($1, $2, $3, $4, $5)`;
    pool.query(queryText, [name, desc, wfID, Number(seq), time])
    .then(() => { 
        res.sendStatus(201)
    }).catch((err) => {
      console.log('Error completing new phase POST', err);
      res.sendStatus(500);
    });
});

//delete phase from db
router.delete('/remove/phase/:id', (req, res) => {
    console.log('in phase DELETE', req.params.id);
    const queryText = `DELETE FROM "phases" WHERE id=$1`;
    pool.query(queryText, [Number(req.params.id)])
    .then(() => {
      res.sendStatus(200);
    }).catch(err => {
        console.log("Error deleting phase", err);
        res.sendStatus(500);
      });
  });


module.exports = router;
