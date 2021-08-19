import * as React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Table from '../components/table';
import data from '../data/data.json';

const MainPage: React.FC = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <p>
        2021年8月22日に行われる渋谷ハルさん主催の VTuber最協決定戦 SEASON3 Ver APEX LEGENDS の事前練習カスタム
        (スクリム)
        の試合結果一覧です。正確性を保つ努力はしておりますが、集計に誤りがある可能性があります。ご了承ください。
      </p>
      <ul style={{ fontSize: '0.9em' }}>
        <li>マップはすべてWorld&apos;s Edgeです。</li>
        <li>
          本番は全5試合のうち、1試合目3ポイント、2,3試合目6ポイントのキルポイント上限があります。練習カスタムでは全チームが各マッチのキルポイント上限を意識して動いているわけではないため、キルポイント上限の有無を切り替えて結果を見られるようにしています。
        </li>
        <li>各日6試合目以降の延長戦はキルポイント上限無しで集計しています。</li>
        <li>
          キルポイント上限を適用しているときにキル数が<em>斜体</em>
          で表示されているものは上限を超えていることを意味します。
        </li>
      </ul>
      {data
        .concat() // reverse は破壊メソッド
        .reverse()
        .map((day, i) => {
          const [maxKill, setMaxKill] = React.useState<boolean>(false);
          return (
            <React.Fragment key={i}>
              <h2>{day.day}</h2>
              <FormControlLabel
                onChange={(_, checked) => setMaxKill(checked)}
                value="start"
                control={<Checkbox color="primary" />}
                label="キルポイント上限を適用する"
                labelPlacement="start"
              />
              <Table dayResult={day.matches} enableMaxKill={maxKill} />
            </React.Fragment>
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
};

export default MainPage;
