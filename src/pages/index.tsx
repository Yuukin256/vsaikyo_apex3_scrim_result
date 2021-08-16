import * as React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';
import Table from '../components/table';
import data from '../data/data.json';
import team from '../data/team.json';

const MainPage: React.FC = () => (
  <Layout>
    <Seo title="Home" />
    <p>
      2021年8月22日に行われる渋谷ハルさん主催の VTuber最協決定戦 SEASON3 Ver APEX LEGENDS の事前練習カスタム (スクリム)
      の試合結果一覧です。正確性を保つ努力はしておりますが、集計に誤りがある可能性があります。ご了承ください。
    </p>
    <ul style={{ fontSize: '0.9em' }}>
      <li>マップはすべてWorld&apos;s Edgeです。</li>
      <li>
        本番は1試合目3ポイント、2,3試合目6ポイントのキルポイント上限がありますが、この集計ではキルポイント上限を考慮していません。
      </li>
    </ul>
    {data.reverse().map((day) => {
      return (
        <>
          <h2>{day.day}</h2>
          <Table result={day.matches} team={team}></Table>
        </>
      );
    })}
    <h2>各種リンク</h2>
    <ul>
      <li>
        <a href="https://vtuber-saikyo.jp/">大会公式サイト</a>
      </li>
      <li>
        <a href="https://twitter.com/ShibuyaHAL">渋谷ハルさんTwitter</a>
      </li>
      <li>
        <a href="https://youtube.com/c/HALchannel">渋谷ハルさんYouTube</a>
      </li>
    </ul>
  </Layout>
);

export default MainPage;
