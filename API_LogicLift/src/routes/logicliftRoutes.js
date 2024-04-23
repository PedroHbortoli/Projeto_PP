const { Router } = require('express');
const router = Router();

const { storeUser } = require('../controller/userCountroller');

router.post('/store/user', storeUser);

module.exports = router;