CREATE DATABASE logicLift;
USE logicLift;

CREATE TABLE usuarios(
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(255) 
);

CREATE TABLE elo_usuarios(
	id INT AUTO_INCREMENT PRIMARY KEY,
	elo ENUM ('ferro', 'bronze', 'prata', 'ouro', 'platina', 'esmeralda')
    DEFAULT 'ferro',
	FOREIGN KEY (id) REFERENCES usuarios(id)
);


select * from elo_usuarios;

SELECT * FROM usuarios;

DROP TABLE elo_usuarios;