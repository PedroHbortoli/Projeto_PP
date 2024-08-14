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
	descricao VARCHAR(255) NOT NULL,
	imagem VARCHAR,
	n_resposta INT NOT NULL,
	resposta_certa INT NOT NULL
)


select * from elo_usuarios;

SELECT * FROM usuarios;

DROP TABLE elo_usuarios;