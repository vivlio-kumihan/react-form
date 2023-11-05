import { useState } from 'react';
import data from "./data";

import './App.css';

function App() {
  const [product, setProduct] = useState(data);
  const [selected, setSelected] = useState("");
  const [nameTotalCount, setNameTotalCount] = useState(0);
  const [typeTotalCount, setTypeTotalCount] = useState(0);
  const [colorTotalCount, setColorTotalCount] = useState(0);
  const [totalFee, setTotalFee] = useState(0);

  const calcTotal = (unitPrice) => {
    const total = 
      nameTotalCount  * unitPrice +
      typeTotalCount  * unitPrice + 
      colorTotalCount * unitPrice;
    setTotalFee(total);
  };

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
  
  return (
    <div className="App">
    {product.map((item) => (
      <ul key={item.pid}>
        {item.type.length === 0 && item.color.length === 0
          ? 
          <NameCounter 
            key={item.name} 
            name={item.name} 
            fee={item.price} 
            nameTotalCount={nameTotalCount}
            setNameTotalCount={setNameTotalCount}  
            calcTotal={calcTotal}
          />
          : item.name
        }
        <li>
          {item.type.length > 0
            ? item.type.map((typeValue) => (
              <TypeCounter 
                key={typeValue} 
                typeValue={typeValue} 
                fee={item.price} 
                typeTotalCount={typeTotalCount}
                setTypeTotalCount={setTypeTotalCount}
                calcTotal={calcTotal}
              />
            ))
            : ""}
        </li>
        <li>
          {item.color.length > 0
            ? item.color.map((colorValue) => (
              <ColorCounter 
                key={colorValue} 
                colorValue={colorValue} 
                fee={item.price} 
                colorTotalCount={colorTotalCount}
                setColorTotalCount={setColorTotalCount}
                calcTotal={calcTotal}
              />
            ))
            : ""}
        </li>
        {
          item.type.length === 0 && item.color.length === 0
            ? <li>
                <p>個数:&nbsp;{nameTotalCount}</p>
                <p>小計:&nbsp;{item.price * nameTotalCount}</p>
              </li>
            : ""
        }
        {
          item.type.length > 0
            ? <li>
                <p>個数:&nbsp;{typeTotalCount}</p>
                <p>小計:&nbsp;{item.price * typeTotalCount}</p>
              </li>
            : ""
        }
        {
          item.color.length > 0
            ? <li>
                <p>個数:&nbsp;{colorTotalCount}</p>
                <p>小計:&nbsp;{item.price * colorTotalCount}</p>
              </li>
            : ""
        }
        <li>重量:&nbsp;{item.weight}</li>
        <li>単価:&nbsp;{item.price}</li>
      </ul>
    ))}
    <h3>合計金額:&nbsp;{totalFee}</h3>

    <select 
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      name=""
      id=""
    >
      {
        LOCATION.map(location => (
          <option 
            key={location} 
            value={location}
          >
            {location}
          </option>
        ))
      }
    </select>
    <div>選択された都道府県: {selected}</div>
    </div>
  );
}

// Child Compornents ///////////////////////////////
const NameCounter = ({ name, fee, nameTotalCount, setNameTotalCount, calcTotal }) => {
// const NameCounter = ({ name, fee, nameTotalCount, setNameTotalCount }) => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount(count + 1);
    setNameTotalCount(nameTotalCount + 1);
    calcTotal(fee);
  };
  const countDown = () => {
    if (count > 0) {
      setCount(count - 1);
      setNameTotalCount(nameTotalCount - 1);
      calcTotal(fee);
    } else {
      setCount(0)
    }
  };
  const countReset = () => {
    setCount(0);
    setNameTotalCount(nameTotalCount - count);
    calcTotal(fee);
  }; 
  
  return (
    <li>
      <p>{`${name}: ${count}`}</p>
      <button onClick={countUp}>plus&nbsp;|&nbsp;</button>
      <button onClick={countDown}>minus&nbsp;|&nbsp;</button>
      <button onClick={countReset}>reset</button>
    </li>
  );
}

const TypeCounter = ({ typeValue, fee, typeTotalCount, setTypeTotalCount, calcTotal }) => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount(count + 1);
    setTypeTotalCount(typeTotalCount + 1);
    calcTotal(fee);
  };
  const countDown = () => {
    if (count > 0) {
      setCount(count - 1);
      setTypeTotalCount(typeTotalCount - 1);
      calcTotal(fee);
    } else {
      setCount(0)
    }
  };
  const countReset = () => {
    setCount(0);
    setTypeTotalCount(typeTotalCount - count);
    calcTotal(fee);
  }; 

  return (
    <>
      <p>{`${typeValue}: ${count}`}</p>
      <button onClick={countUp}>plus&nbsp;|&nbsp;</button>
      <button onClick={countDown}>minus&nbsp;|&nbsp;</button>
      <button onClick={countReset}>reset</button>
    </>
  );
};

const ColorCounter = ({ colorValue, fee, colorTotalCount, setColorTotalCount, calcTotal }) => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount(count + 1);
    setColorTotalCount(colorTotalCount + 1);
    calcTotal(fee);
  };
  const countDown = () => {
    if (count > 0) {
      setCount(count - 1);
      setColorTotalCount(colorTotalCount - 1);
      calcTotal(fee);
    } else {
      setCount(0)
    }
  };
  const countReset = () => {
    setCount(0);
    setColorTotalCount(colorTotalCount - count);
    calcTotal(fee);
  };

  return (
    <>
      <p>{`${colorValue}: ${count}`}</p>
      <button onClick={countUp}>plus&nbsp;|&nbsp;</button>
      <button onClick={countDown}>minus&nbsp;|&nbsp;</button>
      <button onClick={countReset}>reset</button>
    </>
  );
};

export default App;