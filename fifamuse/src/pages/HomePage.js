import { useEffect, useState } from 'react';
import { Container, Divider, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

import LazyTable from '../components/LazyTable';
const config = require('../config.json');

export default function HomePage() {
  // We use the setState hook to persist information across renders (such as the result of our API calls)
  const [playerOfTheDay, setPlayerOfTheDay] = useState({});
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // The useEffect hook by default runs the provided callback after every render
  // The second (optional) argument, [], is the dependency array which signals
  // to the hook to only run the provided callback if the value of the dependency array
  // changes from the previous render. In this case, an empty array means the callback
  // will only run on the very first render.
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/player_of_week`)
      .then(res => res.json())
      .then(resJson => {setPlayerOfTheDay(resJson[0])});
  }, []);

  const playerColumns = [
    {
      field: 'name',
      headerName: 'Name',
    },
    {
      field: 'club_name',
      headerName: 'Club',
    },
    {
      field: 'age',
      headerName: 'Age',
    },
    {
      field: 'league_name',
      headerName: 'League'
    },
  ];

  const albumColumns = [
    {
      field: 'club_name',
      headerName: 'Name',
    },
    {
      field: 'league_name',
      headerName: 'League Name',
    },
  ]

  return (
    <Container>
      <div style={{width: "100%", alignContent: "center", justifyContent: "center"}}><h1 style={{alignSelf: "center", paddingLeft: "35%"}}>Welcome to FifaMuse!</h1></div>
      <h2>Check out the player of the day:
        <h5>{playerOfTheDay.name}</h5>
        <h5>{playerOfTheDay.club_name}</h5>
      </h2>
      <Divider />
      <h2>Spotlight Players Of The Week</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/players_of_week`} columns={playerColumns} />
      <Divider />
      <Divider />
      <h2>Spotlight Clubs Of The Week</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/teams_of_week`} columns={albumColumns} defaultPageSize={5} rowsPerPageOptions={[5, 10]}/>
      <Divider />
    </Container>
  );
};