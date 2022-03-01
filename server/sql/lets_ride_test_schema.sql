drop database if exists lets_ride_test;
create database lets_ride_test;
use lets_ride_test;

create table rider (
rider_id int auto_increment primary key not null,
rider_firstname varchar(100) not null,
rider_lastname varchar(100) not null,
rider_postal char(5) not null,
username varchar(50) not null unique,
password varchar(1000) not null,
is_disabled boolean not null
);

create table club (
club_id int auto_increment primary key not null,
club_name varchar(75) not null unique,
club_description varchar(250) null,
club_postal_code char(5) not null,
club_membership_fee double null
);

create table `role` (
role_id int primary key auto_increment,
rider_id int not null,
club_id int null,
`name` varchar(50) not null,
foreign key (club_id) references club(club_id),
foreign key (rider_id) references rider(rider_id)
);

create table ride (
ride_id int auto_increment primary key not null,
route_id int null,
ride_datetime datetime not null,
ride_lat double not null,
ride_lng double not null,
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



delimiter ;;
create procedure set_known_good_state()
begin
	delete from club;
    alter table club auto_increment = 1;
    delete from rider;
    alter table rider auto_increment = 1;
    delete from ride;
    alter table ride auto_increment = 1;
    delete from role;
    alter table role auto_increment = 1;
    delete from ride_rider;
    alter table ride_rider auto_increment = 1;

insert into club (club_id, club_name, club_description, club_postal_code, club_membership_fee) values 
(1, 'CLUB1', 'test club1', '00000', 10),
(2, 'CLUB2', 'test club2', '11111', 20),
(3, 'CLUB3', 'test club3', '22222', 20),
(4, 'CLUB4', 'test club4', '22222', 15);

insert into rider(rider_id, rider_firstname, rider_lastname, rider_postal, username, password, is_disabled) values 
(1, 'Bjarne', 'Soustroup', '11111', 'user1', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
(2, 'Mike', 'McDonald', '11111', 'user2', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
(3, 'Jonah', 'Fawkes', '22222', 'user3', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
(4, 'Taylor', 'Carrington', '33333', 'user4', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
(5, 'Bad', 'User', '11111', 'user5', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);

insert into ride(ride_id, ride_datetime, ride_description, ride_limit, ride_lat, ride_lng, rider_id, club_id) values 
(1, now(), 'test ride1', 10, 100.00000, 100.00000, 1, 1), 
(2, now(), 'test ride2', 10, 99.800000, 100.2000, 2, 3), 
(3, now(), 'test ride3', NULL, -90.00000, -45.09000, 4, 4);

insert into `role`(role_id, rider_id, club_id, `name`) values
(1, 1, 1, 'MEMBER'),
(2, 4, NULL, 'USER'), 
(3, 2, 1, 'ADMIN'),
(4, 3, 2, 'ADMIN'),
(5, 5, 4, 'MEMBER'),
(6, 1, 3, 'ADMIN'),
(7, 3, 1, 'MEMBER');

insert into ride_rider (rider_id, ride_id) values
(1, 1),
(2, 1),
(3, 1),
(1, 3),
(5, 2),
(3, 1);

end;;
delimiter ;
