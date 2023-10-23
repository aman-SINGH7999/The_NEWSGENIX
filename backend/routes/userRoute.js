const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const {loginUser,registerUser,allReporters,create,remove,deleteReporter} = require('../controller/userController')


router.post('/',loginUser);
router.post('/signup',registerUser);
router.get('/reporters', auth, allReporters);
router.get('/reporters/create', auth, create);
router.get('/reporters/remove', auth, remove);
router.get('/reporters/delete', auth, deleteReporter);

module.exports = router