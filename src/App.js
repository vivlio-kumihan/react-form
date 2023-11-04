import { useState } from 'react';
import data from "./data";

import './App.css';

function App() {
  const [product, setProduct] = useState(data);
  const [selected, setSelected] = useState("");

  // 都道府県
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
  const AREA = {
    "北海道_東北": ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
    "関東":           ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", "山梨県", "長野県"],
    "北陸_中部":   ["新潟県", "富山県", "石川県", "福井県", "岐阜県", "静岡県", "愛知県", "三重県"],
    "近畿":         ["滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"],
    "中国_四国": ["鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県"],
    "九州_沖縄": ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"]
  };

  // 方面別送料
  // フォームで選択された都道府県のpropsが入る。とりあえず今は大阪府を入れている。
  const direction = Object.keys(AREA).find(key => AREA[key].includes(selected));
  const fee = {
    "北海道_東北": { 10: 400, 50: 500, 100: 600 },
    "関東":       { 10: 300, 50: 400, 100: 500 },
    "北陸_中部":   { 10: 200, 50: 300, 100: 400 },
    "近畿":       { 10: 100, 50: 200, 100: 300 },
    "中国_四国":   { 10: 200, 50: 300, 100: 400 },
    "九州_沖縄":   { 10: 300, 50: 400, 100: 500 },
  };
  
  // これで送料が出る。
  // fee[{ propsで方面 }][{ propsでグラム数 }]
  // 条件分岐で回さないとエラーになる。
  const sendFee = direction ? fee[direction][10] : "";
  console.log(sendFee);
  
  return (
    <div className="App">
    {product.map((item) => (
      <ul key={item.pid}>
        {item.type.length === 0 && item.color.length === 0
          ? 
          <>
            <NameCounter 
              key={item.name} 
              name={item.name} 
              fee={item.price} 
            />
          </>
          : item.name
        }
        <li>
          {item.type && item.type[0]
            ? Object.entries(item.type[0]).map(([key, value]) => (
              <TypeCounter key={key} type={key} fee={item.price} />
            ))
            : ""}
        </li>
        <li>
          <ul>
          {item.color && item.color[0]
            ? Object.entries(item.color[0]).map((key) => (
              <li key={key}>
                <ColorCounter key={key} color={key} fee={item.price} />
              </li>
            ))
            : ""}
          </ul>
        </li>
        <li>{item.weight}</li>
        <li>{item.price}</li>
      </ul>
    ))}

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
  </div>
  );
}

const NameCounter = ({ name, fee }) => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount(count + 1);
  };
  const countDown = () => {
    setCount(count - 1);
  };
  const subTotal = fee * count;
  
  return (
    <>
      <button onClick={countUp}>plus</button>
      <p>{`${name}: ${count}`}</p>
      <button onClick={countDown}>minus</button>
    </>
  );
}

const TypeCounter = ({ type, fee }) => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount(count + 1);
  };
  const countDown = () => {
    setCount(count - 1);
  };

  return (
    <>
      <button onClick={countUp}>plus</button>
      <p>{`${type}: ${count}`}</p>
      <button onClick={countDown}>minus</button>
    </>
  );
};

const ColorCounter = ({ color }) => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount(count + 1);
  };
  const countDown = () => {
    setCount(count - 1);
  };

  return (
    <>
      <button onClick={countUp}>plus</button>
      <p>{`${color}: ${count}`}</p>
      <button onClick={countDown}>minus</button>
    </>
  );
};

export default App;
