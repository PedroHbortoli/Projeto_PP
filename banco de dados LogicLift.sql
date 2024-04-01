CREATE DATABASE logicLift;
USE logicLift;

CREATE TABLE usuarios(
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(255) 
);

INSERT INTO usuarios (nome, email, senha)
VALUES ('Pedro Hentique de Bortoli', 'bortolipedroh@gmail.com', 'pedroreidelas'),
('Diego Gutterres Figueredo', 'diegogutterres@yahoo.com', 'didireidomorro'),
('Bernardo Maccari Perini', 'bernardoreidelas@icloud.com', '1234567890');

SELECT * FROM usuarios;

CREATE TABLE elo_usuario(
	id INT AUTO_INCREMENT PRIMARY KEY,
	elo ENUM ('ferro', 'bronze', 'prata', 'ouro', 'platina', 'esmeralda')
    DEFAULT 'ferro'
);

INSERT INTO elo_usuario (id)
VALUES (1);

SELECT * FROM elo_usuario;

DROP TABLE elo_usuario;