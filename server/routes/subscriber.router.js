const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//no authentication for testing purposes
//these are just the queries from database.sql
//they are just meant to be a base for making relevant queries
    router.get('/existing-projects', (req, res) => {
        let arbitraryProjectID= 10;
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


module.exports = router;
