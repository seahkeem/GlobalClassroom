--drop table help;
drop table job_post;
drop table create_cv;
drop table profile;

CREATE TABLE public.profile (
    profile_email VARCHAR(100) PRIMARY KEY,
    profile_username VARCHAR(100) NOT NULL,
    profile_password VARCHAR(100) NOT NULL
);


create table public.create_cv(
	cv_firstname varchar(100) not null,
	cv_lastname varchar(100) not null,
	cv_phonenumber varchar(100) primary key,
	cv_email varchar(100) not null,
	cv_country varchar(50) not null,
	cv_colour varchar(50) not null,
	cv_mbti varchar(100),
	cv_about varchar(200),
	cv_video varchar(200),
	profile_email varchar(100) references public.profile(profile_email)
);


CREATE TABLE public.job_post (
    job_post_title VARCHAR(100),
    job_post_category VARCHAR(100),
    job_post_date TIMESTAMP WITH TIME ZONE PRIMARY KEY,
    job_post_description VARCHAR(200),
    job_post_image VARCHAR(200),
    profile_email VARCHAR(100) REFERENCES public.profile(profile_email)
);


--create table public.wallet(
--	wallet_id serial primary key,
--	wallet_title varchar(100),
--	cv_phonenumber varchar(100) references create_cv(cv_phonenumber)
--);

select * from profile;
select * from create_cv;
select * from job_post;
--select * from wallet;

--create table liked_post(
--	
--);

--create table help(
--	help_name varchar(100),
--	help_email char(100),
--	help_message char(200)
--);
