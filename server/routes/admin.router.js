const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get Client List
router.get('/client-list', (req, res) => {
    console.log('in admin GET clientList:')
    const queryText = `SELECT * FROM "users" ORDER BY "id" ASC;`;
    pool.query(queryText)
    .then( (result) => {
        console.table(result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in admin client list GET ${error}`);
        res.sendStatus(500);
    });
});


module.exports = router;