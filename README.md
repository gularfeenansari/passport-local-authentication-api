# passport-local-authentication-api

// create a .env file and add below code with proper values in the file 
host = host name of database
user = username of database
password = password of database 
database = database name 
port = port no on which express server will run

//Database 

create database users;

use users;

//table

create table users(username varchar(100),
                   password varchar(100),
                   createdon timestamp default current_timestamp,
                   PRIMARY KEY (username)
);


API Endpoints

Methods	        Urls	              Description
POST           /signup              create a user

sample data =======>>>>>>>

{
    "username" : "user1",
    "password" : "hash"
}

POST	           /login	             to login a user

sample data =======>>>>>>>

{
    "username" : "user1",
    "password" : "hash"
}

POST	           /login/check	        to check if user is authenticated



