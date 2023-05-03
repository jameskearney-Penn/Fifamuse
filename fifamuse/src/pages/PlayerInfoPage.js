import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
const config = require('../config.json');

export default function PlayerInfoPage() {
  const { name } = useParams();

  const [playerData, setPlayerData] = useState({}); 

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/player/${name}`)
      .then(res => res.json())
      .then(resJson => {
        if (resJson != {}) {
            setPlayerData(resJson);
        } else {
            setPlayerData({});
        }
    });
  }, [, name]);

  return (
    <Container>
        <Stack direction='row' justify='center'>
            <img
                key={Math.random()}
                src={playerData.player_face_url}
                alt={`${playerData.name}`}
                style={{
                    justifyContent: "center",
                    marginLeft: 40,
                    marginTop: 30,
                    width: 150,
                    height: 100
                }}
            />
            <img
                key={Math.random()}
                src={playerData.club_logo_url}
                alt={`${playerData.club_name} logo`}
                style={{
                    marginLeft: 40,
                    marginTop: 30,
                    width: 150,
                    height: 100
                }}
            />
            <Stack direction='column' justify='center'>
                <h2 style={{ fontSize: 30, justifyContent: "center" }}>{playerData.name}</h2>
                <h2 style={{marginTop: -10}}>DOB: {playerData.dob}</h2>
            </Stack>
            <img
                key={Math.random()}
                src={playerData.nation_flag_url}
                alt={`${playerData.nationality} flag`}
                style={{
                    borderWidth: 3,
                    borderColor: "#00000",
                    marginLeft: 40,
                    marginTop: 30,
                    width: 150,
                    height: 100
                }}
            />
        </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key='Name'>Name</TableCell>
              <TableCell key='#'>#</TableCell>
              <TableCell key='Age'>Age</TableCell>
              <TableCell key='Nationality'>Nationality</TableCell>
              <TableCell key='Club'>Club</TableCell>
              <TableCell key='League'>League</TableCell>
              <TableCell key='Position'>Position</TableCell>
              <TableCell key='Fifa_Rating'>Fifa Rating</TableCell>
              <TableCell key='Value'>Value (Euros)</TableCell>
              <TableCell key='Wage'>Wage (Euros)</TableCell>
              <TableCell key='Height'>Height (cm)</TableCell>
              <TableCell key='Weight'>Weight (kg)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={Math.random()}>
                <TableCell key='Name'>{playerData.name}</TableCell>
                <TableCell key='#'>{playerData.club_jersey_number}</TableCell>
                <TableCell key='Age'>{playerData.age}</TableCell>
                <TableCell key='Nationality'>{playerData.nationality}</TableCell>
                <TableCell key='Club'>{playerData.club_name}</TableCell>
                <TableCell key='League'>{playerData.league_name}</TableCell>
                <TableCell key='Position'>{playerData.position}</TableCell>
                <TableCell key='Fifa_Rating'>{playerData.rating}</TableCell>
                <TableCell key='Value'>{playerData.value_eur}</TableCell>
                <TableCell key='Wage'>{playerData.wage_eur}</TableCell>
                <TableCell key='Height'>{playerData.height_cm}</TableCell>
                <TableCell key='Weight'>{playerData.weight_kg}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}