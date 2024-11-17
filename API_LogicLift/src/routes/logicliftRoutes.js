const { Router } = require('express');
const router = Router();

const { storeUser, getUser, loginUser, updateUser, getImage, updateTutorial, checkTutorial} = require('../controller/userController');

/**
 * @swagger
 * /API_LogicLift/store/user:
 *   post:
 *     summary: Cadastrar usuário
 *     description: Registra um novo usuário no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
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
 * /API_LogicLift/get/user:
 *   get:
 *     summary: Obter informações do usuário
 *     description: Retorna os dados do usuário pelo ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário.
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     elo:
 *                       type: integer
 */

router.get('/get/user', getUser);

/**
 * @swagger
 * /API_LogicLift/login/user:
 *   post:
 *     summary: Login de usuário
 *     description: Realiza login de um usuário com email e senha.
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
 *               password:
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 */

router.post('/login/user', loginUser);

/**
 * @swagger
 * /API_LogicLift/update/user:
 *   put:
 *     summary: Atualizar usuário
 *     description: Atualiza os dados do usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *                 example: "João"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Dados do usuário atualizados com sucesso.
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

router.put('/update/user', updateUser);

/**
 * @swagger
 * /API_LogicLift/getImage/{id}:
 *   get:
 *     summary: Obter imagem do usuário
 *     description: Retorna a imagem de perfil do usuário pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário.
 *     responses:
 *       200:
 *         description: Imagem retornada com sucesso.
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 */

router.get('/getImage/:id', getImage);

/**
 * @swagger
 * /API_LogicLift/post/tutorial:
 *   post:
 *     summary: Atualizar status do tutorial
 *     description: Atualiza o status de conclusão do tutorial do usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               tutorial:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Status do tutorial atualizado com sucesso.
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

router.post('/post/tutorial', updateTutorial);

/**
 * @swagger
 * /API_LogicLift/check/tutorial:
 *   get:
 *     summary: Verificar status do tutorial
 *     description: Retorna o status de conclusão do tutorial do usuário.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário.
 *     responses:
 *       200:
 *         description: Status do tutorial retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: boolean
 */

router.get('/check/tutorial', checkTutorial);

const { storeElo, updateXP, getAllUsers } = require('../controller/eloController');

/**
 * @swagger
 * /API_LogicLift/store/elo:
 *   post:
 *     summary: Armazenar ELO do usuário
 *     description: Insere a pontuação do usuário em um jogo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               elo:
 *                 type: integer
 *                 example: 1200
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Pontuação armazenada com sucesso.
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

router.post('/store/elo', storeElo)

/**
 * @swagger
 * /API_LogicLift/updateXP:
 *   post:
 *     summary: Atualizar XP do usuário
 *     description: Incrementa o XP do usuário com base no ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: integer
 *                 example: 1
 *               xpAdicional:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       200:
 *         description: XP atualizado com sucesso.
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

router.post('/updateXP', updateXP);

/**
 * @swagger
 * /getUsers:
 *   get:
 *     summary: Obter todos os usuários
 *     description: Retorna uma lista de todos os usuários com seus elos e XP.
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                     description: ID único do usuário.
 *                   nome:
 *                     type: string
 *                     example: "João Silva"
 *                     description: Nome completo do usuário.
 *                   email:
 *                     type: string
 *                     example: "joao.silva@email.com"
 *                     description: Endereço de email do usuário.
 *                   xp_usuario:
 *                     type: integer
 *                     example: 150
 *                     description: Quantidade de XP do usuário.
 *                   elo:
 *                     type: string
 *                     example: "bronze"
 *                     description: Elo atual do usuário.
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar os usuários."
 */
router.get('/getUsers', getAllUsers);


const { storeNivel, getNivel } = require('../controller/nivelController');

/**
 * @swagger
 * /API_LogicLift/store/nivel:
 *   post:
 *     summary: Armazenar nível
 *     description: Insere uma pergunta com suas respectivas respostas e dificuldade.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *                 example: "Qual é a capital da França?"
 *               qtdeRespostas:
 *                 type: integer
 *                 example: 4
 *               respostaCerta:
 *                 type: integer
 *                 example: 1
 *               dificuldade:
 *                 type: string
 *                 example: "Fácil"
 *               respostas:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "Paris"
 *     responses:
 *       201:
 *         description: Nível armazenado com sucesso.
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
router.post('/store/nivel', storeNivel);


/**
 * @swagger
 * /API_LogicLift/getNivel:
 *   get:
 *     summary: Obter níveis
 *     description: Retorna as perguntas com suas respostas e dificuldades.
 *     responses:
 *       200:
 *         description: Níveis retornados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       descricao:
 *                         type: string
 *                       respostas:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             texto:
 *                               type: string
 *                             correta:
 *                               type: boolean
 */

router.get('/getNivel', getNivel);

module.exports = router;
