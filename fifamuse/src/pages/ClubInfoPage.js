import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
const config = require('../config.json');

export default function ClubInfoPage() {
  const { name } = useParams();

  const [clubData, setClubData] = useState({}); 

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/club/${name}`)
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson != {}) {
          setClubData(resJson);
        } else {
          setClubData({});
        }
    });
  }, [, name]);

  return (
    <Container>
        <Stack direction='row' justify='center'>
            <img
                key={Math.random()}
                src={clubData.club_logo}
                alt={`${clubData.common_name} logo`}
                style={{
                    marginLeft: 40,
                    marginTop: 30,
                    width: 150,
                    height: 100
                }}
            />
            <Stack direction='column' justify='center'>
                <h2 style={{ fontSize: 30, justifyContent: "center" }}>{clubData.common_name}</h2>
            </Stack>
            <img
                key={Math.random()}
                src={clubData.club_flag}
                alt={`${clubData.common_name} flag`}
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
              <TableCell key='League'>League</TableCell>
              <TableCell key='Country'>Country</TableCell>
              <TableCell key='Matches_Played'>Matches Played</TableCell>
              <TableCell key='Wins'>Wins</TableCell>
              <TableCell key='Draws'>Draws</TableCell>
              <TableCell key='Losses'>Losses</TableCell>
              <TableCell key='Goals_Scored'>Goals Scored</TableCell>
              <TableCell key='Goals Conceded'>Goals Conceded</TableCell>
              <TableCell key='Goal_Difference'>Goal Difference</TableCell>
              <TableCell key='Cards'># Cards</TableCell>
              <TableCell key='Shots'>Shots</TableCell>
              <TableCell key='Shots_on_T'>Shots on Target</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={Math.random()}>
              <TableCell key='Name'>{clubData.common_name}</TableCell>
              <TableCell key='League'>{clubData.league_name}</TableCell>
              <TableCell key='Country'>{clubData.country}</TableCell>
              <TableCell key='Matches_Played'>{clubData.matches_played}</TableCell>
              <TableCell key='Wins'>{clubData.wins}</TableCell>
              <TableCell key='Draws'>{clubData.draws}</TableCell>
              <TableCell key='Losses'>{clubData.losses}</TableCell>
              <TableCell key='Goals_Scored'>{clubData.goals_scored}</TableCell>
              <TableCell key='Goals Conceded'>{clubData.goals_conceded}</TableCell>
              <TableCell key='Goal_Difference'>{clubData.goal_difference}</TableCell>
              <TableCell key='Cards'>{clubData.cards_total}</TableCell>
              <TableCell key='Shots'>{clubData.shots}</TableCell>
              <TableCell key='Shots_on_T'>{clubData.shots_on_target}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}