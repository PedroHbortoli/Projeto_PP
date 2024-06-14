const { Router } = require('express');
const router = Router();

const { storeUser } = require('../controller/userController');

router.post('/store/user', storeUser);

const { storeElo} = require('../controller/eloController');

router.post('/store/elo', storeElo)

module.exports = router;