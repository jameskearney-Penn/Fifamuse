CREATE DATABASE fifamuse;
USE fifamuse;

CREATE TABLE Player (
    id int PRIMARY KEY,
    name varchar(100),
    player_positions varchar(100),
    rating int,
    value_eur int,
    wage_eur int,
    age int,
    dob varchar(15),
    height_cm int,
    weight_kg int,
    club_name varchar(100),
    league_name varchar(100),
    club_jersey_number int,
    nationality varchar(60),
    national_jersey_number int,
    player_face_url varchar(100),
    club_logo_url varchar(100),
    club_flag_url varchar(100),
    nation_logo_url varchar(100),
    nation_flag_url varchar(100),
    position varchar(10)
);

CREATE TABLE Club (
    name varchar(100),
    country varchar(60),
    club_logo varchar(100),
    club_flag varchar(100),
    common_name varchar(100),
    matches_played int,
    matches_played_home int,
    matches_played_away int,
    wins int,
    wins_home int,
    wins_away int,
    draws int,
    losses int,
    goals_scored int,
    goals_conceded int,
    goal_difference int,
    cards_total int,
    shots int,
    shots_on_target int,
    PRIMARY KEY (name, country)
);

CREATE TABLE Domestic_League(
    name varchar(100),
    country varchar(60),
    PRIMARY KEY (name, country)
);

CREATE TABLE Club_Plays_In(
    country varchar(60),
    league_name varchar(100),
    club_name varchar(100),
    FOREIGN KEY (club_name) REFERENCES Club (name),
    FOREIGN KEY (league_name, country) REFERENCES Domestic_League (name, country)
);

CREATE TABLE Player_Club_Stats (
    player_id int,
    player_name varchar(100),
    player_positions varchar(100),
    wage int,
    club_name varchar(100),
    nationality varchar(60),
    appearances int,
    min_per_game int,
    goals int,
    penalty_goals int,
    value int,
    assists int,
    yellow_cards int,
    red_cards int,
    FOREIGN KEY (player_id) REFERENCES Player (id),
    FOREIGN KEY (club_name, nationality) REFERENCES Club (name, country),
    PRIMARY KEY (player_id)
);

CREATE TABLE National_Team(
    country varchar(60) PRIMARY KEY,
    country_flag_url varchar(100),
    country_logo_url varchar(100)
);

CREATE TABLE International_Competition (
    name varchar(100),
    region varchar(100),
    PRIMARY KEY (name, region)
);

CREATE TABLE Nation_Plays_In (
    country_name varchar(60),
    competition_name varchar(100),
    region varchar(100),
    FOREIGN KEY (country_name) REFERENCES National_Team(country),
    FOREIGN KEY (competition_name, region ) REFERENCES International_Competition(name, region)
);

CREATE TABLE Player_International_Stats (
    player_id int,
    country varchar(100),
    goals int,
    assists int,
    yellow_cards int,
    red_cards int,
    appearances int,
    FOREIGN KEY (player_id) REFERENCES Player (id),
    FOREIGN KEY (country) REFERENCES National_Team (country),
    PRIMARY KEY (player_id)
);

CREATE TABLE Club_Matches (
    date varchar(50),
    home_team varchar(100),
    away_team varchar(100),
    home_score int,
    away_score int,
    country varchar(60),
    league_name varchar(100),
    stadium varchar(100),
    FOREIGN KEY (home_team) REFERENCES Club(name),
    FOREIGN KEY (away_team) REFERENCES Club(name),
    FOREIGN KEY (league_name) REFERENCES Domestic_League(name),
    PRIMARY KEY (date, home_team, away_team)
);

CREATE TABLE International_Matches (
    date varchar(50),
    home_team varchar(100),
    away_team varchar(100),
    home_score int,
    competition_name varchar(100),
    away_score int,
    region varchar(100),
    stadium varchar(100),
    FOREIGN KEY (competition_name, region) REFERENCES International_Competition (name, region),
    FOREIGN KEY (home_team) REFERENCES National_Team(country),
    FOREIGN KEY (away_team) REFERENCES National_Team(country),
    PRIMARY KEY (date, home_team, away_team)
);
