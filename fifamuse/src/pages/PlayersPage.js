import { useEffect, useState } from 'react';
import { Button, Checkbox, Container, FormControlLabel, Grid, Link, Slider, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import SongCard from '../components/SongCard';
import { formatDuration } from '../helpers/formatter';
const config = require('../config.json');

export default function PlayersPage() {
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState(null);

  const [currName, setCurrName] = useState('');
  const [value, setValue] = useState([25000, 129500000]);
  const [wage, setWage] = useState([500, 350000]);
  const [overall, setOverall] = useState([47, 91]);
  const [height, setHeight] = useState([155, 203]);
  const [weight, setWeight] = useState([54, 105]);
  const [age, setAge] = useState([16, 43]);

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
    { field: 'title', headerName: 'Title', width: 300, renderCell: (params) => (
        <Link onClick={() => setSelectedSongId(params.row.song_id)}>{params.value}</Link>
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
      {selectedSongId && <SongCard songId={selectedSongId} handleClose={() => setSelectedSongId(null)} />}
      <h2>Search Players</h2>
      <Grid container spacing={6}>
        <Grid item xs={8}>
          <TextField label='Name' value={currName} onChange={(e) => setCurrName(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
        <Grid item xs={6}>
          <p>Value (Euros)</p>
          <Slider
            value={value}
            min={25000}
            max={129500000}
            step={250000}
            onChange={(e, newValue) => setValue(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={6}>
          <p>Wage (Euros)</p>
          <Slider
            value={wage}
            min={500}
            max={350000}
            step={10000}
            onChange={(e, newValue) => setWage(newValue)}
            valueLabelDisplay='auto'
            valueLabelFormat={value => <div>{value / 1000000}</div>}
          />
        </Grid>
        {/* TODO (TASK 24): add sliders for danceability, energy, and valence (they should be all in the same row of the Grid) */}
        {/* Hint: consider what value xs should be to make them fit on the same row. Set max, min, and a reasonable step. Is valueLabelFormat is necessary? */}
        <Grid item xs={6}>
          <p>Overall (FIFA23)</p>
          <Slider
            value={overall}
            min={47}
            max={91}
            step={3}
            onChange={(e, newValue) => setOverall(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={6}>
          <p>Height (cm)</p>
          <Slider
            value={height}
            min={155}
            max={203}
            step={2}
            onChange={(e, newValue) => setHeight(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={6}>
          <p>Weight (kg)</p>
          <Slider
            value={weight}
            min={54}
            max={105}
            step={1}
            onChange={(e, newValue) => setWeight(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={6}>
          <p>Age</p>
          <Slider
            value={age}
            min={16}
            max={43}
            step={1}
            onChange={(e, newValue) => setAge(newValue)}
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