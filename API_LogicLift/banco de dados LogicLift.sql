CREATE DATABASE logicLift;
USE logicLift;

CREATE TABLE usuarios(
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    foto_perfil BLOB,
    xp_usuario INT
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

SELECT * FROM pergunta;

SELECT * FROM resposta;

SELECT * FROM elo_usuarios;

SELECT * FROM usuarios;

DROP TABLE pergunta;

DROP DATABASE logiclift;