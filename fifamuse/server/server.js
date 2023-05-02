const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
    origin: '*',
}));

app.get('/player_of_week', routes.player_of_week);
app.get('/players_of_week', routes.players_of_week);
app.get('/search_players', routes.search_players);
app.get('/teams_of_week', routes.teams_of_week);
app.get('/search_clubs', routes.search_clubs);
app.get('/player/:name', routes.get_player);
app.get('/club/:name', routes.get_team);
app.get('/country/:name', routes.get_country);

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;