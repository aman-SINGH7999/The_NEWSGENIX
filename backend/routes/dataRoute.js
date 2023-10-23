const express = require('express')
const router = express.Router();
const {allData, getnews} = require('../controller/dataController')

router.get('/',allData);
router.get('/news',getnews)

module.exports = router