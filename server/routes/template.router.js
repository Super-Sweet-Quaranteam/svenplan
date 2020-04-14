const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//no authentication for testing purposes
router.get('/', (req, res) => { 
    let queryText= `SELECT * FROM "users"`;
    // let values = 
    pool.query(queryText)
        .then((response)=>{
            console.log('successful get at /- response.rows:', response.rows);
            res.send(response.rows);
            })
        .catch(()=>{
            console.log('something went wrong in get at /');
            res.sendStatus(500);
            })
});

router.post('/', (req, res) => {
});

// all routes will need authentication eventually!
// queries/responses might depend on user level sent with req.body:
router.get('/', rejectUnauthenticated, (req, res) => {
});
router.post('/', rejectUnauthenticated, (req, res) => {
});

module.exports = router;
