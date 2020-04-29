const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get all workflows

router.get('/all', rejectUnauthenticated, (req, res) => {
    console.log('in workflow GET all')

     const queryText = `SELECT * FROM "workflows" ORDER BY "id" ASC;`;
    pool.query(queryText)
    .then( (result) => {
        // console.log(result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in all workflow GET ${error}`);
        res.sendStatus(500);
    });
});

// get team workflows


router.get('/team/:team', rejectUnauthenticated, (req, res) => {
    console.log('in workflow GET team', req.params)

    const queryText = `SELECT * FROM "workflows" WHERE "team_id"=$1 ORDER BY "id" ASC;`;
    pool.query(queryText, [req.params.team])
        .then((result) => {
            // console.log(result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error in all workflow GET ${error}`);
            res.sendStatus(500);
        });
});

// get requested workflow

router.get('/requested/:id', rejectUnauthenticated, (req, res) => {
    console.log('in GET this workflow with id:', req.params.id)

    const queryText = `SELECT "phases"."name" as ph_name, "phases"."description" as ph_description, 
    "phases"."sequence" as ph_sequence, "phases"."id" as ph_id, "workflows"."id" as wf_id,
    "workflows"."name" as wf_name, "workflows"."description" as wf_desc
    FROM "workflows"
    FULL OUTER JOIN "phases" ON "phases"."workflow_id" = "workflows".id
    WHERE "workflows"."id"=$1 ORDER BY "phases"."sequence" ASC;`;
    pool.query(queryText, [req.params.id])
    .then( (result) => {
        // console.log(result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error GET this workflow ${error}`);
        res.sendStatus(500);
    });
});

// get requested phase

router.get('/phase/:id', rejectUnauthenticated, (req, res) => {
    console.log('in GET this phase with id:', req.params.id)

    const queryText = `SELECT "phases"."name" as ph_name, "phases"."description" as ph_description,
    "phases"."sequence" as ph_sequence, "default_tasks"."name" as task_name, "default_tasks"."description" as task_description,
    "phases"."id" as ph_id, "default_tasks"."sequence" as task_sequence, "default_tasks"."id" as task_id
    FROM "phases"
    FULL OUTER JOIN "default_tasks" ON "default_tasks"."phase_id" = "phases"."id"
    WHERE "phases"."id"=$1 ORDER BY "default_tasks"."sequence" ASC;`;
    pool.query(queryText, [req.params.id])
    .then( (result) => {
        // console.log(result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error GET this phase ${error}`);
        res.sendStatus(500);
    });
});

// get requested task
router.get('/task/:id', rejectUnauthenticated, (req, res) => {
    console.log('in GET this task with id:', req.params.id)
    const queryText = `SELECT "default_tasks"."name" as task_name, "default_tasks"."description" as task_description,
    "default_tasks"."sequence" as task_sequence, "default_tasks"."id" as task_id,
    "phase_id" as ph_id, "types"."name" as type_name, "types"."description" as type_description
    FROM "types"
    FULL OUTER JOIN "tasks_types" ON "tasks_types"."type_id" = "types"."id"
    FULL OUTER JOIN "default_tasks" ON "default_tasks"."id" = "tasks_types"."task_id"
    WHERE "default_tasks"."id"=$1 ORDER BY "default_tasks"."sequence" ASC;`;
    pool.query(queryText, [req.params.id])
    .then( (result) => {
        console.log(result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error GET this task ${error}`);
        res.sendStatus(500);
    });
});

// set workflow name / description 
router.put('/new-wf-name/:id', rejectUnauthenticated, (req, res) => {
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
router.put('/new-phase-name/:id', rejectUnauthenticated, (req, res) => {
    console.log('in phase name PUT with id:', req.body);
    const queryText = `UPDATE "phases" SET "name"=$1, "description"=$2, "edited"=$3 WHERE "id"=$4;`;
    pool.query(queryText, [req.body.phase.name, req.body.phase.description, req.body.phase.time, Number(req.body.phase.id)])
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in phase-name edit: ${error}`);
        res.sendStatus(500);
    });
});

// set task name / description 
router.put('/new-task-name/:id', rejectUnauthenticated, (req, res) => {
    console.log('in task name PUT with id:', req.body);
    const queryText = `UPDATE "default_tasks" SET "name"=$1, "description"=$2, "phase_id"=$3,"edited"=$4 WHERE "id"=$5;`;
    pool.query(queryText, [req.body.task.name, req.body.task.description, Number(req.body.id), req.body.task.time, Number(req.body.task.id)])
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in task-name edit: ${error}`);
        res.sendStatus(500);
    });
});

// post new phase to workflow
router.post('/add/phase', rejectUnauthenticated, (req, res) => {
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

// post new task to phase
router.post('/add/task', rejectUnauthenticated, (req, res) => {
    console.log('in new task POST with', req.body);
    const phID = req.body.id;
    const name = req.body.task.name;
    const desc = req.body.task.description;
    const time = req.body.task.time;
    const seq = req.body.seq;
    const queryText = `INSERT INTO "default_tasks" ("name", "description", "phase_id", "sequence", "created") VALUES ($1, $2, $3, $4, $5)`;
    pool.query(queryText, [name, desc, phID, Number(seq), time])
    .then(() => { 
        res.sendStatus(201)
    }).catch((err) => {
      console.log('Error completing new task POST', err);
      res.sendStatus(500);
    });
});

// post new workflow to db
router.post('/add/workflow', rejectUnauthenticated, (req, res) => {
    console.log('in new workflow POST with', req.body);
    const name = req.body.name;
    const desc = req.body.description;
    const time = req.body.time;
    const teamId = req.body.team_id;
    const queryText = `INSERT INTO "workflows" ("name", "description", "created", "team_id") VALUES ($1, $2, $3, $4)`;
    pool.query(queryText, [name, desc, time, teamId])
    .then(() => { 
        res.sendStatus(201)
    }).catch((err) => {
      console.log('Error completing new workflow POST', err);
      res.sendStatus(500);
    });
});

// delete task from db
router.delete('/remove/task/:id', rejectUnauthenticated, (req, res) => {
    console.log('in task DELETE', req.params.id);
    const queryText = `DELETE FROM "default_tasks" WHERE id=$1`;
    pool.query(queryText, [Number(req.params.id)])
    .then(() => {
      res.sendStatus(200);
    }).catch(err => {
        console.log("Error deleting task", err);
        res.sendStatus(500);
      });
  });

// delete phase from db
router.delete('/remove/phase/:id', rejectUnauthenticated, (req, res) => {
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

// delete workflow from db
router.delete('/remove/workflow/:id', rejectUnauthenticated, (req, res) => {
    console.log('in workflow DELETE', req.params.id);
    const queryText = `DELETE FROM "workflows" WHERE id=$1`;
    pool.query(queryText, [Number(req.params.id)])
    .then(() => {
      res.sendStatus(200);
    }).catch(err => {
        console.log("Error deleting workflow", err);
        res.sendStatus(500);
      });
  });

// set workflow to published
router.put('/publish/:id', rejectUnauthenticated, (req, res) => {
    console.log('in workflow publish PUT with id:', req.params.id);
    const queryText = `UPDATE "workflows" SET "published"=true WHERE "id"=$1;`;
    pool.query(queryText, [Number(req.params.id)])
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in workflow publish: ${error}`);
        res.sendStatus(500);
    });
});

// get all task option types
router.get('/all/task/options', rejectUnauthenticated, (req, res) => {
    console.log('in task options GET all')
    const queryText = `SELECT * FROM "inputs" ORDER BY "id" ASC;`;
    pool.query(queryText)
    .then( (result) => {
        console.table(result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in all task options GET ${error}`);
        res.sendStatus(500);
    });
});

// get all riskareas

router.get('/riskareas/:id', rejectUnauthenticated, (req, res) => {
    console.log('in /riskareas/:id get with id:', req.params.id);

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


router.get('/assigned-task/:id', rejectUnauthenticated, (req, res) => {
    console.log('in /assigned-task/:id get with id:', req.params.id);

    const queryText = `SELECT "default_tasks"."name" AS "task_name", 
                        "default_tasks"."description" AS "task_description",
                        "assigned_tasks"."completed" 
                        FROM "default_tasks" JOIN "assigned_tasks" ON
                        "default_tasks"."id"="assigned_tasks"."default_id" 
                        WHERE  "assigned_tasks"."id"=$1;
                        `;
    const values = [req.params.id];
    pool.query(queryText, values)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error in assigned task GET ${error}`);
            res.sendStatus(500);
        });
});

// get all riskareas

router.get('/assigned-task/inputs/:id', rejectUnauthenticated, (req, res) => {
    console.log('in /riskareas/:id get with id:', req.params.id);

    const queryText = `SELECT "inputs"."type" AS "inputType", "inputs"."prompt" AS "prompt"
                        FROM "inputs"
                        JOIN "assigned_tasks" ON "inputs"."task_id"="assigned_tasks"."id"
                        WHERE "assigned_tasks"."id"=$1;
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

// post new task to phase
router.post('/add-new-task', rejectUnauthenticated, async (req, res) => {
    const phaseId= req.body.phaseId;
    const title= req.body.title;
    const riskareasArray= req.body.riskareas;
    const sequence = req.body.sequence;
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
        const queryTextForTasksTable = `INSERT INTO "default_tasks" ("name", "description", "phase_id", "sequence", "created") VALUES ($1, $2, $3, $4, NOW()) RETURNING id`;
        const valuesForTasksTable = [title, description, phaseId, sequence];
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

router.post('/add-new-assigned-task', rejectUnauthenticated, async (req, res) => {
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
