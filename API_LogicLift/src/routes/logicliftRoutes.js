const { Router } = require('express');
const router = Router();

const { storeUser } = require('../controller/userController');

router.post('/store/user', storeUser);

module.exports = router;