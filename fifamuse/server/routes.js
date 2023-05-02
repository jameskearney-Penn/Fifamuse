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

const get_player = async function(res, req) {
    let name = req.params.name;

    connection.query(`
    SELECT name, position, rating, value_eur, wage_eur, age, dob, height_cm, weight_cm, club_name, league_name, club_jersey_number, nationality, club_logo_url, nation_flag_url
    FROM Player
    WHERE name = '%${name}%'
    LIMIT 1
    `, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json({});
        } else {
            res.json(data[0]);
        }
    });
}

const get_team = async function(res, req) {
    let name = req.params.name;

    connection.query(`
    SELECT c.common_name, cl.league_name c.country, c.club_logo, c.club_flag, c.matches_played, c.wins, c.draws, c.losses, c.goals_scored, c.goals_conceded, c.goals_difference, c,cards_total, c.shots, c.shots_on_target
    FROM Club c JOIN Club_Plays_In cl on c.common_name = cl.club_name
    WHERE common_name = '%${name}%'
    LIMIT 1
    `, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json({});
        } else {
            res.json(data[0]);
        }
    });
}


const search_clubs = async function(req, res) {
    const draws_min = req.query.draws_min ?? 0;
    const draws_max = req.query.draws_max ?? 50;
    const losses_min = req.query.losses_min ?? 0;
    const losses_max = req.query.losses_max ?? 50;
    const wins_min = req.query.wins_min ?? 0;
    const wins_max = req.query.wins_max ?? 50;
    const goals_conceded_min = req.query.goals_c_min ?? 0;
    const goals_conceded_max = req.query.goals_c_max ?? 100;
    const goal_diff_min = req.query.goal_d_min ?? -50;
    const goal_diff_max = req.query.goal_d_max ?? 50;
    const cards_min = req.query.cards_min ?? 0;
    const cards_max = req.query.cards_max ?? 120;
    const shots_min = req.query.shots_min ?? 0;
    const shots_max = req.query.shots_max ?? 600;
    const shots_tgt_min = req.query.shots_tgt_min ?? 0;
    const shots_tgt_max = req.query.shots_tgt_max ?? 600;
    const matches_played_min = req.query.matches_min ?? 10;
    const matches_played_max = req.query.matches_max ?? 70;
    const win_ratio_min = req.query.win_rat_min ?? 0;
    const win_ratio_max = req.query.win_rat_max ?? 1;
    const name = req.query.name ?? '';
    const league = req.query.league ?? '';
    const country = req.query.country ?? '';

    connection.query(`
        SELECT c.common_name, cl.league_name, c.country
        FROM Club c JOIN Club_Plays_In cl ON c.common_name = cl.club_name
        WHERE c.common_name LIKE '%${name}%' AND cl.league_name LIKE '%${league}%' AND c.country LIKE '%${country}%'
        AND c.wins >= ${wins_min} AND c.wins <= ${wins_max} AND c.draws >= ${draws_min} AND c.draws <= ${draws_max} AND c.losses >= ${losses_min} AND c.losses <= ${losses_max}
        AND c.goals_conceded >= ${goals_conceded_min} AND c.goals_conceded <= ${goals_conceded_max} AND c.goal_difference >= ${goal_diff_min} AND c.goal_difference <= ${goal_diff_max}
        AND c.cards_total >= ${cards_min} AND c.cards_total <=${cards_max} AND c.shots >= ${shots_min} AND c.shots <= ${shots_max} 
        AND c.shots_on_target >= ${shots_tgt_min} AND c.shots_on_target <= ${shots_tgt_max} AND c.matches_played >= ${matches_played_min} AND c.matches_played <= ${matches_played_max}
        AND c.wins / c.matches_played >= ${win_ratio_min} AND c.wins / c.matches_played <= ${win_ratio_max}
    `, (err, data) => {
        if (err || data.length ===0) {
            console.log(err);
            res.json();
        } else {
            res.json(data);
        }
    });
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
    players_of_week,
    teams_of_week,
    search_clubs,
    search_players,
    get_player,
    get_team
}