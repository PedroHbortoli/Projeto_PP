const { Router } = require('express');
const router = Router();

const { storeUser, getUser, loginUser, updateUser} = require('../controller/userController');

/**
* @swagger
* /API_LogicLift/store/user:
*  post:
*    summary: Cadastrar usuário
*    description: Registra um novo usuário no sistema com email e senha.
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            type: object
*            properties:
*              email:
*                type: string
*                example: "user@example.com"
*              senha:
*                type: string
*                example: "password123"
*    responses:
*      200:
*        description: Usuário cadastrado com sucesso.
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
*                message:
*                  type: string
*/
 
router.post('/store/user', storeUser);
 
/**
 * @swagger
 * /API_LogicLift/get/user:
 *   get:
 *     summary: Pega informação do usuario
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
 * /API_LogicLift/login/user:
 *   get:
 *     summary: Pega o usuario
 *     description: Pega o usuario
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
 *         description: Login bem-sucedido.
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

router.post('/login/user', loginUser);

router.put('/update/user', updateUser);

const { storeElo } = require('../controller/eloController');

/**
 * @swagger
 * /API_LogicLift/store/elo:
 *   post:
 *     summary: Armazena o elo
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

const { storeNivel, getNivel } = require('../controller/nivelController');

/**
 * @swagger
 * /API_LogicLift/store/nivel:
 *   post:
 *     summary: Armazena os níveis
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
 * /API_LogicLift/getNivel:
 *   get:
 *     summary: Pega os níveis
 *     description: Pega o nível no banco de dados
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
