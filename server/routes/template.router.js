const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//no authentication for testing purposes
//these are just the queries from database.sql
//they are just meant to be a base for making relevant queries
    router.get('/tasks-in-a-project', (req, res) => {
        let arbitraryProjectID= 1;
        let queryText = `SELECT "default_tasks"."name" AS "task_name", "assigned_tasks"."completed"
                        FROM "default_tasks" JOIN "assigned_tasks" ON
                        "default_tasks"."id"="assigned_tasks"."default_id"
                        WHERE  "assigned_tasks"."project_id"=$1;`;
        let values = [arbitraryProjectID];
        pool.query(queryText, values)
            .then((response) => {
                console.log('successful get- response.rows:', response.rows);
                res.send(response.rows);
            })
            .catch(() => {
                console.log('something went wrong in get at /');
                res.sendStatus(500);
            })
    });//get task names for a certain project, and whether or not they're done.
    router.get('/riskareas-in-a-workflow', (req, res) => {
        let queryText = `SELECT "workflows"."name" AS "workflow", COUNT(*) AS "number_of_risk_areas"
                        FROM "workflows" JOIN "riskareas"
                        ON "riskareas"."workflow_id"="workflows"."id"
                        GROUP BY "workflows"."name";`;
                        //(it won't show counts of 0)
        pool.query(queryText)
            .then((response) => {
                console.log('successful get- response.rows:', response.rows);
                res.send(response.rows);
            })
            .catch(() => {
                console.log('something went wrong in get at /');
                res.sendStatus(500);
            })
    });//get the number of risk areas per workflow(this will be how many radial axes in risk chart)
    router.get('/tasks-in-a-riskarea', (req, res) => {
        let queryText = `SELECT "riskareas"."name" AS "riskarea", COUNT(*) AS "number_of_tasks"
                        FROM "riskareas"
                        JOIN "tasks_riskareas" ON "tasks_riskareas"."riskarea_id"="riskareas"."id"
                        JOIN "default_tasks" ON "default_tasks"."id"="tasks_riskareas"."task_id"
                        GROUP BY "riskareas"."name";`;
        //(it won't show counts of 0)
        pool.query(queryText)
            .then((response) => {
                console.log('successful get- response.rows:', response.rows);
                res.send(response.rows);
            })
            .catch(() => {
                console.log('something went wrong in get at /');
                res.sendStatus(500);
            })
    });//get the number of tasks per risk area per workflow(this will help calculate how much risk is removed with completion of a task in a certian risk category)
    router.get('/notes-on-a-task', (req, res) => {
        let arbitraryTaskID = 1;
        let queryText = `SELECT "notes"."text" AS "note", "users"."username" AS "user", "notes"."timestamp" AS "time"
                        FROM "notes" JOIN "users"
                        ON "notes"."user_id"="users"."id"
                        WHERE "notes"."task_id"=$1
                        ORDER BY "timestamp";`;
        let values = [arbitraryTaskID];
        pool.query(queryText, values)
            .then((response) => {
                console.log('successful get- response.rows:', response.rows);
                res.send(response.rows);
            })
            .catch(() => {
                console.log('something went wrong in get at /');
                res.sendStatus(500);
            })
    });//get comments and who left them and at what time from oldest to newest, on a certain task





    router.post('/', (req, res) => {
});

// all routes will need authentication eventually!
// queries/responses might depend on user level sent with req.body:
router.get('/', rejectUnauthenticated, (req, res) => {
});
router.post('/', rejectUnauthenticated, (req, res) => {
});

module.exports = router;
