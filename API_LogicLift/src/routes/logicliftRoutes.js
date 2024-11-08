const { Router } = require('express');
const router = Router();

const { storeUser, getUser, loginUser, infoUser } = require('../controller/userController');
 
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Cadastrar usuário
 *     description: Registra um novo usuário no sistema com email e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               senha:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
 
router.post('/store/user', storeUser);
 
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login do usuário
 *     description: Realiza login do usuário com email e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               senha:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       example: "João"
 */
 
router.get('/get/user', getUser);
 
/**
 * @swagger
 * /api/score:
 *   post:
 *     summary: Salva a pontuação do usuário
 *     description: Salva a pontuação máxima do usuário em um jogo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               pontuacao:
 *                 type: integer
 *                 example: 9999
 *     responses:
 *       200:
 *         description: Highscore salvo com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
 
router.post('/login/user', loginUser);
 
/**
 * @swagger
 * /api/highScore:
 *   post:
 *     summary: Pontuação máxima do usuário
 *     description: Retorna a pontuação máxima do usuário em cada jogo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Pontuações carregadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   jogo:
 *                     type: string
 *                     example: "Pacman"
 *                   pontuacao:
 *                     type: integer
 *                     example: 1500
 */
 
router.get('/get/infoUser', infoUser);
 
const { storeElo} = require('../controller/eloController');

/**
 * @swagger
 * /api/highScore:
 *   post:
 *     summary: Pontuação máxima do usuário
 *     description: Retorna a pontuação máxima do usuário em cada jogo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Pontuações carregadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   jogo:
 *                     type: string
 *                     example: "Pacman"
 *                   pontuacao:
 *                     type: integer
 *                     example: 1500
 */
 
router.post('/store/elo', storeElo)

const { storeNivel, getNivel} = require('../controller/nivelController');

/**
 * @swagger
 * /api/highScore:
 *   post:
 *     summary: Pontuação máxima do usuário
 *     description: Retorna a pontuação máxima do usuário em cada jogo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Pontuações carregadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   jogo:
 *                     type: string
 *                     example: "Pacman"
 *                   pontuacao:
 *                     type: integer
 *                     example: 1500
 */
 
router.post('/store/nivel', storeNivel);

/**
 * @swagger
 * /api/highScore:
 *   post:
 *     summary: Pontuação máxima do usuário
 *     description: Retorna a pontuação máxima do usuário em cada jogo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Pontuações carregadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   jogo:
 *                     type: string
 *                     example: "Pacman"
 *                   pontuacao:
 *                     type: integer
 *                     example: 1500
 */
 
router.get('/getNivel', getNivel);

module.exports = router;
 