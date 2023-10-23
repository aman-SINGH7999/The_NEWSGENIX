const express = require('express')
const {addNews, updateNews, deleteNews, allNews, getnews} = require('../controller/newsController')
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/addnews', auth,addNews);
router.get('/allnews', auth,allNews);
router.get('/delete', auth,deleteNews);
router.post('/update', auth,updateNews);
router.get('/getnews/', auth,getnews);

module.exports = router;