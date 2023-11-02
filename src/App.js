import { useState } from 'react';
import Form from './components/Form';
import data from "./data";

import './App.css';

function App() {
  const [selected, setSelected] = useState("");
  const LOCATION = [
    "北海道",
    "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", "山梨県", "長野県",
    "新潟県", "富山県", "石川県", "福井県",
    "岐阜県", "静岡県", "愛知県", "三重県",
    "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
    "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県",
    "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県",
    "沖縄県",
  ];

  // 方面
  const area = {
    hokkaido_touhoku: ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
    kantoh:           ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", "山梨県", "長野県"],
    hokuriku_tyubu:   ["新潟県", "富山県", "石川県", "福井県", "岐阜県", "静岡県", "愛知県", "三重県"],
    kinnki:           ["滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"],
    tyuugoku_shikoku: ["鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県"],
    kyuusyuu_okinawa: ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"]
  };

  // 方面別送料
  // フォームで選択された都道府県のpropsが入る。とりあえず今は大阪府を入れている。
  const direction = Object.keys(area).find(key => area[key].includes(selected));
  const fee = {
    hokkaido_touhoku: { 10: 400, 50: 500, 100: 600 },
    kantoh:           { 10: 300, 50: 400, 100: 500 },
    hokuriku_tyubu:   { 10: 200, 50: 300, 100: 400 },
    kinnki:           { 10: 100, 50: 200, 100: 300 },
    tyuugoku_shikoku: { 10: 200, 50: 300, 100: 400 },
    kyuusyuu_okinawa: { 10: 300, 50: 400, 100: 500 },
  };
  
  // これで送料が出る。
  // fee[{ propsで方面 }][{ propsでグラム数 }]
  // 条件分岐で回さないとエラーになる。
  const sendFee = direction ? fee[direction][10] : "";
  console.log(sendFee);

  return (
    <div className="App">
      <select 
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        name=""
        id=""
      >
        {
          LOCATION.map(location => (
            <option key={location} value={location}>{location}</option>
          ))
        }
      </select>
      <div>選択された都道府県: {selected}</div>
      {/* <Form products={products} /> */}

      {/* <h3>検索</h3>
      <input type="text" onChange={input} />
      <ul>
        {
          products.forEach((product) => {
          })
        }
      </ul> */}
    </div>
  );
}

export default App;
