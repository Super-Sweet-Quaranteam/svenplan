const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//no authentication for testing purposes
//these are just the queries from database.sql
//they are just meant to be a base for making relevant queries
    router.get('/existing-projects/:teamId', (req, res) => {       
        let teamId = req.params.teamId         
        let queryText = `SELECT * FROM "projects" WHERE "team_id"= $1`;
        pool.query(queryText, [teamId])
            .then((response) => {
                // console.log('successful get- response.rows:', response.rows);
                res.send(response.rows);
            })
            .catch(() => {
                console.log('something went wrong in get at /');
                res.sendStatus(500);
            })
    });//get task names for a certain project, and whether or not they're done.
    
    router.get('/current-workflow/phases/:projectId', (req, res) => {   
        let projectId = req.params.projectId        
        let queryText = `SELECT "phases"."id" AS "phase_id", "phases"."name" AS "phase_name", "phases"."description" AS "phases_desc", "workflows"."name" AS "workflow_name", "workflows"."description" AS "workflow_desc" FROM "phases"
        JOIN "workflows" ON "phases"."workflow_id" = "workflows"."id"
        JOIN "projects" ON "projects"."workflow_id" = "workflows"."id"
        WHERE "projects"."id"=$1; `
        pool.query(queryText, [projectId])
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
        // console.log('req.params is ', req.params.phaseId);
        let phaseId = req.params.phaseId;
        // let queryText = `SELECT * FROM "default_tasks" WHERE "phase_id"=$1`;
        let queryText = `SELECT "default_tasks"."sequence","default_tasks"."id","default_tasks"."name" AS "phase_name", "default_tasks"."description" AS "phase_description","inputs"."name", "inputs"."description","tasks_inputs"."instructions" FROM "default_tasks" 
        JOIN "tasks_inputs" ON "task_id" = "default_tasks"."id"
        JOIN "inputs" ON "inputs"."id" = "input_id" WHERE "default_tasks"."phase_id"=$1 ORDER BY "sequence","phase_id", "phase_name"`
        pool.query(queryText,[phaseId])
            .then((response) => {
                // console.log('successful get- response.rows:', response);
                res.send(response.rows);
            })
            .catch(() => {
                console.log('something went wrong in get at /');
                res.sendStatus(500);
            })
    });


router.post('/project', (req, res) => {
console.log(req.body.details)
    let queryText = `INSERT INTO "projects" ("name", "team_id", "workflow_id") VALUES ($1, $2, $3);`
    pool.query(queryText, [req.body.details.name, req.body.details.team, req.body.details.workflow])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch(() => {
            console.log('something went wrong in get at /');
            res.sendStatus(500);
        })
});

module.exports = router;
