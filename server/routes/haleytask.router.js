const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get all riskareas
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
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in all riskarea GET ${error}`);
        res.sendStatus(500);
    });
});

// post new task to phase
router.post('/add-new-task', async (req, res) => {
    const phaseId= req.body.phaseId;
    const title= req.body.title;
    const riskareasArray= req.body.riskareas;
    const description= req.body.description;
    const linksArray= req.body.links;
    const inputsArray= req.body.inputs;

    console.log('posting task info to multiple tables');

    // We need to use the same connection for all queries... 
    //(this is pretty much all from wk16 chien syllabus notes)
    const connection = await pool.connect()
    // Using basic JavaScript try/catch/finally 
    try {
        await connection.query('BEGIN');
        //insert some things into default_tasks table and get the id from it
        const queryTextForTasksTable = `INSERT INTO "default_tasks" ("name", "description", "phase_id", "created") VALUES ($1, $2, $3, NOW()) RETURNING id`;
        const valuesForTasksTable = [title, description, phaseId];
        const newTaskId = await connection.query(queryTextForTasksTable, valuesForTasksTable);
        console.log('newTaskId is', newTaskId);
        console.log('newTaskId is', newTaskId.rows[0].id);

        //use newTaskId to populate links table
        //for loop because there might be multiple
        const queryTextForLinksTable = `INSERT INTO "links"("description", "url", "task_id") VALUES ($1, $2, $3);`
        for (let i=0; i<linksArray.length; i++){
            await connection.query(queryTextForLinksTable, [linksArray[i].description, linksArray[i].url, newTaskId.rows[0].id]);
            }
        //use newTaskId to populate inputs table
        //for loop because there might be multiple
        const queryTextForInputsTable = `INSERT INTO "inputs"("type", "prompt", "task_id") VALUES ($1, $2, $3);`
        for (let i = 0; i < inputsArray.length; i++) {
            await connection.query(queryTextForInputsTable, [inputsArray[i].type, inputsArray[i].prompt, newTaskId.rows[0].id]);
            }
        //use newTaskId to populate tasks_riskareas table
        //for loop because there might be multiple
        const queryTextForTasksRiskareasTable = `INSERT INTO "tasks_riskareas"("riskarea_id", "task_id") VALUES ($1, $2);`
        for (let i = 0; i < riskareasArray.length; i++) {
            await connection.query(queryTextForTasksRiskareasTable, [riskareasArray[i], newTaskId.rows[0].id]);
            }
        //if everything goes through, then send it all through and send 'OK'
        await connection.query('COMMIT');
        res.send({ newTaskId: newTaskId.rows[0].id})
        // res.sendStatus(200);
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log(`Transaction Error - Rolling back transfer`, error);
        res.sendStatus(500);
    } finally {
        // Always runs - both after successful try & after catch
        // Put the client connection back in the pool
        // This is super important! 
        connection.release()
    }
});

// post new task to phase
router.post('/add-new-assigned-task', async (req, res) => {
    console.log('req.body is:', req.body);
    const defaultId = req.body.id;
    const projectId = 1;
    // We need to use the same connection for all queries... 
    //(this is pretty much all from wk16 chien syllabus notes)
    const connection = await pool.connect()
    // Using basic JavaScript try/catch/finally 
    try {
        //insert some things into default_tasks table and get the id from it
        const queryTextForTasksTable = `INSERT INTO "assigned_tasks" ("default_id", "project_id") VALUES ($1, $2) RETURNING id`;
        const valuesForTasksTable = [defaultId, projectId];
        const newTaskId = await connection.query(queryTextForTasksTable, valuesForTasksTable);
        // console.log('newTaskId is', newTaskId);
        console.log('newTaskId is', newTaskId.rows[0].id);

        res.send({ newTaskId: newTaskId.rows[0].id })
        // res.sendStatus(200);
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log(`Transaction Error - Rolling back transfer`, error);
        res.sendStatus(500);
    } finally {
        // Always runs - both after successful try & after catch
        // Put the client connection back in the pool
        // This is super important! 
        connection.release()
    }
});

module.exports = router;
