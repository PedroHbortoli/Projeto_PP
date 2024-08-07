const { Router } = require('express');
const router = Router();

const { storeUser, getUser} = require('../controller/userController');

router.post('/store/user', storeUser);
router.get('/get/user', getUser)

const { storeElo} = require('../controller/eloController');

router.post('/store/elo', storeElo)

module.exports = router;