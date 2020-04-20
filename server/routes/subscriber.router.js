const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//no authentication for testing purposes
//these are just the queries from database.sql
//they are just meant to be a base for making relevant queries
    router.get('/existing-projects', (req, res) => {        
        let queryText = `SELECT * FROM "projects" WHERE "team_id"= 2`;
        pool.query(queryText)
            .then((response) => {
                // console.log('successful get- response.rows:', response.rows);
                res.send(response.rows);
            })
            .catch(() => {
                console.log('something went wrong in get at /');
                res.sendStatus(500);
            })
    });//get task names for a certain project, and whether or not they're done.
    
    router.get('/current-workflow/phases', (req, res) => {   
        // workflow_id hardcoded for now -- will need to sanitize and make variable     
        let queryText = `SELECT * FROM "phases" WHERE "workflow_id"=5`;
        pool.query(queryText)
            .then((response) => {
                // console.log('successful get- response.rows:', response.rows);
                res.send(response.rows);
            })
            .catch(() => {
                console.log('something went wrong in get at /');
                res.sendStatus(500);
            })
    });

    router.get('/current-workflow/phases/tasks/:phaseId', (req, res) => {   
        console.log('req.params is ', req.params.phaseId);
        let phaseId = req.params.phaseId;
        // let queryText = `SELECT * FROM "default_tasks" WHERE "phase_id"=$1`;
        let queryText = `SELECT "default_tasks"."id","default_tasks"."name" AS "phase_name", "default_tasks"."description" AS "phase_description","inputs"."name", "inputs"."description","tasks_inputs"."instructions" FROM "default_tasks" 
        JOIN "tasks_inputs" ON "task_id" = "default_tasks"."id"
        JOIN "inputs" ON "inputs"."id" = "input_id" WHERE "default_tasks"."phase_id"=$1`
        pool.query(queryText,[phaseId])
            .then((response) => {
                console.log('successful get- response.rows:', response);
                res.send(response.rows);
            })
            .catch(() => {
                console.log('something went wrong in get at /');
                res.sendStatus(500);
            })
    });

module.exports = router;
