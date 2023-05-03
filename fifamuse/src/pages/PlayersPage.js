import { useState } from 'react';
import { Button, Container, Grid, Slider, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';
const config = require('../config.json');

export default function PlayersPage() {
  //Define state variables
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [currName, setCurrName] = useState('');
  const [value, setValue] = useState([25000, 129500000]);
  const [wage, setWage] = useState([500, 350000]);
  const [height, setHeight] = useState([155, 203]);
  const [goal_ratio, setGoalRatio] = useState([0, 2.4]);
  const [age, setAge] = useState([16, 43]);

  //Call search players api
  const search = () => {
    fetch(`http://${config.server_host}:${config.server_port}/search_players?name=${currName}` +
    `&height_min=${height[0]}` + `&height_max=${height[1]}` + `&wage_min=${wage[0]}` + `&wage_max=${wage[1]}` +
    `&age_min=${age[0]}` + `&age_max=${age[1]}` + `&goal_ratio_min=${goal_ratio[0]}` + `&goal_ratio_max=${goal_ratio[1]}`
    ).then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson.length && resJson.length != 0) {
          const playersWithId = resJson.map((player) => ({ id:  Math.random(), ...player }));
          setData(playersWithId);
        } else {
          setData({})
        }
      });
  }

  //Define columns
  const columns = [
    { field: 'player_name', headerName: 'Name', width: 250,
      renderCell: (params) => (
        <NavLink style={{color: "#7ba8b5"}} to={`/player/${params.value}`}>{params.value}</NavLink>
      )
    },
    { field: 'club_common_name', headerName: 'Club', width: 150,
      renderCell: (params) => (
        <NavLink style={{color: "#993153"}} to={`/club/${params.value}`}>{params.value}</NavLink>
      ) 
    },
    { field: 'goal_ratio', headerName: 'Goal Ratio', width: 150},
    { field: 'appearance_ratio', headerName: 'Appearance Ratio', width: 150},
  ]
  return (
    <Container>
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
          <p>Goal Ratio</p>
          <Slider
            value={goal_ratio}
            min={0}
            max={2.4}
            step={.1}
            onChange={(e, newValue) => setGoalRatio(newValue)}
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