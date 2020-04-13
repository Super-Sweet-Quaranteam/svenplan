const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//no authentication
router.get('/', (req, res) => { 
});

router.post('/', (req, res) => {
});

// with authentication:
router.get('/', rejectUnauthenticated, (req, res) => {
});
router.post('/', rejectUnauthenticated, (req, res) => {
});

module.exports = router;
