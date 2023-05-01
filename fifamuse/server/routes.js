const mysql = require('mysql')
const config = require('./config.json')

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect((err) => err && console.log(err));


const players_of_week = async function(res, req) {
    connection.query(`
    SELECT name, age, club_name, league_name, nationality
    FROM Player
    ORDER BY RAND()
    `, (err, data) => {
        if (err || data.length ===0) {
            console.log(err);
            res.json();
        } else {
            res.json(data);
        }
    });
}
const teams_of_week = async function(res, req) {
    connection.query(`
    SELECT club_name, league_name, country
    FROM Club_Plays_In
    ORDER BY RAND()
    `, (err, data) => {
        if (err || data.length ===0) {
            console.log(err);
            res.json();
        } else {
            res.json(data);
        }
    });
}

const search_clubs = async function(req, res) {
    const draws = req.query.draws ?? 0;
    const losses = req.query.losses ?? 0;
    const wins = req.query.wins ?? 0;
    const goals_conceded = req.query.

    connection.query(`
        
    `)
}
const search_players = async function(req, res) {
    const name = req.query.name ?? '';
    const club_name = req.query.club ?? '';
    const appearance_ratio_min = req.query.appr_rat ?? 0;
    const appearance_ratio_max = req.query.appr_rat ?? 1;
    const league = req.query.league ?? '';
    const age_min = req.query.age_min ?? 0;
    const age_max = req.query.age_max ?? 100;
    const nationality = req.query.nationality ?? '';
    const height_min = req.query.height_min ?? '0';
    const height_max = req.query.height_max ?? '200';
    const wage_min = req.query.wage_min ?? '0';
    const wage_max = req.query.wage_max ?? '1000000'
    const goal_ratio_max = req.query.goal_ratio_max ?? '1'
    const goal_ratio_min = req.query.goal_ratio_max ?? '1'

    connection.query(`
        WITH TEAM_APPEARANCES AS (SELECT t.common_name, COUNT(*) AS Team_Appearances
        FROM Club t join (
            SELECT home_team FROM Club_Matches WHERE home_team LIKE '%${club_name}%'
                union all
            SELECT away_team FROM matches WHERE away_team LIKE '%${club_name}%'') m
            on t.common_name = m.home_team
        group by t.common_name),
        TEAMS_GOALS AS (SELECT t.common_name, SUM(goals) AS Goals FROM Club t JOIN ((SELECT home_team, SUM(home_score) AS goals
        FROM Club_Matches
        WHERE home_team LIKE '%${club_name}%'
        GROUP BY home_team) UNION ALL
        (SELECT away_team, SUM(away_score) AS goals
        FROM Club_Matches
        WHERE away_team LIKE '%${club_name}%'
        GROUP BY away_team)) g on t.common_name = g.home_team group by t.common_name)
SELECT p.player_name, p.club_common_name, p.appearances / ta.Team_Appearances as appearance_ratio, p.goals_overall / tg.Goals as goal_ratio
FROM Player_Club_Stats p JOIN TEAM_APPEARANCES ta on p.club_common_name = ta.common_name JOIN TEAMS_GOALS tg on ta.common_name = tg.common_name JOIN Player pns 
on p.player_id = pns.id
WHERE p.appearances / ta.Team_Appearances >= ${appearance_ratio_min} AND p.appearances / ta.Team_Appearances <= ${appearance_ratio_max} 
AND p.goals_overall / tg.Goals >= ${appearance_ratio_min} AND p.goals_overall / tg.Goals <= ${appearance_ratio_max} AND pns.height_cm <= ${height_max} 
AND pns.height_cm >=${height_min} AND pns.age >= ${age_min} AND pns.age <= ${age_max} AND pns.wage_eur >= ${wage_min} AND pns.wage_eur <=${wage_max} AND 
p.goals_overall / tg.Goals >= ${goal_ratio_min} AND p.goals_overall / tg.Goals <= ${goal_ratio_max} AND p.nationality LIKE '%${nationality}%' 
AND p.player_name LIKE '%${name}%' AND pns.league_name LIKE '%${league}%'
    `, (err, data) => {
        if (err || data.length ===0) {
            console.log(err);
            res.json();
        } else {
            res.json(data);
        }
    });
}




module.exports = {

}