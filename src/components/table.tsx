import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { calculatePlacementPoint } from '../utils/calculator';
import TableCell from './improvedTableCell';

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
  tag: string;
  name: string;
  totalPlacementPoints: number;
  totalKills: number;
  totalPoints: number;
  totalCappedPoints: number;
  results: Result[];

  constructor(number: number, tag: string, name: string) {
    this.number = number;
    this.tag = tag;
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
  enableLimitKill: boolean;
  includeAdditionalRound: boolean;
}

const ResultTable: React.VFC<Props> = (props) => {
  const resultOfEachTeam = React.useMemo(() => {
    const teams: TeamResult[] = [
      new TeamResult(1, 'OBK', 'おべっか'),
      new TeamResult(2, 'POW', 'ぱすてるさわー'),
      new TeamResult(3, 'ZGR', 'ざりがにいるか'),
      new TeamResult(4, 'LHA', 'ラフメイカー'),
      new TeamResult(5, 'UBE', 'アルティメットブルーアイズ'),
      new TeamResult(6, 'OTL', 'あの伝説'),
      new TeamResult(7, 'SGK', '雪月花'),
      new TeamResult(8, 'GBS', 'ごーすとばすたーず'),
      new TeamResult(9, 'KGS', '花芽い社'),
      new TeamResult(10, 'NGM', '猫神ル幼稚園'),
      new TeamResult(11, 'YUK', '幼女戦姫'),
      new TeamResult(12, 'MLG', '月面着陸'),
      new TeamResult(13, 'PG1', 'ゴリラの惑星エピソード1'),
      new TeamResult(14, 'RTI', 'レティクル'),
      new TeamResult(15, 'KOD', '声出しプレデター'),
      new TeamResult(16, 'MQK', 'まひまひきゅーけいちゅー！'),
      new TeamResult(17, 'ARC', 'アークスターズ'),
      new TeamResult(18, 'MH3', 'メンヘラ三銃士'),
      new TeamResult(19, 'KWV', 'カワボAPEX女子会'),
      new TeamResult(20, 'I3G', 'イケメン3羽烏'),
    ];
    props.dayResult.forEach((matchResult) => {
      if (!props.includeAdditionalRound && matchResult.match > 5) return;

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
  }, [props.dayResult, props.includeAdditionalRound]);

  // タイブレーク
  // ①シングルマッチスコア
  // ②5試合の最高順位
  // ③最高キル数
  // ④最高順位をより早いラウンドで獲得
  // キルポイント上限の有無で並べ方が違う
  resultOfEachTeam
    .sort((a, b) => {
      const aMatch = a.results.reduce((prev, current) => (prev.placement > current.placement ? prev : current));
      const bMatch = b.results.reduce((prev, current) => (prev.placement > current.placement ? prev : current));
      return aMatch.match - bMatch.match;
    })
    .sort((a, b) => {
      const aKills = Math.max(...a.results.map((v) => (v.kills === '-' ? 0 : v.kills)));
      const bKills = Math.max(...b.results.map((v) => (v.kills === '-' ? 0 : v.kills)));
      return bKills - aKills;
    })
    .sort((a, b) => {
      const aPlacement = Math.min(...a.results.map((v) => (v.placement === '-' ? 20 : v.placement)));
      const bPlacement = Math.min(...b.results.map((v) => (v.placement === '-' ? 20 : v.placement)));
      return aPlacement - bPlacement;
    })
    .sort((a, b) => {
      if (props.enableLimitKill) {
        return Math.max(...b.results.map((v) => v.cappedPoints)) - Math.max(...a.results.map((v) => v.cappedPoints));
      }
      return Math.max(...b.results.map((v) => v.points)) - Math.max(...a.results.map((v) => v.points));
    })
    .sort((a, b) => {
      if (props.enableLimitKill) {
        return b.totalCappedPoints - a.totalCappedPoints;
      }
      return b.totalPoints - a.totalPoints;
    });

  const numberOfMatches = props.includeAdditionalRound ? props.dayResult.length : Math.min(props.dayResult.length, 5);

  const HeadRow1: React.VFC = () => {
    return (
      <TableRow>
        <TableCell colSpan={6} style={borderRight}></TableCell>
        {Array(numberOfMatches)
          .fill(null)
          .map((_, i) => (
            <TableCell colSpan={3} align="center" style={i + 1 !== numberOfMatches ? borderRight : {}} key={i + 1}>
              {i + 1}試合目
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
      <TableCell align="center" colSpan={2}>
        チーム
      </TableCell>
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
              <TableCell>{team.tag}</TableCell>
              <TableCell>{team.name}</TableCell>
              <TableCell align="right">
                <strong>{props.enableLimitKill ? team.totalCappedPoints : team.totalPoints}</strong>
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
                    {props.enableLimitKill && match.overLimitKills ? <em>{match.kills}</em> : match.kills}
                  </TableCell>,
                  <TableCell
                    key={`${i}_${j}_points`}
                    align="right"
                    style={match.match !== numberOfMatches ? borderRight : {}}
                  >
                    {props.enableLimitKill ? match.cappedPoints : match.points}
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
