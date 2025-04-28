CREATE DATABASE tiendaWeb;

USE tiendaWeb;

CREATE TABLE productos
(
	idproducto 	INT AUTO_INCREMENT PRIMARY KEY,
    producto	VARCHAR(20) NOT NULL,
    imagen		BLOB,
    precio		DECIMAL NOT NULL,
    modelo		VARCHAR(20) NOT NULL,
    descripcion	VARCHAR(60) NOT NULL
);

CREATE TABLE marcas
(
	idmarca 	INT AUTO_INCREMENT PRIMARY KEY,
    marca		VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE catalogos
(
	idcatalogo 	INT AUTO_INCREMENT PRIMARY KEY,
    catalogo	VARCHAR(20) NOT NULL
    
);

INSERT INTO marcas(marca) VALUES
('LG'),
('Samsumg'),
('Philip'),
('Telefunken'),
('Xiaomi'),
('Panasonic'),
('Sony'),
('TCL');

INSERT INTO catalogos(catalogo) VALUES
('Smartv'),
('Microondas'),
('Celulares'),
('Monitores'),
('Proyectores'),
('Tablet');

INSERT INTO productos(idproducto, producto, imagen, precio, modelo, descripcion) VALUES
('1', 'SmartTV', NULL, '100', 'A-67', 'Un buen televisor de 50p');

SELECT * FROM catalogos


