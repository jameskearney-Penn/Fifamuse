import { useState } from 'react';
import { Button, Container, Slider, Grid, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';
const config = require('../config.json');

export default function ClubsPage() {
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);

  const [currName, setCurrName] = useState('');
  const [currCountry, setCurrCountry] = useState('');
  const [currLeague, setCurrLeague] = useState('');
  const [matches_played, setMatchesPlayed] = useState([1, 40]);
  const [winRatio, setWinRatio] = useState([0, 1]);
  const [wins, setWins] = useState([0, 24]);
  const [winsHome, setWinsHome] = useState([0, 14]);
  const [winsAway, setWinsAway] = useState([0, 12]);
  const [draws, setDraws] = useState([0, 16]);
  const [losses, setLosses] = useState([0, 22]);
  const [goals, setGoals] = useState([0, 80]);
  const [goals_conceded, setGoalsConceded] = useState([0, 74]);
  const [goal_difference, setGoalDiff] = useState([-45, 53]);
  const [shots, setShots] = useState([6, 576]);
  const [shots_on_target, setShotsOnTarget] = useState([3, 242]);

  const search = () => {
    //Call search_clubs API
    fetch(`http://${config.server_host}:${config.server_port}/search_clubs?` + `name=${currName}` +
      `&country=${currCountry}` + `&league=${currLeague}` +
      `&draws_min=${draws[0]}` + `&draws_max=${draws[1]}` +
      `&losses_min=${losses[0]}` + `&losses_max=${losses[1]}` +
      `&wins_min=${wins[0]}` + `&wins_max=${wins[1]}` +
      `&goals_c_min=${goals_conceded[0]}` + `&goals_c_max=${goals_conceded[1]}` +
      `&goal_d_min=${goal_difference[0]}` + `&goal_d_max=${goal_difference[1]}` +
      `&shots_min=${shots[0]}` + `&shots_max=${shots[1]}` +
      `&shots_tgt_min=${shots_on_target[0]}` + `&shots_tgt_max=${shots_on_target[1]}` +
      `&matches_min=${matches_played[0]}` + `&matches_max=${matches_played[1]}` +
      `&win_rat_min=${winRatio[0]}` + `&win_rat_max=${winRatio[1]}`
    ).then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson.length && resJson.length != 0) {
          const clubsWithId = resJson.map((club) => ({ id:  Math.random(), ...club }));
          setData(clubsWithId);
        } else {
          setData({})
        }
      });
  }

  const columns = [
    { field: 'common_name', headerName: 'Name', width: 300,
      renderCell: (params) => (
        <NavLink style={{color: "#993153"}} to={`/club/${params.value}`}>{params.value}</NavLink>
      )
    },
    { field: 'league_name', headerName: 'League', width: 300},
    { field: 'country', headerName: 'Country', width: 300}
  ]
  
  return (
    <Container>
      {/*selectedSongId && <SongCard songId={selectedSongId} handleClose={() => setSelectedSongId(null)} />*/}
      <h2>Search Clubs</h2>
      <Grid container spacing={6}>
        {/* Text Input */}
        <Grid item xs={8}>
          <TextField label='Name' value={currName} onChange={(e) => setCurrName(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
        <Grid item xs={8}>
          <TextField label='Country' value={currCountry} onChange={(e) => setCurrCountry(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
        <Grid item xs={8}>
          <TextField label='League' value={currLeague} onChange={(e) => setCurrLeague(e.target.value)} style={{ width: "100%" }}/>
        </Grid>

        {/* Sliders */}
        <Grid item xs={6}>
          <p>Matches Played</p>
          <Slider
            value={matches_played}
            min={1}
            max={40}
            step={1}
            onChange={(e, newValue) => setMatchesPlayed(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={6}>
          <p>Wins</p>
          <Slider
            value={wins}
            min={0}
            max={24}
            step={1}
            onChange={(e, newValue) => setWins(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={6}>
          <p>Win Ratio</p>
          <Slider
            value={winRatio}
            min={0}
            max={1}
            step={.1}
            onChange={(e, newValue) => setWinRatio(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={6}>
          <p>Draws</p>
          <Slider
            value={draws}
            min={0}
            max={16}
            step={1}
            onChange={(e, newValue) => setDraws(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={6}>
          <p>Losses</p>
          <Slider
            value={losses}
            min={0}
            max={22}
            step={1}
            onChange={(e, newValue) => setLosses(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={6}>
          <p>Goals</p>
          <Slider
            value={goals}
            min={0}
            max={80}
            step={1}
            onChange={(e, newValue) => setGoals(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={6}>
          <p>Goals Conceded</p>
          <Slider
            value={goals_conceded}
            min={0}
            max={74}
            step={1}
            onChange={(e, newValue) => setGoalsConceded(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={6}>
          <p>Goal Difference</p>
          <Slider
            value={goal_difference}
            min={-45}
            max={53}
            step={2}
            onChange={(e, newValue) => setGoalDiff(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={6}>
          <p>Shots</p>
          <Slider
            value={shots}
            min={6}
            max={576}
            step={1}
            onChange={(e, newValue) => setShots(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={6}>
          <p>Shots On Target</p>
          <Slider
            value={shots_on_target}
            min={3}
            max={242}
            step={1}
            onChange={(e, newValue) => setShotsOnTarget(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
      </Grid>
      <Button onClick={() => search() } style={{ left: '50%', transform: 'translateX(-50%)' }}>
        Search
      </Button>
      <h2>Results</h2>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
      />
    </Container>
  );
}