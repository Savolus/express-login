CREATE DATABASE IF NOT EXISTS express_login;

CREATE USER IF NOT EXISTS 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost';

USE express_login;

CREATE TABLE IF NOT EXISTS users (
    login VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

