drop database if exists lets_ride;
create database lets_ride;
use lets_ride;


create table rider (
rider_id int auto_increment primary key not null,
rider_firstname varchar(100) not null,
rider_lastname varchar(100) not null,
rider_postal char(5) not null,
username varchar(50) not null unique,
password varchar(1000) not null,
is_disabled boolean not null
);

create table `role` (
role_id int primary key auto_increment,
`name` varchar(50) not null unique
);

create table rider_role (
rider_id int not null,
role_id int not null,
foreign key (rider_id) references rider(rider_id),
foreign key (role_id) references `role`(role_id)
);

create table club (
club_id int auto_increment primary key not null,
club_name varchar(75) not null unique,
club_description varchar(250) null,
club_postal_code char(5) not null,
club_membership_fee double null
);

create table rider_club (
rider_id int not null,
club_id int not null,
foreign key (rider_id) references rider(rider_id),
foreign key (club_id) references club(club_id)
);

create table ride (
ride_id int auto_increment primary key not null,
route_id int null,
ride_datetime datetime not null,
ride_location varchar(100) not null,
ride_description varchar(250) null,
ride_limit int null,
rider_id int not null,
club_id int not null,
foreign key (rider_id) references rider(rider_id),
foreign key (club_id) references club(club_id)
);

create table ride_rider (
ride_id int not null,
rider_id int not null,
foreign key (ride_id) references ride(ride_id),
foreign key (rider_id) references rider(rider_id)
);

