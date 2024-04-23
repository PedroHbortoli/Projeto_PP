CREATE DATABASE logicLift;
USE logicLift;

CREATE TABLE usuarios(
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(255) 
);

CREATE TABLE elo_usuario(
	id INT AUTO_INCREMENT PRIMARY KEY,
	elo ENUM ('ferro', 'bronze', 'prata', 'ouro', 'platina', 'esmeralda')
    DEFAULT 'ferro'
);

INSERT INTO elo_usuario (id)
VALUES (1);

SELECT * FROM elo_usuario;

DROP TABLE elo_usuario;