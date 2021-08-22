import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import TableCell from '../components/improvedTableCell';
import Layout from '../components/layout';
import Seo from '../components/seo';

const MainPage: React.FC = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <p>
        2021年8月21日の VTuber最協決定戦 SEASON3 Ver APEX LEGENDS 前夜祭イベント「エペ娘
        レジェンドダービー」の結果です。正確性を保つ努力はしておりますが、集計に誤りがある可能性があります。ご了承ください。
      </p>
      {/* <iframe
        width="560"
        height="315"
        style={{ margin: 'auto 0' }}
        src="https://www.youtube.com/embed/IP6gox6jU-0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      /> */}
      <TableContainer>
        <Table size="small" style={{ width: 'auto' }}>
          <TableHead style={{ backgroundColor: '#fafafa' }}>
            <TableRow>
              <TableCell align="center">順位</TableCell>
              <TableCell colSpan={2} align="center">
                チーム
              </TableCell>
              <TableCell align="center">タイム</TableCell>
              <TableCell align="center">備考</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell align="right">1</TableCell>
              <TableCell>OBK</TableCell>
              <TableCell>おべっか</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">2</TableCell>
              <TableCell>MH3</TableCell>
              <TableCell>メンヘラ三銃士</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">3</TableCell>
              <TableCell>YUK</TableCell>
              <TableCell>幼女戦姫</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">4</TableCell>
              <TableCell>ARC</TableCell>
              <TableCell>アークスターズ</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">5</TableCell>
              <TableCell>SGK</TableCell>
              <TableCell>雪月花</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">6</TableCell>
              <TableCell>POW</TableCell>
              <TableCell>ぱすてるさわー</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">7</TableCell>
              <TableCell>UBE</TableCell>
              <TableCell>アルティメットブルーアイズ</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">8</TableCell>
              <TableCell>LHA</TableCell>
              <TableCell>ラフメイカー</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">9</TableCell>
              <TableCell>KOD</TableCell>
              <TableCell>声出しプレデター</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">10</TableCell>
              <TableCell>MQK</TableCell>
              <TableCell>まひまひきゅーけいちゅー！</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">11</TableCell>
              <TableCell>GBS</TableCell>
              <TableCell>ごーすとばすたーず</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">12</TableCell>
              <TableCell>RTI</TableCell>
              <TableCell>レティクル</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">13</TableCell>
              <TableCell>KWV</TableCell>
              <TableCell>カワボAPEX女子会</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">14</TableCell>
              <TableCell>OTL</TableCell>
              <TableCell>あの伝説</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">15</TableCell>
              <TableCell>NGM</TableCell>
              <TableCell>猫神ル幼稚園</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">16</TableCell>
              <TableCell>MLG</TableCell>
              <TableCell>月面着陸</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">17</TableCell>
              <TableCell>PG1</TableCell>
              <TableCell>ゴリラの惑星エピソード1</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right">18</TableCell>
              <TableCell>ZGR</TableCell>
              <TableCell>ざりがにいるか</TableCell>
              <TableCell></TableCell>
              <TableCell>最下位のためゴールせず</TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right"></TableCell>
              <TableCell>KGS</TableCell>
              <TableCell>花芽い社</TableCell>
              <TableCell></TableCell>
              <TableCell>2人参戦のため失格扱い</TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell align="right"></TableCell>
              <TableCell>I3G</TableCell>
              <TableCell>イケメン3羽烏</TableCell>
              <TableCell></TableCell>
              <TableCell>落下前にごーすとばすたーずに殴られ死亡</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default MainPage;
