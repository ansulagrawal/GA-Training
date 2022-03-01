Create database CRUD_DEMO;
use CRUD_DEMO;

create table student(
  id int not null auto_incre,
  first_name varchar(50) not null,
  last_name varchar(50),
  mobile int(10) ,
  email varchar(50) not null,
  dob date not null,
  address varchar(255),
);
insert into student (,"Ansul","Agrawal",8866776740,"ansulagrawal9@gmail.com","1999-08-1999","2718 Sobha Carnation, NVS");

select * from student;