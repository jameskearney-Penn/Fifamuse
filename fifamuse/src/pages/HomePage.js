import { useEffect, useState } from 'react';
import { Container, Divider, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

import LazyTable from '../components/LazyTable';
import SongCard from '../components/SongCard';
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
    // Fetch request to get the song of the day. Fetch runs asynchronously.
    // The .then() method is called when the fetch request is complete
    // and proceeds to convert the result to a JSON which is finally placed in state.
    fetch(`http://${config.server_host}:${config.server_port}/random`)
      .then(res => res.json())
      .then(resJson => setPlayerOfTheDay(resJson));
  }, []);

  /*['long_name',
  'player_positions',
  'value_eur',
  'overall',
  'wage_eur',
  'age',
  'dob',
  'height_cm',
  'weight_kg',
  'club_name',
  'league_name',
  'club_jersey_number',
  'nation_jersey_number',
  'nationality_name',
  'player_face_url',
  'club_logo_url',
  'club_flag_url',
  'nation_logo_url',
  'nation_flag_url']*/

  const playerColumns = [
    {
      field: 'long_name',
      headerName: 'Name',
      renderCell: (row) => <Link onClick={() => setSelectedPlayer(row.sofifa_id)}>{row.long_name}</Link>
    },
    {
      field: 'common_club_name',
      headerName: 'Club',
      renderCell: (row) => <NavLink to={`/albums/${row.common_club_name}`}>{row.common_club_name}</NavLink> // A NavLink component is used to create a link to the album page
    },
    {
      field: 'player_positions',
      headerName: 'Player Positions'
    },
  ];

  const albumColumns = [
    {
      field: 'title',
      headerName: 'Album Title',
      renderCell: (row) => <NavLink to={`/albums/${row.album_id}`}>{row.title}</NavLink> 
    },
    {
      field: 'plays',
      headerName: 'Plays',
    },
  ]

  return (
    <Container>
      <div style={{width: "100%", alignContent: "center", justifyContent: "center"}}><h1 style={{alignSelf: "center", paddingLeft: "35%"}}>Welcome to FifaMuse!</h1></div>
      <h2>Check out the player of the day:&nbsp;
        <Link></Link>
      </h2>
      <Divider />
      <h2>Spotlight Players Of The Week</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/top_players`} columns={playerColumns} />
      <Divider />
      <Divider />
      <h2>Spotlight Clubs Of The Week</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/top_clubs`} columns={albumColumns} defaultPageSize={5} rowsPerPageOptions={[5, 10]}/>
      <Divider />
    </Container>
  );
};