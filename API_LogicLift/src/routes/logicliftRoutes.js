const { Router } = require('express');
const router = Router();

const { storeUser, getUser, loginUser, infoUser } = require('../controller/userController');

router.post('/store/user', storeUser);
router.get('/get/user', getUser);
router.post('/login/user', loginUser);
router.get('/get/infoUser', infoUser);

const { storeElo} = require('../controller/eloController');

router.post('/store/elo', storeElo)

const { storeNivel, getNivel} = require('../controller/nivelController');

router.post('/store/nivel', storeNivel);
router.get('/getNivel', getNivel); // Corrigido aqui

module.exports = router;