# Context

- [ ] コンテキストの使い方を学ぶ
- [ ] グローバルなStateをもたせる

## Homeに簡易的なログイン・ログアウトボタンの作成
```pages/Home.tsx``` 
※一部省略

```
import { useState } from "react"

const Home = () => {
  // 初期はログインしていないためfalse
  const [isLogin, setIsLogin] = useState(false)

  const handleLogin = () => {
    setIsLogin(prev => !prev)
  }

  return (
    <>
      <h2>ログイン/ログアウトボタン</h2>
      {/* isLoginがtrue/falseでボタンテキストを変える */}
      {isLogin ? <Button variant="secondary" onClick={handleLogin} className="hoge">ログアウト</Button> : <Button variant="primary" onClick={handleLogin} className="hoge">ログイン</Button>}
      {isLogin ? <div>ログイン中</div> : <div>ログアウト中</div>}
    </>
  )
}
```
これだけだと、ユーザー一覧など別ページに遷移した際にisLoginが初期値のfalseになってしまう。  
これをページ遷移しても保持する方法は、propsの受け渡しかグローバルでstate（この場合はisLogin）を保持する必要がる。  
propsの受け渡しの場合、コンポーネント間で行う必要があるためバケツリレーとなり、階層が深くなると複雑化してしまう。  
そこでcontext apiを使用し、グローバル（どのコンポーネントからも利用できる）で管理する方法を取る。

## 1. contextの作成
```src/context/LoinContext.ts``` 
- createContextでコンテキストの生成を行う
```
import { createContext } from 'react';
// 型定義
export interface ContextValueType {
  isLogin: boolean; // ログイン状態のboolean
  toggleLogin: () => void // ログイン状態を切り替える関数で特に引数がないため()とする
}

// コンテキストの値を作成
const defaultValue: ContextValueType = {
  isLogin: false, // 初期値はログインしていないためfalse
  toggleLogin: () => {} // ログイン状態を切り替える関数
}

// createContextでコンテキストを生成
export const LoginContext = createContext<ContextValueType>(defaultValue);
```

## 2. providerの作成
```src/context/LoinProvider.tsx``` 
- コンテキストのデータを受取り、provider内のコンポーネントにデータを渡す役割
```
import { useState } from 'react';
import { LoginContext } from '../context/LoginContext';

const LoginProvider = (props:{
  children: React.ReactNode}
) => {
  const {children} = props
  const [isLogin, setIsLogin] = useState(false)

  const toggleLogin = () => {
    setIsLogin(prev => !prev)
  }
  // 作成したcontext.Providerでwrapする（このchildren内ではコンテキストの取得が可能）
  // valueは、isLogin（useStateの値）、toggleLogin関数を子コンポーネントに渡している
  // children内で、　toggleLogin()が使用できるようになるため、isLogin（ログインの切り替えが可能）
  return (
    <LoginContext.Provider value={{isLogin, toggleLogin}}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginProvider

```

## 3. main.tsxに反映
- インポートしたLoginProvideを設置（Router配下がproviderのchildrenにあたる）
```
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginProvider>
      <Router />
    </LoginProvider>
  </React.StrictMode>,
)
```

## 4. 使用方法
- さきほど記述したHome.tsxを修正する
- useContextを用いてisLoginとtoggleLoginを取得・使用し、値を変更する
```pages/Home.tsx``` 
```
import { useContext } from "react"
import Button from "../ui/Button"
import { PageTitle } from "../ui/Title"
import { LoginContext } from "../../context/LoginContext"

const Home = () => {
  // useContextを使い、LoginContextからisLogin, toggleLoginを分割代入を用いて取り出す
  const {isLogin, toggleLogin} = useContext(LoginContext);
  const handleClick = () => {
    console.log("click")
  }

  // handleLogin関数実行時に、toggleLogin()を実行する（providerのtoggleLoginが実行され、isLoginの値が変わる）
  const handleLogin = () => {
    toggleLogin()
  }

  return (
    <>
      <PageTitle title="Home" />
      <Button variant="primary" onClick={handleClick} className="hoge">Primary ボタン</Button>
      <Button variant="secondary" onClick={handleClick} className="hoge" disabled>Secondaryボタン(disabled)</Button>

      <h2>ログイン/ログアウトボタン</h2>
      {/* ボタン押下時にhandleLoginを実行 */}
      {isLogin ? <Button variant="secondary" onClick={handleLogin} className="hoge">ログアウト</Button> : <Button variant="primary" onClick={handleLogin} className="hoge">ログイン</Button>}
      {isLogin ? <div>ログイン中</div> : <div>ログアウト中</div>}
    </>
  )
}

export default Home
```

- ログインボタンを押して、ログイン中と表示された状態で別ページに遷移して再度トップにもどり、値がログイン中のままか確認する
- コンテキストの中に詰め込みすぎるとその値が更新されたタイミングでchildrenでcontextを使用しているコンポーネントがレンダリングされるため、その場合はコンテキストを分割してレンダリングを減らす

## おまけ（ヘッダーにログイン中/ログアウト中のテキスト表示
```/components/templates/Header.tsx```  

```
// contextをインポート
import { LoginContext } from "../../context/LoginContext";

// header背景が黒なので文字色を白に変更
const LoginState = styled.div`
  color: #fff;
  margin-left: 20px;
`;

const Header = () => {
  // useContextからisLoginを取得
  const {isLogin} = useContext(LoginContext)

  return (
    <HeaderBlock>
      <Logo />
      {/* Home同様にテキストの出し分け */}
      {isLogin ? <LoginState>ログイン中</LoginState> : <LoginState>ログアウト中</LoginState>}
      <NavBlock>
        {pagesPath.map((pagePath) => {
          return (
            <li key={pagePath.id}>
              <StyledLink to={pagePath.path}>{pagePath.name}</StyledLink>
            </li>
          );
        })}
      </NavBlock>
    </HeaderBlock>
  );
};

```
