import { useState } from 'react';
import { Button, Container, Grid, Slider, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';
const config = require('../config.json');

export default function CountriesPage() {
  //Define state variables
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [currName, setCurrName] = useState('');

  //Call search players api
  const search = () => {
    fetch(`http://${config.server_host}:${config.server_port}/country/${currName}`)
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson);
            if (resJson.length && resJson.length != 0) {
                const clubsWithID = resJson.map((club) => ({ id:  Math.random(), ...club }));
                setData(clubsWithID);
            } else {
                setData({})
            }
      });
  }

  //Define columns
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
        <h2>Search Countries</h2>
        <Grid container spacing={6}>
            <Grid item xs={8}>
            <TextField label='Name' value={currName} onChange={(e) => setCurrName(e.target.value)} style={{ width: "100%" }}/>
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