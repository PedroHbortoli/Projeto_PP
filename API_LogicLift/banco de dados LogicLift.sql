CREATE DATABASE logicLift;
USE logicLift;

CREATE TABLE usuarios(
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    foto_perfil LONGBLOB,
    xp_usuario INT,
    tutorial VARCHAR (255) DEFAULT 'incomplete'
);

CREATE TABLE elo_usuarios(
	id INT AUTO_INCREMENT PRIMARY KEY,
	elo ENUM ('ferro', 'bronze', 'prata', 'ouro', 'platina', 'esmeralda')
    DEFAULT 'ferro',
	FOREIGN KEY (id) REFERENCES usuarios(id)
);

CREATE TABLE pergunta (
    id_perguntas INT AUTO_INCREMENT PRIMARY KEY,
    ds_descricao VARCHAR(255),
    ds_dificuldade VARCHAR(255)
);

CREATE TABLE resposta (
    id_respostas INT AUTO_INCREMENT PRIMARY KEY,
    id_pergunta INT,
    ds_resposta VARCHAR(255),
    ds_certo VARCHAR(255),
    FOREIGN KEY (id_pergunta) REFERENCES pergunta(id_perguntas)
);

CREATE TABLE respostas_realizadas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    tarefa_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (tarefa_id) REFERENCES pergunta(id_perguntas)
);

SELECT * FROM usuarios;
SELECT * FROM elo_usuarios;
SELECT * FROM pergunta;
SELECT * FROM resposta;
SELECT * FROM respostas_realizadas;

-- Inserindo Perguntas
INSERT INTO pergunta (ds_descricao, ds_dificuldade)
VALUES
('Se um trem elétrico viaja para o norte a 100 km/h e o vento sopra para o sul a 50 km/h, para onde vai a fumaça?', 'Fácil'),
('Uma sala tem 3 interruptores fora dela. Dentro, há uma lâmpada. Como descobrir qual interruptor acende a lâmpada entrando na sala apenas uma vez?', 'Difícil'),
('Dois pais e dois filhos entram em um restaurante e comem três hambúrgueres. Cada um comeu um hambúrguer. Como isso é possível?', 'Médio'),
('Você tem duas cordas que levam exatamente uma hora para queimar, mas não queimam de forma uniforme. Como medir 45 minutos?', 'Difícil'),
('Se uma pessoa nasce no dia 31 de dezembro e faz aniversário um dia depois, quantos anos ela terá em 1º de janeiro?', 'Fácil'),
('O que vem a seguir nesta sequência? 2, 4, 8, 16, 32, ...', 'Fácil'),
('Você está em uma sala com duas portas. Um guarda sempre mente e o outro sempre diz a verdade. Como descobrir qual porta é a correta fazendo apenas uma pergunta?', 'Difícil'),
('Um fazendeiro tem 17 vacas. Todas, menos nove, morreram. Quantas sobraram?', 'Fácil'),
('Se cinco máquinas produzem cinco itens em cinco minutos, quanto tempo 100 máquinas levarão para produzir 100 itens?', 'Médio'),
('Três homens estão em um quarto escuro e cada um pega um chapéu. Eles não podem ver o chapéu que usam, mas veem os dos outros. Como descobrir a cor do próprio chapéu?', 'Difícil'),
('Uma caixa contém bolas pretas e brancas. Você tira duas bolas de uma vez. Se ambas forem pretas, você coloca uma bola branca na caixa. Se forem de cores diferentes, você devolve uma preta. Qual será a cor da última bola?', 'Difícil'),
('Você tem 3 galões: um de 8 litros cheio, outro de 5 litros vazio e um de 3 litros vazio. Como medir exatamente 4 litros?', 'Médio'),
('Se eu dobro a idade que tinha há dois anos, terei 22 anos. Qual é a minha idade agora?', 'Fácil'),
('Quantos segundos há em um ano?', 'Médio'),
('Se um ovo leva 5 minutos para cozinhar, quanto tempo leva para cozinhar 10 ovos?', 'Fácil'),
('Qual é o próximo número na sequência? 1, 1, 2, 3, 5, 8, ...', 'Fácil'),
('Você está em uma corrida e ultrapassa o segundo colocado. Qual é a sua posição agora?', 'Fácil'),
('Qual número, ao ser multiplicado por ele mesmo, dá como resultado 25?', 'Fácil'),
('Se um galo botar um ovo no telhado de uma casa inclinada, para onde o ovo rola?', 'Fácil'),
('Qual é o peso do bloco de ouro que mede 1x1x1?', 'Médio');

-- Inserindo Respostas
INSERT INTO resposta (id_pergunta, ds_resposta, ds_certo)
VALUES
-- Respostas para Pergunta 1
(1, 'Para lugar nenhum, trens elétricos não produzem fumaça.', 'V'),
(1, 'Para o norte, seguindo o trem.', 'F'),
(1, 'Para o sul, contra o trem.', 'F'),

-- Respostas para Pergunta 2
(2, 'Ligar um, esperar, ligar outro, desligar e entrar.', 'V'),
(2, 'Ligar os três e entrar.', 'F'),
(2, 'Entrar e testar um por um.', 'F'),

-- Respostas para Pergunta 3
(3, 'São avô, pai e filho.', 'V'),
(3, 'Comeram apenas metade de cada hambúrguer.', 'F'),
(3, 'É um erro lógico.', 'F'),

-- Respostas para Pergunta 4
(4, 'Queima uma corda nas duas pontas e outra em uma ponta.', 'V'),
(4, 'Corta as cordas ao meio.', 'F'),
(4, 'Queima as cordas em lados opostos.', 'F'),

-- Respostas para Pergunta 5
(5, 'Um ano.', 'V'),
(5, 'Dois anos.', 'F'),
(5, 'Nenhum ano.', 'F'),

-- Respostas para Pergunta 6
(6, '64.', 'V'),
(6, '48.', 'F'),
(6, '36.', 'F'),

-- Respostas para Pergunta 7
(7, 'Pergunto ao guarda o que o outro diria.', 'V'),
(7, 'Pergunto quem mente.', 'F'),
(7, 'Testo ambas as portas.', 'F'),

-- Respostas para Pergunta 8
(8, 'Nove.', 'V'),
(8, 'Oito.', 'F'),
(8, 'Sete.', 'F'),

-- Respostas para Pergunta 9
(9, 'Cinco minutos.', 'V'),
(9, 'Cem minutos.', 'F'),
(9, 'Dez minutos.', 'F'),

-- Respostas para Pergunta 10
(10, 'O que vê dois chapéus iguais deduz sua cor.', 'V'),
(10, 'Não há solução lógica.', 'F'),
(10, 'A primeira pessoa sempre acerta.', 'F'),

-- Respostas para Pergunta 11
(11, 'Branca.', 'V'),
(11, 'Preta.', 'F'),
(11, 'Depende do número inicial.', 'F'),

-- Respostas para Pergunta 12
(12, 'Enche o de 5 litros e transfere para o de 3.', 'V'),
(12, 'Divide igualmente entre eles.', 'F'),
(12, 'Faz medições alternadas.', 'F'),

-- Respostas para Pergunta 13
(13, '12 anos.', 'V'),
(13, '10 anos.', 'F'),
(13, '14 anos.', 'F'),

-- Respostas para Pergunta 14
(14, '12x30x24x60.', 'F'),
(14, '12.', 'V'),
(14, '365.', 'F'),

-- Respostas para Pergunta 15
(15, 'Cinco minutos.', 'V'),
(15, '50 minutos.', 'F'),
(15, '55 minutos.', 'F'),

-- Respostas para Pergunta 16
(16, '13.', 'V'),
(16, '21.', 'F'),
(16, '10.', 'F'),

-- Respostas para Pergunta 17
(17, 'Segundo.', 'V'),
(17, 'Primeiro.', 'F'),
(17, 'Terceiro.', 'F'),

-- Respostas para Pergunta 18
(18, '5.', 'V'),
(18, '25.', 'F'),
(18, '10.', 'F'),

-- Respostas para Pergunta 19
(19, 'Galos não botam ovos.', 'V'),
(19, 'Para o lado mais baixo.', 'F'),
(19, 'Para o lado mais alto.', 'F'),

-- Respostas para Pergunta 20
(20, 'Depende da densidade.', 'F'),
(20, '1 quilograma.', 'F'),
(20, '19,3 quilogramas.', 'V');

DROP DATABASE logiclift;