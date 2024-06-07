# ステート管理

- [ ] useStateの使い方をイベントハンドラを通して学ぶ

## Stateページの作成
- [2-1](https://github.com/nadia-sawai/eg-react-training/tree/feature/2-1) と同じようにページコンポーネントの追加とルーティングの設定を行う  

```pages/State.tsx``` の作成
```
import { PageTitle } from "../ui/Title"

function State() {
  return (
    <PageTitle title="State" />
  )
}

export default State
```  
```router/index.tsx``` にimportとルーティングの追加
```
import State from "../components/pages/State"
~~
{
  path: "state",
  element: <State />
},
```  
```templates/Header.tsx``` にリンク追加
```
const pagesPath = [
  { id: 1, path: "/", name: "Home" },
  { id: 2, path: "/users", name: "ユーザー一覧" },
  { id: 3, path: "/state", name: "State" },
];
```

## ボタンの設置とクリックイベントの実装
### 例１）ボタンコンポーネントを使い、クリックで数字が増減する機能  
```pages/State.tsx```  
```
import { useState } from "react"
import Button from "../ui/Button"
import { PageTitle } from "../ui/Title"
import styled from "styled-components"

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`

function State() {
  // useStateを使い、初期値を0とする
  const [count, setCount] = useState(0)

  // クリックした際の関数
  const increment = () => {
    // 現在のcountが0の場合、prevは0となり、prev + 1が返される
    setCount(prev => prev + 1)
  }
  const decrement = () => {
    // 現在のcountが1の場合、prevは1となり、prev - 1が返される
    setCount(prev => prev - 1)
    // 補足：coutを0以下にさせない場合は、現在のcount(prev)が0の際はそのまま返す
    // setCount(prev => prev > 0 ? prev -1 : prev)

  }
  return (
    <>
      <PageTitle title="State" />
      // クリックイベントで関数を呼び出す
      <ButtonWrap>
        <Button onClick={increment}>クリックで増加</Button>
        <Button variant="secondary" onClick={decrement}>クリックで減少</Button>
      </ButtonWrap>
      <div>カウント：{count}</div>
    </>
  )
}

export default State
```

### 例2）ステートによるコンテンツの出し分け
```
function State() {
  ...
  // 初期値はfalse
  const [bool, setBool] = useState(false)
  ...
  // false ↔ true 切り替え
  const changeBool = () => {
    setBool(prev => !prev)
  }
  ...
  return (
    <>
      ...
      {/* ステートによるコンテンツの出し分け */}
      <Button onClick={changeBool}>クリック</Button>
      {/* boolがtrueのとき、falseのときでコンテンツの出し分け */}
      {bool ? <div>boolはtrue</div> : <div>boolはfalse</div>}
    </>
  )
```
