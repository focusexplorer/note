CREATE DATABASE notebook CHARACTER SET utf8;
CREATE TABLE user_info (mail char(64) not null primary key,password char(255) ,register_time  datetime ,text_page mediumtext character set utf8);