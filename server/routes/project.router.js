const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();



router.get('/projects-table-info/:id', rejectUnauthenticated, (req, res) => {
    console.log('made it to project router, req.params is:', req.params.id)
    let taskId=req.params.id
    // const queryText = 'SELECT * FROM "teams";'
    // pool.query(queryText)
    //     .then((response) => {
    //         res.send(response.rows);
    //     })
    //     .catch(() => res.sendStatus(500));
});

module.exports = router;
