const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// get Alert List
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


module.exports = router;