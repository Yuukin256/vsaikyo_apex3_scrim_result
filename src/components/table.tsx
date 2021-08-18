import { TableContainer, Table, TableHead, TableBody, TableRow } from '@material-ui/core';
import React from 'react';
import TableCell from './improvedTableCell';
import { calculatePlacementPoint } from '../utils/calculator';

interface InputResult {
  match: number;
  maxKills: number | null;
  teams: {
    number: number;
    placement: number | '-';
    kills: number | '-';
  }[];
}
interface Result {
  match: number;
  overMaxKills: boolean;
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
  dayResult: InputResult[];
  enableMaxKill: boolean;
}

const ResultTable: React.VFC<Props> = (props) => {
  const teams: TeamResult[] = [
    {
      number: 1,
      name: 'おべっか',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 2,
      name: 'ぱすてるさわー',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 3,
      name: 'ざりがにいるか',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 4,
      name: 'ラフメイカー',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 5,
      name: 'アルティメットブルーアイズ',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 6,
      name: 'あの伝説',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 7,
      name: '雪月花',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 8,
      name: 'ごーすとばすたーず',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 9,
      name: '花芽い社',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 10,
      name: '猫神ル幼稚園',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 11,
      name: '幼女戦姫',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 12,
      name: '月面着陸',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 13,
      name: 'ゴリラの惑星エピソード1',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 14,
      name: 'ReTIcle',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 15,
      name: '声出しプレデター',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 16,
      name: 'まひまひはきゅーけいちゅー！',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 17,
      name: 'アークスターズ',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 18,
      name: 'メンヘラ三銃士',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 19,
      name: 'カワボAPEX女子会',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
    {
      number: 20,
      name: 'イケメン3羽烏',
      rank: 0,
      totalPlacementPoints: 0,
      totalKills: 0,
      totalPoints: 0,
      results: [],
    },
  ];

  // キルポイント上限の有無
  if (props.enableMaxKill) {
    props.dayResult.forEach((matchResult) => {
      const numberOfMaxKills = matchResult.maxKills ?? Infinity;
      matchResult.teams.forEach((teamResult) => {
        const placementPoints = calculatePlacementPoint(teamResult.placement);
        const kills = teamResult.kills === '-' ? 0 : teamResult.kills;
        const killPoints = Math.min(numberOfMaxKills, kills);
        const result: Result = {
          match: matchResult.match,
          overMaxKills: kills > numberOfMaxKills,
          placement: teamResult.placement,
          kills: teamResult.kills,
          points: placementPoints + killPoints,
        };
        teams[teamResult.number - 1].results.push(result);
        teams[teamResult.number - 1].totalPlacementPoints += placementPoints;
        teams[teamResult.number - 1].totalKills += kills;
        teams[teamResult.number - 1].totalPoints += placementPoints + killPoints;
      });
    });
  } else {
    props.dayResult.forEach((matchResult) => {
      matchResult.teams.forEach((teamResult) => {
        const placementPoints = calculatePlacementPoint(teamResult.placement);
        const killPoints = teamResult.kills === '-' ? 0 : teamResult.kills;
        const result: Result = {
          match: matchResult.match,
          overMaxKills: false,
          placement: teamResult.placement,
          kills: teamResult.kills,
          points: placementPoints + killPoints,
        };
        teams[teamResult.number - 1].results.push(result);
        teams[teamResult.number - 1].totalPlacementPoints += placementPoints;
        teams[teamResult.number - 1].totalKills += killPoints;
        teams[teamResult.number - 1].totalPoints += placementPoints + killPoints;
      });
    });
  }

  teams.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    // 同ポイントの場合は最高スコアが高いチームが上位
    return Math.max(...b.results.map((v) => v.points)) - Math.max(...a.results.map((v) => v.points));
  });

  const numberOfMatches = props.dayResult.length;

  const HeadRow1: React.VFC = () => {
    return (
      <TableRow>
        <TableCell colSpan={5} style={borderRight}></TableCell>
        {props.dayResult.map((matchResult) => (
          <TableCell
            colSpan={3}
            align="center"
            style={matchResult.match !== numberOfMatches ? borderRight : {}}
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
      <TableCell align="center" style={{ width: '4em', paddingLeft: 10 }}>
        総合順位
      </TableCell>
      <TableCell align="center">チーム</TableCell>
      <TableCell align="center" style={{ width: '4.5em' }}>
        合計ポイント
      </TableCell>
      <TableCell align="center" style={{ width: '4.5em' }}>
        合計順位ポイント
      </TableCell>
      <TableCell align="center" style={{ ...borderRight, width: '4.5em' }}>
        合計キル数
      </TableCell>
      {Array(numberOfMatches)
        .fill(null)
        .flatMap((_, i) => [
          <TableCell key={i + 'a'} align="center" style={{ width: '4.5em' }}>
            順位
          </TableCell>,
          <TableCell key={i + 'b'} align="center" style={{ width: '4.5em' }}>
            キル数
          </TableCell>,
          <TableCell
            key={i + 'c'}
            align="center"
            style={i + 1 !== numberOfMatches ? { ...borderRight, width: '4.5em' } : { width: '4.5em' }}
          >
            ポイント
          </TableCell>,
        ])}
    </TableRow>
  );

  return (
    <TableContainer>
      <Table size="small" style={{ width: 'auto' }}>
        <TableHead style={{ borderTop: '1px solid rgba(224, 224, 224, 1)', backgroundColor: '#fafafa' }}>
          <HeadRow1></HeadRow1>
          <HeadRow2></HeadRow2>
        </TableHead>
        <TableBody>
          {teams.map((teamResult, i) => (
            <TableRow hover key={i}>
              <TableCell align="right">{i + 1}</TableCell>
              <TableCell>{teamResult.name}</TableCell>
              <TableCell align="right">
                <strong>{teamResult.totalPoints}</strong>
              </TableCell>
              <TableCell align="right">{teamResult.totalPlacementPoints}</TableCell>
              <TableCell align="right" style={borderRight}>
                {teamResult.totalKills}
              </TableCell>
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
                    {match.overMaxKills ? <em>{match.kills}</em> : match.kills}
                  </TableCell>,
                  <TableCell align="right" style={match.match !== numberOfMatches ? borderRight : {}} key="points">
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
