CREATE DATABASE logicLift;
USE logicLift;

CREATE TABLE usuarios(
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE elo_usuarios(
	id INT AUTO_INCREMENT PRIMARY KEY,
	elo ENUM ('ferro', 'bronze', 'prata', 'ouro', 'platina', 'esmeralda')
    DEFAULT 'ferro',
	FOREIGN KEY (id) REFERENCES usuarios(id)
);

CREATE TABLE atividades(
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(255),
	imagem VARCHAR(255),
	n_resposta INT,
	resposta_certa INT
)

SELECT * FROM atividades;

SELECT * FROM elo_usuarios;

SELECT * FROM usuarios;

DROP TABLE elo_usuarios;