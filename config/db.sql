CREATE DATABASE tiendaWeb;
DROP DATABASE tiendaWeb;
USE tiendaWeb;

CREATE TABLE marcas (
    idmarca INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla de catálogos o categorías (puedes cambiar el nombre si deseas)
CREATE TABLE catalogos (
    idcatalogo INT AUTO_INCREMENT PRIMARY KEY,
    catalogo VARCHAR(50) NOT NULL
);

-- Tabla de productos
CREATE TABLE productos (
    idproducto INT AUTO_INCREMENT PRIMARY KEY,
    producto VARCHAR(100) NOT NULL,
    imagen MEDIUMBLOB,
    precio DECIMAL(10,2) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    descripcion TEXT,
    stock INT,
    idmarca INT,
    idcatalogo INT,
    FOREIGN KEY (idmarca) REFERENCES marcas(idmarca),
    FOREIGN KEY (idcatalogo) REFERENCES catalogos(idcatalogo)
);

INSERT INTO marcas (marca) VALUES 
('HP'),
('Lenovo'),
('Dell'),
('Asus'),
('Samsung'),
('Apple'),
('Acer'),
('MSI');



INSERT INTO catalogos (catalogo) VALUES 
('Impresoras'),
('Monitores'),
('Laptops'),
('Celulares'),
('Tablets');
