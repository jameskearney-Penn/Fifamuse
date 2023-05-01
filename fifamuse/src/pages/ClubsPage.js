import { useEffect, useState } from 'react';
import { Button, Checkbox, Container, FormControlLabel, Grid, Link, Slider, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
const config = require('../config.json');

export default function ClubsPage() {
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);

  const [currName, setCurrName] = useState('');
  const [currCountry, setCurrCountry] = useState('');
  const [currLeague, setCurrLeague] = useState('');
  const [matches_played, setMatchesPlayed] = useState([1, 40]);
  const [matches_played_home, setHomeMatches] = useState([0, 20]);
  const [matches_played_away, setAwayMatches] = useState([0, 20]);
  const [wins, setWins] = useState([0, 24]);
  const [winsHome, setWinsHome] = useState([0, 14]);
  const [winsAway, setWinsAway] = useState([0, 12]);
  const [draws, setDraws] = useState([0, 16]);
  const [losses, setLosses] = useState([0, 22]);
  const [goals, setGoals] = useState([0, 80]);
  const [goals_conceded, setGoalsConceded] = useState([0, 74]);
  const [goal_difference, setGoalDiff] = useState([-45, 53]);
  const [cards, setCards] = useState([0, 124]);
  const [shots, setShots] = useState([6, 576]);
  const [shots_on_target, setShotsOnTarget] = useState([3, 242]);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/search_players`)
      .then(res => res.json())
      .then(resJson => {
        const songsWithId = resJson.map((song) => ({ id: song.song_id, ...song }));
        setData(songsWithId);
      });
  }, []);

  const search = () => {
    /*fetch(`http://${config.server_host}:${config.server_port}/search_songs?title=${title}` +
      `&duration_low=${duration[0]}&duration_high=${duration[1]}` +
      `&plays_low=${plays[0]}&plays_high=${plays[1]}` +
      `&danceability_low=${danceability[0]}&danceability_high=${danceability[1]}` +
      `&energy_low=${energy[0]}&energy_high=${energy[1]}` +
      `&valence_low=${valence[0]}&valence_high=${valence[1]}` +
      `&explicit=${explicit}`
    )
      .then(res => res.json())
      .then(resJson => {
        // DataGrid expects an array of objects with a unique id.
        // To accomplish this, we use a map with spread syntax (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
        const songsWithId = resJson.map((song) => ({ id: song.song_id, ...song }));
        setData(songsWithId);
      });*/
  }

  // This defines the columns of the table of songs used by the DataGrid component.
  // The format of the columns array and the DataGrid component itself is very similar to our
  // LazyTable component. The big difference is we provide all data to the DataGrid component
  // instead of loading only the data we need (which is necessary in order to be able to sort by column)
  const columns = [
    { field: 'common_name', headerName: 'Name', width: 300, renderCell: (params) => (
        <Link onClick={() => setSelectedClub(params.row.common_name)}>{params.common_name}</Link>
    ) },
    { field: 'value_eur', headerName: 'Value (Euros)' },
    { field: 'wage_eur', headerName: 'Valence' },
    { field: 'overall', headerName: 'Overall Fifa Ranking' },
    { field: 'height_cm', headerName: 'Height (cm)' },
    { field: 'weight_kg', headerName: 'Weight (kg)' },
    { field: 'age', headerName: 'Age' },
  ]

  // This component makes uses of the Grid component from MUI (https://mui.com/material-ui/react-grid/).
  // The Grid component is super simple way to create a page layout. Simply make a <Grid container> tag
  // (optionally has spacing prop that specifies the distance between grid items). Then, enclose whatever
  // component you want in a <Grid item xs={}> tag where xs is a number between 1 and 12. Each row of the
  // grid is 12 units wide and the xs attribute specifies how many units the grid item is. So if you want
  // two grid items of the same size on the same row, define two grid items with xs={6}. The Grid container
  // will automatically lay out all the grid items into rows based on their xs values.
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
          <p>Matches Played Home</p>
          <Slider
            value={matches_played_home}
            min={0}
            max={20}
            step={1}
            onChange={(e, newValue) => setHomeMatches(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={6}>
          <p>Matches Played Away</p>
          <Slider
            value={matches_played_away}
            min={0}
            max={20}
            step={1}
            onChange={(e, newValue) => setAwayMatches(newValue)}
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
          <p>Wins Home</p>
          <Slider
            value={winsHome}
            min={0}
            max={14}
            step={1}
            onChange={(e, newValue) => setWinsHome(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid><Grid item xs={6}>
          <p>Wins</p>
          <Slider
            value={winsAway}
            min={0}
            max={12}
            step={1}
            onChange={(e, newValue) => setWinsAway(newValue)}
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
          <p>Cards</p>
          <Slider
            value={cards}
            min={0}
            max={124}
            step={4}
            onChange={(e, newValue) => setCards(newValue)}
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