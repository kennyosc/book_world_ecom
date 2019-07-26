create database book_world_db;
use book_world_db;

-- PRIMARY TABLES
-- users,products, categories

CREATE TABLE users(
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(255) not null,
last_name VARCHAR(255) NOT NULL,
username VARCHAR(255) not null UNIQUE,
email VARCHAR(255) NOT NULL UNIQUE,
sex ENUM("Pria","Wanita"),
password VARCHAR(255) NOT NULL,
avatar blob,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);

create table products(
id INT PRIMARY KEY AUTO_INCREMENT,
name varchar(255) NOT NULL,
description text NOT NULL,
price int NOT NULL,
stock INT NOT NULL DEFAULT 1,
photo BLOB NOT NULL,
weight DECIMAL(2,1) NOT NULL,
published DATETIME NOT NULL,	
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);

create table categories(
id INT PRIMARY KEY AUTO_INCREMENT,
category VARCHAR(255) NOT NULL UNIQUE,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);

create table coupons(
id INT PRIMARY KEY AUTO_INCREMENT,
coupon_code CHAR(8) not null unique,
coupon_value int not null,
created_at timestamp default now(),
updated_at timestamp default now() on update now()
);

-- CONNECTING TABLES
-- ratings, reviews, orders, product_categories, coupons

CREATE TABLE product_reviews(
id INT AUTO_INCREMENT,
user_id INT NOT NULL,
product_id INT NOT NULL,
rating_value enum('1','2','3','4','5'),
review TEXT NOT NULL,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY (id,user_id,product_id)
);

-- table order akan diinput bersamaann ketika add to cart bersama dengan order_details
-- ketika checkout, orders.id harus naik 1
-- klik ADD TO CART -- ketika add to cart, orders.id harus insert 1 dan order_details harus insert 1
-- KLIK ADD TO CART X2 -- jika sudah ada barang di dalam cart, maka orders.total akan update dan insert baru di order_details
-- KLIK CHECKOUT -- 
create table orders(
id INT PRIMARY KEY AUTO_INCREMENT,
user_id INT NOT NULL,
total INT NOT NULL,
coupon_id INT,
order_status boolean default false,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW() on update now(),
foreign key (user_id) references users(id),
foreign key (coupon_id) references coupons(id)
);

-- create table order_details(
-- id INT PRIMARY KEY AUTO_INCREMENT,
-- order_id INT NOT NULL,
-- );

-- product_categories()

-- wishlist()

-- delivery_price(id, region, price)

-- delivery(id, order_id,region, address)

