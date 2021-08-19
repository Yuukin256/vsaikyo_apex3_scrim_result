import { TableContainer, Table, TableHead, TableBody, TableRow } from '@material-ui/core';
import React from 'react';
import TableCell from './improvedTableCell';
import { calculatePlacementPoint } from '../utils/calculator';
import { useMemo } from 'react';

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
  overLimitKills: boolean;
  placement: number | '-';
  kills: number | '-';
  points: number;
  cappedPoints: number;
}

class TeamResult {
  number: number;
  name: string;
  totalPlacementPoints: number;
  totalKills: number;
  totalPoints: number;
  totalCappedPoints: number;
  results: Result[];

  constructor(number: number, name: string) {
    this.number = number;
    this.name = name;
    this.totalPlacementPoints = 0;
    this.totalKills = 0;
    this.totalPoints = 0;
    this.totalCappedPoints = 0;
    this.results = [];
  }

  public addMatchResult(r: {
    match: number;
    placement: number | '-';
    kills: number | '-';
    numberOfLimitKills: number;
  }) {
    const placementPoints = calculatePlacementPoint(r.placement);
    const kills = r.kills === '-' ? 0 : r.kills;
    const result: Result = {
      match: r.match,
      overLimitKills: r.kills > r.numberOfLimitKills,
      placement: r.placement,
      kills: r.kills,
      points: placementPoints + kills,
      cappedPoints: placementPoints + Math.min(r.numberOfLimitKills, kills),
    };
    this.results.push(result);
    this.totalPlacementPoints += placementPoints;
    this.totalKills += kills;
    this.totalPoints += result.points;
    this.totalCappedPoints += result.cappedPoints;
  }
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
  const resultOfEachTeam = useMemo(() => {
    const teams: TeamResult[] = [
      new TeamResult(1, 'おべっか'),
      new TeamResult(2, 'ぱすてるさわー'),
      new TeamResult(3, 'ざりがにいるか'),
      new TeamResult(4, 'ラフメイカー'),
      new TeamResult(5, 'アルティメットブルーアイズ'),
      new TeamResult(6, 'あの伝説'),
      new TeamResult(7, '雪月花'),
      new TeamResult(8, 'ごーすとばすたーず'),
      new TeamResult(9, '花芽い社'),
      new TeamResult(10, '猫神ル幼稚園'),
      new TeamResult(11, '幼女戦姫'),
      new TeamResult(12, '月面着陸'),
      new TeamResult(13, 'ゴリラの惑星エピソード1'),
      new TeamResult(14, 'ReTIcle'),
      new TeamResult(15, '声出しプレデター'),
      new TeamResult(16, 'まひまひはきゅーけいちゅー！'),
      new TeamResult(17, 'アークスターズ'),
      new TeamResult(18, 'メンヘラ三銃士'),
      new TeamResult(19, 'カワボAPEX女子会'),
      new TeamResult(20, 'イケメン3羽烏'),
    ];
    props.dayResult.forEach((matchResult) => {
      const numberOfLimitKills = matchResult.maxKills ?? Infinity;
      matchResult.teams.forEach((teamResult) => {
        teams[teamResult.number - 1].addMatchResult({
          match: matchResult.match,
          placement: teamResult.placement,
          kills: teamResult.kills,
          numberOfLimitKills: numberOfLimitKills,
        });
      });
    });
    return teams;
  }, [props.dayResult]);

  // キルポイント上限の有無で並べ方が違う
  if (props.enableMaxKill) {
    resultOfEachTeam.sort((a, b) => {
      if (a.totalCappedPoints !== b.totalCappedPoints) {
        return b.totalCappedPoints - a.totalCappedPoints;
      }
      // 同ポイントの場合は最高スコアが高いチームが上位
      return Math.max(...b.results.map((v) => v.cappedPoints)) - Math.max(...a.results.map((v) => v.cappedPoints));
    });
  } else {
    resultOfEachTeam.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      // 同ポイントの場合は最高スコアが高いチームが上位
      return Math.max(...b.results.map((v) => v.points)) - Math.max(...a.results.map((v) => v.points));
    });
  }

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
          {resultOfEachTeam.map((team, i) => (
            <TableRow hover key={i}>
              <TableCell align="right">{i + 1}</TableCell>
              <TableCell>{team.name}</TableCell>
              <TableCell align="right">
                <strong>{props.enableMaxKill ? team.totalCappedPoints : team.totalPoints}</strong>
              </TableCell>
              <TableCell align="right">{team.totalPlacementPoints}</TableCell>
              <TableCell align="right" style={borderRight}>
                {team.totalKills}
              </TableCell>
              {team.results.flatMap((match, j) => {
                const pp = calculatePlacementPoint(match.placement);
                return [
                  <TableCell
                    key={`${i}_${j}_placement`}
                    title={`${pp}ポイント`}
                    align="right"
                    style={placementColor(match.placement)}
                  >
                    {match.placement}
                  </TableCell>,
                  <TableCell key={`${i}_${j}_kills`} align="right">
                    {props.enableMaxKill && match.overLimitKills ? <em>{match.kills}</em> : match.kills}
                  </TableCell>,
                  <TableCell
                    key={`${i}_${j}_points`}
                    align="right"
                    style={match.match !== numberOfMatches ? borderRight : {}}
                  >
                    {props.enableMaxKill ? match.cappedPoints : match.points}
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
