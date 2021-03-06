import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, styled } from '@material-ui/core/styles';
import React from 'react';
import { calculatePlacementPoint } from 'utils/calculator';

const TableCell: React.VFC<TableCellProps> = React.memo(
  styled(({ title, children, ...props }) => {
    if (title) {
      return (
        <Tooltip title={title}>
          <MuiTableCell {...props}>{children}</MuiTableCell>
        </Tooltip>
      );
    } else {
      return <MuiTableCell {...props}>{children}</MuiTableCell>;
    }
  })({
    paddingLeft: 12,
    paddingRight: 12,
  })
);

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
  number: number;
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
      number: r.match,
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

const useStyles = makeStyles({
  borderRight: {
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
  tableHead: { borderTop: '1px solid rgba(224, 224, 224, 1)', backgroundColor: '#fafafa' },
  widthCell: { width: '4.5em' },
});

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
      new TeamResult(1, 'OBK', '????????????'),
      new TeamResult(2, 'POW', '?????????????????????'),
      new TeamResult(3, 'ZGR', '?????????????????????'),
      new TeamResult(4, 'LHA', '??????????????????'),
      new TeamResult(5, 'UBE', '???????????????????????????????????????'),
      new TeamResult(6, 'OTL', '????????????'),
      new TeamResult(7, 'SGK', '?????????'),
      new TeamResult(8, 'GBS', '???????????????????????????'),
      new TeamResult(9, 'KGS', '????????????'),
      new TeamResult(10, 'NGM', '??????????????????'),
      new TeamResult(11, 'YUK', '????????????'),
      new TeamResult(12, 'MLG', '????????????'),
      new TeamResult(13, 'PG1', '?????????????????????????????????1'),
      new TeamResult(14, 'RTI', '???????????????'),
      new TeamResult(15, 'KOD', '????????????????????????'),
      new TeamResult(16, 'MQK', '???????????????????????????????????????'),
      new TeamResult(17, 'ARC', '?????????????????????'),
      new TeamResult(18, 'MH3', '?????????????????????'),
      new TeamResult(19, 'KWV', '?????????APEX?????????'),
      new TeamResult(20, 'I3G', '????????????3??????'),
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

  // ??????????????????
  // ?????????????????????????????????
  // ???5?????????????????????
  // ??????????????????
  // ???????????????????????????????????????????????????
  // ??????????????????????????????????????????????????????
  resultOfEachTeam
    .sort((a, b) => {
      const aMatch = a.results.reduce((prev, current) => (prev.placement > current.placement ? prev : current));
      const bMatch = b.results.reduce((prev, current) => (prev.placement > current.placement ? prev : current));
      return aMatch.number - bMatch.number;
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

  const classes = useStyles();

  const HeadRow1: React.VFC = () => {
    return (
      <TableRow>
        <TableCell colSpan={6} className={classes.borderRight}></TableCell>
        {Array(numberOfMatches)
          .fill(null)
          .map((_, i) => (
            <TableCell
              colSpan={3}
              align="center"
              className={i + 1 !== numberOfMatches ? classes.borderRight : ''}
              key={i + 1}
            >
              {i + 1}?????????
            </TableCell>
          ))}
      </TableRow>
    );
  };

  const HeadRow2: React.VFC = () => (
    <TableRow>
      <TableCell align="center" className={classes.widthCell} style={{ paddingLeft: 10 }}>
        ????????????
      </TableCell>
      <TableCell align="center" colSpan={2}>
        ?????????
      </TableCell>
      <TableCell align="center" className={classes.widthCell}>
        ??????????????????
      </TableCell>
      <TableCell align="center" className={classes.widthCell}>
        ????????????????????????
      </TableCell>
      <TableCell align="center" className={`${classes.borderRight} ${classes.widthCell}`}>
        ???????????????
      </TableCell>
      {Array(numberOfMatches)
        .fill(null)
        .flatMap((_, i) => [
          <TableCell key={i + 'a'} align="center" className={classes.widthCell}>
            ??????
          </TableCell>,
          <TableCell key={i + 'b'} align="center" className={classes.widthCell}>
            ?????????
          </TableCell>,
          <TableCell
            key={i + 'c'}
            align="center"
            className={`${numberOfMatches === i + 1 ? '' : classes.borderRight} ${classes.widthCell}`}
          >
            ????????????
          </TableCell>,
        ])}
    </TableRow>
  );

  return (
    <TableContainer>
      <Table size="small" style={{ width: 'auto' }}>
        <TableHead className={classes.tableHead}>
          <HeadRow1></HeadRow1>
          <HeadRow2></HeadRow2>
        </TableHead>
        <TableBody>
          {resultOfEachTeam.map((team, i) => (
            <TableRow hover key={team.number}>
              <TableCell align="right">{i + 1}</TableCell>
              <TableCell>{team.tag}</TableCell>
              <TableCell>{team.name}</TableCell>
              <TableCell align="right">
                <strong>{props.enableLimitKill ? team.totalCappedPoints : team.totalPoints}</strong>
              </TableCell>
              <TableCell align="right">{team.totalPlacementPoints}</TableCell>
              <TableCell align="right" className={classes.borderRight}>
                {team.totalKills}
              </TableCell>
              {team.results.flatMap((match) => {
                const pp = calculatePlacementPoint(match.placement);
                return [
                  <TableCell
                    key={`${team.number}_${match.number}_placement`}
                    title={`${pp}????????????`}
                    align="right"
                    style={placementColor(match.placement)}
                  >
                    {match.placement}
                  </TableCell>,
                  <TableCell key={`${team.number}_${match.number}_kills`} align="right">
                    {props.enableLimitKill && match.overLimitKills ? <em>{match.kills}</em> : match.kills}
                  </TableCell>,
                  <TableCell
                    key={`${team.number}_${match.number}_points`}
                    align="right"
                    className={match.number !== numberOfMatches ? classes.borderRight : ''}
                  >
                    {props.enableLimitKill ? match.cappedPoints : match.points}
                  </TableCell>,
                ];
              })}
            </TableRow>
          ))}
        </TableBody>
        <TableHead className={classes.tableHead}>
          <HeadRow2></HeadRow2>
          <HeadRow1></HeadRow1>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
