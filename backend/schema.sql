CREATE DATABASE devops_app;

USE devops_app;

CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100),

    email VARCHAR(100) UNIQUE,

    password VARCHAR(255)

);