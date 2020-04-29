const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get Client List
router.get('/client-list', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "users" ORDER BY "id" ASC;`;
    pool.query(queryText)
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error in admin client list GET ${error}`);
        res.sendStatus(500);
    });
});


module.exports = router;