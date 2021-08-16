import { TableContainer, Table, TableHead, TableBody, TableRow } from '@material-ui/core';
import React from 'react';
import TableCell from './improvedTableCell';
import { calculatePlacementPoint } from '../utils/calculator';

interface InputResult {
  match: number;
  teams: {
    number: number;
    placement: number | '-';
    kills: number | '-';
  }[];
}

interface Result {
  match: number;
  placement: number | '-';
  kills: number | '-';
  points: number;
}

interface TeamResult {
  number: number;
  name: string;
  rank: number;
  totalPlacementPoints: number;
  totalKills: number;
  totalPoints: number;
  results: Result[];
}

const borderRight: React.CSSProperties = {
  borderRight: '1px solid rgba(224, 224, 224, 1)',
};

const placementColor = (placement: number | '-'): React.CSSProperties => {
  switch (placement) {
    case 1:
      return { backgroundColor: '#DBB400' };
    case 2:
      return { backgroundColor: '#B2BABA' };
    case 3:
      return { backgroundColor: '#AE6938' };
    default:
      return {};
  }
};

interface Props {
  result: InputResult[];
  team: TeamResult[];
}

const ResultTable: React.VFC<Props> = (props) => {
  const results = props.team;
  props.result.forEach((match) => {
    match.teams.forEach((team) => {
      const placementPoints = calculatePlacementPoint(team.placement);
      const killPoints = team.kills === '-' ? 0 : team.kills;
      const result: Result = {
        match: match.match,
        placement: team.placement,
        kills: team.kills,
        points: placementPoints + killPoints,
      };
      results.at(team.number - 1).results.push(result);
      results.at(team.number - 1).totalPlacementPoints += placementPoints;
      results.at(team.number - 1).totalKills += killPoints;
      results.at(team.number - 1).totalPoints += placementPoints + killPoints;
    });
  });

  const matches = props.result.length;

  const HeadRow1: React.VFC = () => {
    return (
      <TableRow>
        <TableCell colSpan={5} style={borderRight}></TableCell>
        {props.result.map((matchResult) => (
          <TableCell
            colSpan={3}
            align="center"
            style={matchResult.match !== matches ? borderRight : {}}
            key={matchResult.match}
          >
            {matchResult.match}試合目
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const HeadRow2: React.VFC = () => (
    <TableRow>
      <TableCell align="center">総合順位</TableCell>
      <TableCell width={200} align="center">
        チーム
      </TableCell>
      <TableCell>合計ポイント</TableCell>
      <TableCell>合計順位ポイント</TableCell>
      <TableCell style={borderRight}>合計キル数</TableCell>
      {Array(matches)
        .fill(null)
        .flatMap((_, i) => [
          <TableCell align="right" key={i + 'a'}>
            順位
          </TableCell>,
          <TableCell align="right" key={i + 'b'}>
            キル数
          </TableCell>,
          <TableCell align="right" style={i + 1 !== matches ? borderRight : {}} key={i + 'c'}>
            ポイント
          </TableCell>,
        ])}
    </TableRow>
  );

  return (
    <TableContainer>
      <Table size="small">
        <TableHead style={{ borderTop: '1px solid rgba(224, 224, 224, 1)', backgroundColor: '#fafafa' }}>
          <HeadRow1></HeadRow1>
          <HeadRow2></HeadRow2>
        </TableHead>
        <TableBody>
          {results
            .sort((a, b) => {
              if (a.totalPoints !== b.totalPoints) {
                return b.totalPoints - a.totalPoints;
              }
              // 同ポイントの場合は最高スコアが高いチームが上位
              return Math.max(...b.results.map((v) => v.points)) - Math.max(...a.results.map((v) => v.points));
            })
            .map((teamResult, i) => (
              <TableRow hover key={i}>
                <TableCell align="right">{i + 1}</TableCell>
                <TableCell>{teamResult.name}</TableCell>
                <TableCell>
                  <b>{teamResult.totalPoints}</b>
                </TableCell>
                <TableCell>{teamResult.totalPlacementPoints}</TableCell>
                <TableCell style={borderRight}>{teamResult.totalKills}</TableCell>
                {teamResult.results.flatMap((match) => {
                  const pp = calculatePlacementPoint(match.placement);
                  return [
                    <TableCell
                      key="placement"
                      title={`${pp}ポイント`}
                      align="right"
                      style={placementColor(match.placement)}
                    >
                      {match.placement}
                    </TableCell>,
                    <TableCell key="kills" align="right">
                      {match.kills}
                    </TableCell>,
                    <TableCell align="right" style={match.match !== matches ? borderRight : {}} key="points">
                      {match.points}
                    </TableCell>,
                  ];
                })}
              </TableRow>
            ))}
        </TableBody>
        <TableHead style={{ borderTop: '1px solid rgba(224, 224, 224, 1)', backgroundColor: '#fafafa' }}>
          <HeadRow2></HeadRow2>
          <HeadRow1></HeadRow1>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
