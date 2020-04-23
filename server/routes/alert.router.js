const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET Alert List
router.get('/list/all', (req, res) => {
    console.log('in alert GET all alerts:')
    const queryText = `SELECT * FROM "alerts" ORDER BY "id" ASC;`;
    pool.query(queryText)
    .then( (result) => {
        console.table(result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in alert list GET ${error}`);
        res.sendStatus(500);
    });
});

// SET alert resolved 
router.put('/resolve/:id', (req, res) => {
    console.log('in resolve alert PUT with id:', req.params.id);
    const queryText = `UPDATE "alerts" SET "resolved"=true WHERE "id"=$1;`;
    pool.query(queryText, [Number(req.params.id)])
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in resolve alert PUT: ${error}`);
        res.sendStatus(500);
    });
});


module.exports = router;