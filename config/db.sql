CREATE DATABASE tiendaWeb;

USE tiendaWeb;

CREATE TABLE productos
(
	idproducto 	INT AUTO_INCREMENT PRIMARY KEY,
    producto	VARCHAR(20) NOT NULL,
    imagen		BLOB,
    precio		DECIMAL NOT NULL,
	marca 		VARCHAR(20) NOT NULL,
    modelo		VARCHAR(20) NOT NULL,
    descripcion	VARCHAR(60) NOT NULL
);

CREATE TABLE catalogos
(
	idcatalogo 	INT AUTO_INCREMENT PRIMARY KEY,
    catalogo	VARCHAR(20) NOT NULL
    
)