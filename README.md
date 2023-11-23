# インスタンスを出力する

## 配列

値に"Dog", "Cat", "Rat"が入った配列を`ul`で出力する。

```jsx
const animals = ["Dog", "Cat", "Rat"];

const Example = () => {
  // // 変換した値をリストでまとめることを明示的に書くとこうなる。
  // const listItem = animals.map((animal) => [
  //   <li key={animal}>{animal}</li>
  // ])
  // 省略して書くとこうなる。
  // `React`ではキーは必須。一意であることが必要となる。
  // キーがないと配列に値を追加する場合に洗い替えが起きてしまう。
  // また、同じ趣旨からインデックスは今後使わないこと。
  // メモリの無駄になるから。
  const listItem = animals.map((animal) => <li key={animal}>{animal}</li>)

  return (
    <>
      <h3>配列の操作</h3>
      <ul>
        <li>
          {listItem}
        </li>
      </ul>
    </>
  );
};

export default Example;
```

## リストを外注に出してする配列（ハッシュ）の処理

```jsx
parent: Example.js

import Profile from "./components/Profile.js";

const Example = () => {
  const memberList = [
    { name: "Geo", age: 18, hobby: ["sports", "music"] },
    { name: "Tom", age: 25, hobby: ["movie", "music"] },
    { name: "Lisa", age: 21, hobby: ["sports", "travel", "game"] }
  ];

  // 1. 
  // ハッシュを値に持った配列を使ってリストを作成方法として、
  // これを外注に出す際は、map関数で回し、値一つ一つを呼びながら分割代入する。

  return (
    <>
      <ul>
        {
          memberList.map((member) => (
            <li key={member.name}>
              <Profile {...member} />
            </li>
          ))
        }
        {/* {listItem} */}
      </ul>
    </>
  );
};

export default Example;
```

```jsx
child: Profile.js

// 2. 
// コンポーネント側では、分割代入の書式で入ってきたら
// キーで受けて値をもらって展開する。
// 呼んだ回数だけハッシュが返る。
// あとは、一回ずつフォーマットとなるJSXに合わせて適宜インスタンスを配置すれば良い。

const Profile = ({name, age, hobby}) => {
  return (
    <>
      <hr />
      <div>Name: {name}</div>
      <div>Age: {age}</div>
      <div>Hobby: 
        <ul>
          {hobby.map(item => <li>{item}</li>)}
        </ul>
      </div>
    </>
  )
};

export default Profile;
```

## inputの処理と検索結果をリストで返す

```jsx
import { useState } from "react";

const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];
  const [searchChar, setSearchChar] = useState("");
  // 入力イベントを状態に渡す。
  const input = (e) => { setSearchChar(e.target.value) };

  return (
    <>
      <h3>配列のフィルター</h3>
      {/* input独自関数に入力（e）を渡す。 */}
      {/* value={searchChar}は無くても成立するが。。。 */}
      <input type="text" onChange={(input)} />
      <ul>
        {
          animals
            // ここが心臓。検索部分。
            .filter(animal => animal.indexOf(searchChar) !== -1)
            // 検索を踏まえて収集された配列に対してリストを作る。
            .map((animal) => (
              <li key={animal}>{animal}</li>
            ))
        }
      </ul>
    </>
  );
};

export default Example;
```

## indexOf関数の解説

```jsx
import { useState } from "react";

const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];
  const [searchChar, setSearchChar] = useState("");
  const input = (e) => { setSearchChar(e.target.value) };

  return (
    <>
      <h3>配列のフィルター</h3>
      <input type="text" onChange={(input)} />
      <ul>
        {
          // 検索結果を出してから何かしらの処理をはさみ、できたインスタンスを返したい場合。
          animals
            // あえて無名関数的に書いてみる。funcName => {};
            .filter(animal => {
              // 検索に一文字でも正解があったら`0`を返す。そして`-1`でなければ`true`を返す。
              const isMatch = animal.indexOf(searchChar) !== -1;
              // とりあえず、`console.log`を挟んでみる。
              console.log(animal.indexOf(searchChar))
              console.log(isMatch)
              // 処理結果をreturnで返すことは必須。
              return isMatch
            })
            // なぜ無形関数の本文をかっこで囲むのか？　`() => ()`
            // 戻り値がオブジェクトリテラルで囲まれているから。
            .map((animal) => (
              <li key={animal}>{animal}</li>
            ))
        }
      </ul>
    </>
  );
};

export default Example;
```

## if条件分岐、三項演算子、＆＆、null合体演算子　？？

```jsx
import { useState } from "react";

const Example = () => {
  const animals = ["Dog", "Cat", undefined, "Rat"];
  const [filterVal, setFilterVal] = useState("");

  return (
    <>
      <input
        type="text"
        value={filterVal}
        onChange={(e) => setFilterVal(e.target.value)}
      />
      <ul>
        {animals
          .filter((animal) => {
            // 対象のオブジェクトに値が入っていない場合のエラー対策
            const animalStr = animal ?? "";
            const isMatch = animalStr.indexOf(filterVal) !== -1;
            return isMatch;
          })
          .map((animal) => {
            // 条件分岐　その1
            if (animal === "Dog") {
              return <li key={animal}>{animal}★</li>
            } else {
              return <li key={animal}>{animal}</li>
            }

            // 条件分岐　その2-1
            return <li key={animal}>{animal === "Dog" ? animal + "★" : animal}</li>

            // 条件分岐　その2-2
            return <li key={animal}>{animal + (animal === "Dog" ? "★" : "")}</li>

            // 条件分岐　その3
            // これでは、falseがそのまま出力される。
            return <li key={animal}>{animal + (animal === "Dog" && "★")}</li>
            // 式をオブジェクト・リテラルで囲むと真偽値を出力しない。
            return <li key={animal}>{animal}{animal === "Dog" && "★"}</li>

            // 条件分岐　その4　null合体演算子
            // A ?? B
            // A => null or undefinedの場合に、Bの値をとる。
            // エラーがあった場合に明示する処理も書ける。
            return <li key={animal}>{animal ?? "nullまたはundefined"}{animal === "Dog" && "★"}</li>
          })
        }
      </ul>
    </>
  );
};

export default Example;
```

## リファクタリング

### リスト（ul）を子コンポーネントへ出してリファクタリングする

```jsx
親コンポーネント: Example.js

import { useState } from "react";
import AnimalList from "./components/AnimalList";

// 2.
// 移動させる機能について、
// 出力するリストの生成は子コンポーネント。
// 親側でフィルターしてネタになるリストを`animals`プロップス経由で
// 子コンポーネントへ送信という方法でリファクタリングする。

// フィルターでやっていることは、
// 変数`animal`と入力`filterVal`が一文字でも合えば`true`を返す。
// `true`を返すことで配列の値として入れていくことをする。

// よく分からない部分はこれだ。
// filter関数は、文の中で`true`を返すと配列に入れるという理解がなかった。

const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];
  const [filterVal, setFilterVal] = useState("");
  const filterdAnimals = animals.filter((animal) => {
    const isMatch = animal.indexOf(filterVal) !== -1;
    return isMatch;
  });
  console.log(filterdAnimals);
  const input = (e) => { setFilterVal(e.target.value) };

  return (
    <>
      <input type="text" value={filterVal} onChange={input} />
      {/*       
        3.
        子コンポーネントへフィルターした配列を`props`で送る。
        ここで注意。
        やりとりするのは『属性』だよ。
        props本体の名称ではないよ。全然意識してなかったけど。。。確認。
      */}
      <AnimalList animals={filterdAnimals} />
    </>
  );
};

export default Example;
```

```jsx
子コンポーネント: AnimalList

const AnimalList = ({ animals }) => {
  // 1.
  // このコンポーネントの趣旨はリストを生成させる。
  // 検索要件に沿ってフィルターにかけて配列を生成させる箇所は本来の機能ではない。
  // だから、親コンポーネントへ戻すべき。
  return (
    <>
      <ul>
        {animals
          // .filter((animal) => {
          //   const isMatch = animal.indexOf(filterVal) !== -1;
          //   return isMatch;
          // })
          .map((animal) => {
            return (
              <li key={animal}>
                {animal}
                {animal === "Dog" && "★"}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default AnimalList;
```

### リスト（li）を子コンポーネントへ出してリファクタリングする

```jsx
親コンポーネント: Example.js
こちらは変わらず。

import { useState } from "react";
import AnimalList from "./components/AnimalList";

const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];
  const [filterVal, setFilterVal] = useState("");
  const filterdAnimals = animals.filter((animal) => {
    const isMatch = animal.indexOf(filterVal) !== -1;
    return isMatch;
  });
  const input = (e) => { setFilterVal(e.target.value) };

  return (
    <>
      <input type="text" value={filterVal} onChange={input} />
      <AnimalList animals={filterdAnimals} />
    </>
  );
};

export default Example;
```

```jsx
子コンポーネント: AnimalList

// li要素を引っ張ってくる。
import  AnimalItem from "./AnimalItem"

const AnimalList = ({ animals }) => {
  // 検索結果がなかった時にメッセージを出す。エラー対策。
  if (animals.length === 0) { return <h4>その文字列では見つかりません。</h4>; }
  
  return (
    <ul>
      {animals
        .map((animal) => {
          // 孫コンポーネントをここにさす。プロップスの設定。
          return <AnimalItem animal={animal} />;
        })}
    </ul>
  );
};

export default AnimalList;
```

```jsx
孫コンポーネント: AnimalItem

// propsを引き取る。
const AnimalItem = ({ animal }) => {

  return (
    <li key={animal}>
      {animal}{animal === "Dog" && "★"}
    </li>
  );
};

export default AnimalItem;
```

## input要素を子コンポーネントへ書き出す

```jsx
親コンポーネント: Example.js

import { useState } from "react";
import AnimalList from "./components/AnimalList";
import AnimalFilter from "./components/AnimalFilter";

const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];
  const [filterVal, setFilterVal] = useState("");
  const filterdAnimals = animals.filter((animal) => {
    const isMatch = animal.indexOf(filterVal) !== -1;
    return isMatch;
  });

  return (
    <>
      {/* 状態を渡すときのやり方 */}
      {/* filterValの状態だから、filterValStateとしてみて、 */}
      {/* 定義した時と同じものじゃない。 */}
      {/* このコードの中に漂っているインスタンスを配列にしてJSXに詰め込んで */}
      {/* propsで送信する。 */}
      <AnimalFilter filterValState={[filterVal, setFilterVal]} />
      <AnimalList animals={filterdAnimals} />
    </>
  );
};

export default Example;
```

```jsx
子コンポーネント: AnimalFilter

// 状態のpropsの受け渡しに特徴あり。習得する。
// それ以外はまぁ普通。

const AnimalFilter = ({ filterValState }) => {
  // propsを受け取って分割代入で解凍する。
  const [filterVal, setFilterVal] = filterValState;
  const input = (e) => { setFilterVal(e.target.value) };
  
  return (
    <input type="text" value={filterVal} onChange={input} />
  );
};

export default AnimalFilter;
```

気をつけないといけない。
子コンポーネントへコードを分けていくときに、
liに関わるkey属性についてエラーが出ることがある。

子コンポーネントではなく、その親コンポーネントの接木のところにkey属性をつけてやらないといけない。
落とし穴です。

```jsx
相対的親コンポーネント: AnimalList.js

import  AnimalItem from "./AnimalItem"

const AnimalList = ({ animals }) => {
  if (animals.length === 0) { return <h4>その文字列では見つかりません。</h4>; }
  
  return (
    <ul>
      {animals
        .map((animal) => {
          // 接木のここへつける。
          return <AnimalItem animal={animal} key={animal} />;
        })}
    </ul>
  );
};

export default AnimalList;
```


```jsx
子コンポーネント: AnimalItem

const AnimalItem = ({ animal }) => {

  return (
    // warrningが出ておかしいと思ったが、
    // 子コンポーネントにつけてはダメなんだね。
    // 親につける。
    // <li key={animal}>
    <li>
      {animal}{animal === "Dog" && "★"}
    </li>
  );
};

export default AnimalItem;
```

## 基本的なインプット

```jsx
import { useState } from "react";

const Example = () => {
  const [inputVal, setInputVal] = useState("");
  const [textAreaVal, setTextAreaVal] = useState("");
  const clearVal = () => {
    setInputVal("");
    setTextAreaVal("");
  }

  return (
    <>
      <label htmlFor="inputBox">ラベル</label>
      <input 
        id="inputBox"
        type="text"
        onChange={(e) => setInputVal(e.target.value)}
        value={inputVal}
        placeholder="こんにちは"
      />
      <textarea 
        id="inputTextArea"
        type="text"
        onChange={(e) => setTextAreaVal(e.target.value)}
        value={textAreaVal}
        placeholder="こんにちは"
      />
      <button onClick={clearVal}>クリアする</button>
    </>
  );
};

export default Example;
```

## 基本的なラジオボタン

```jsx
import { useState } from "react";

const Example = () => {
  const [fruit, setFruit] = useState(true);
  const onChange = (e) => setFruit(e.target.value);

  return (
    <>
      <input id="Apple" type="radio" onChange={onChange} checked={fruit === "Apple"} value="Apple" />
      <label htmlFor="Apple">Apple</label>
      <input id="Banana" type="radio" onChange={onChange} checked={fruit === "Banana"} value="Banana" />
      <label htmlFor="Banana">Banana</label>
      <input id="Cherry" type="radio" onChange={onChange} checked={fruit === "Cherry"} value="Cherry" />
      <label htmlFor="Cherry">Cherry</label>
    </>
  );
};

export default Example;
```

## ラジオボタンをリファクタリングする

```jsx
import { useState } from "react";

const Example = () => {
  const [fruit, setFruit] = useState(true);
  const onChange = (e) => setFruit(e.target.value);
  const RADIO_COLLECTION = ["Apple", "Banana", "Cherry"];

  return (
    <>
      {
        RADIO_COLLECTION.map(item => {
          return (
            <div key={item}>
              <input id={item} type="radio" onChange={onChange} checked={fruit === item} value={item} />
              <label htmlFor={item}>{item}</label>
            </div>
          );
        })
      }
    </>
  );
};

export default Example;
```

## 基本的なチェックボックス

```jsx
import { useState } from "react";

const Example = () => {
  const [check, setCheck] = useState(true);
  const checkToggle = (e) => {
    // toggleの仕組みはこうなっている。
    // 最終的には使わないが、
    // `e`には`check`したときには`true`、`check`を外したら`false`が入る。
    // console.log(e.target.value); => true or false
    console.log(e.target.value);
    // 摩訶不思議なんだが、
    // setCheckはuseStateのgetter（更新関数）で、
    // 引数には現在この関数が注目している`e`が入ってきてくれる。
    // console.log(prevState); => true or false
    setCheck((prevState) => {
      // ここが`toggle`部分
      // 状態が`true`の時は`false`を、`false`の時は`true`を変数に格納し返す。
      let state = !prevState;
      return state;
    });

    // 1行最終的短縮系
    const checkComponent = () => setCheck(prev => !prev);
  };
  
  return (
    <>
      <input  id="checkbox" 
              type="checkbox" 
              value={check} 
              onChange={checkToggle} 
              checked={check} />
      <label htmlFor="checkbox">
        {check ? <p>ON!</p> : <p>OFF!</p>}
      </label>
    </>
  );
};

export default Example;
```

##　実践演習　複数checkboxとチェックした要素に紐づく値を合計する

```jsx
import { useState } from "react";

const Example = () => {

  // checkboxとラベル部
  const [fruits, setFruits] = useState([
    { name: "Apple", value: 100, checked: false },
    { name: "Banana", value: 200, checked: false },
    { name: "Cherry", value: 300, checked: false },
  ]);

  // 合計値表示部
  const [sum, setSum] = useState(0);

  // `checkbox`をクリックしたら発生する`e`（イベント）は、
  // `jsx`の`value={fruit.name}`を参照している。
  // なので、`e.target.value`は選択した果物の名前が返ってくるわけ。
  const handleChange = (e) => {
    // `React.js`は元のオブジェクトを使う際は、コピーしてから使う原則がある。
    const newFruits = fruits.map((fruit) => {
      // ...fruitでfruitの中身（ハッシュ）を持ってきて、
      // 改めて{}リテラルで囲んで変数に代入して複製という手順がReact.js流。
      const newFruit = { ...fruit };
      if (newFruit.name === e.target.value) {
        newFruit.checked = !fruit.checked;
      }
      return newFruit;
    });
    // `return`されたnewFruitsを状態のsetterに引数で入れてやる。
    // 新たな状態を生成する。
    setFruits(newFruits);

    // 合計表示
    let sumVal = newFruits
      .filter((fruit) => fruit.checked)
      .reduce((sumVal, fruit) => sumVal + fruit.value, 0);
    // 状態へ渡してやる。
    setSum(sumVal);
  };
  
  return (
    <>
      {
        fruits.map((fruit) => {
          return (
            <div key={fruit.name}>
              <input 
                id={fruit.name}
                value={fruit.name}
                type="checkbox"
                onChange={handleChange}
                checked={fruit.checked}
              />
              <label htmlFor={fruit.name}>{fruit.name}: {fruit.value}</label>
            </div>
          )
        })
      }
      <div>合計：{sum}</div>
    </>
  );
};

export default Example;
```

## フォームのプルダウンを作成

複数チェックボックスのことを考えたら楽。

```jsx
import { useState } from "react";

const Example = () => {
  const [selected, setSelected] = useState("Apple");
  const OPTIONS = ["Apple", "Banana", "Cherry"];

  return (
    <>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {
          // {}だとダメなやつ。
          OPTIONS.map(item => (
            <option key={item} value={item}>{item}</option>
          ))
        }
      </select>
      <div>選択された果物: {selected}</div>
    </>
  );
};

export default Example;
```

## フォーム要素の総仕上げ　todoアプリを作る

### 構成

Example.js--Todo.js--list.js
                  |
                   --form.js

### 進め方

* 状態はTodo.jsに持たせる。
* 生成させるのは『やること（todo）の内容』とそれに紐づいた『id』。
* List.jsはリスト表示と完了ボタンをクリックした時のトリガー担当。

この時点でやることがイメージできるようにならないといけない。
訓練しかない。

まずは、この状態を作る。
* Todoに登録されたリストを表示する。
* 完了ボタンを押したらその内容は削除される。

```jsx
親コンポーネント: Example.js

import Todo from "./components/Todo";

const Example = () => {

  return (
    <>
      <h2>Reminder</h2>
      <Todo />
    </>
  );
};

export default Example;
```

```jsx
子コンポーネント: Todo.js

import { useState } from "react";
import List from "./List";
import Form from "./Form";

const Todo = () => {
  // 入力も含めて状態の元ネタ。
  const todosList = [
    { id: 1, content: "店予約する" },
    { id: 2, content: "卵買う" },
    { id: 3, content: "郵便出す" },
  ];
  // 元ネタを引数に状態を作る。
  const [todos, setTodos] = useState(todosList)

  const deleteTodo = (id) => {
    // 渡ってきた`id`と同じではない`id`をfilter関数で選り分けて収集する。
    const selectTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    // 選り分けて収集したハッシュを状態の引数として新たな状態を生成させる。
    setTodos(selectTodos);
  };

  return (
    <>
      <List todos={todos} deleteTodo={deleteTodo} />
      <Form />
    </>
  );
};

export default Todo;
```

```jsx
孫コンポーネント: List.js

const List = ({ todos, deleteTodo }) => { 
  const complete = (id) => {
    deleteTodo(id);
  };

  return (
    <>
      {
        todos.map(item => {
          return (
            <div key={item.id}>
              {/* これまでは、e＝イベントにアクセスしていた。今回は、 */}
              {/* ハッシュの中の各パラメータにアクセスする方法 */}
              <button onClick={() => complete(item.id)}>完了</button>
              <span>{item.content}</span>
            </div>
          )
        })
      }
    </>
  );
};

export default List;
```

* input要素に入力したら内容がリストに追加される。

```jsx
子コンポーネント: Todo.js

import { useState } from "react";
import List from "./List";
import Form from "./Form";

const Todo = () => {
  const todosList = [
    { id: 1, content: "店予約する" },
    { id: 2, content: "卵買う" },
    { id: 3, content: "郵便出す" },
  ];
  const [todos, setTodos] = useState(todosList)

  const deleteTodo = (id) => {
    const selectTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(selectTodos);
  };  

  // 親に状態があるので、関数を定義して子に渡す。
  // 渡したコンポーネントでその関数に値を入れて返信してもらう段取り。
  // createTodo関数定義
  // 新たにTodoを追加する。
  // 状態のsetter。現状のTodoリストに新しいTodoを追加。
  const createTodo = (todo) => {
    setTodos([...todos, todo])
  }

  return (
    <>
      <List todos={todos} deleteTodo={deleteTodo} />
      {/* 新規でTodoを追加する関数をPropsで子コンポーネントに渡す。 */}
      <Form createTodo={createTodo} />
    </>
  );
};

export default Todo;
```

```jsx
孫コンポーネント: Form.js

import { useState } from "react";

// 親コンポーネントから新規でTodoを追加する関数を受け取る。
const Form = ({ createTodo }) => {
  const [enteredTodo, setEnteredTodo] = useState("");
  const addTodo = (e) => {
    // <form onSubmit={addTodo}></form>の動作、
    // フォームに色々と入力し、送信をした時点でページをリロードする。
    // という動作を止める。
    e.preventDefault();
    const newTodo = {
      // 10の5乗した値をidに放り込んでおく。
      id: Math.floor(Math.random() * 1e5), 
      // 瞬く間にリストに項目が追加される。
      content: enteredTodo
    };
    createTodo(newTodo);
    setEnteredTodo("")
  };

  return (
    <form onSubmit={addTodo}>
      <input
        type="text"
        value={enteredTodo}
        // 入力している時点で状態に値が入っていく。
        // フォームにサブミットが押され、リロードしたタイミングで
        // enteredTodoが確定、そしてリストされる。
        // 瞬く間にやっているから人間の目には
        // エンターを押した時点でリストされるように見えているだけ。
        onChange={(e) => setEnteredTodo(e.target.value)} 
      />  
      <button>追加</button>
    </form>
  );
};

export default Form;
```