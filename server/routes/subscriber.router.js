const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//no authentication for testing purposes
//these are just the queries from database.sql
//they are just meant to be a base for making relevant queries
    router.get('/existing-projects', (req, res) => {
        res.send('ZipZapZop');
        
        // let arbitraryProjectID= 10;
        // let queryText = ``;
        // pool.query(queryText, [arbitraryProjectID])
        //     .then((response) => {
        //         console.log('successful get- response.rows:', response.rows);
        //         res.send(response.rows);
        //     })
        //     .catch(() => {
        //         console.log('something went wrong in get at /');
        //         res.sendStatus(500);
        //     })
    });//get task names for a certain project, and whether or not they're done.


module.exports = router;
