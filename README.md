# ページ追加時のルーティング設定

- [ ] ページ追加のルーティング設定を学ぶ

## User一覧ページの追加
- ユーザー一覧ページを作成し、ナビゲーションにリンクを追加する  
  
### Step1
```src/components/pages/``` に ```Users.tsx``` 追加  
```
const Users = () => {
  return (
    <div>Users</div>
  )
}

export default Users
```

### Step2
- Header.tsx 内のpagesPathにusersのリンクを追加する
```
const pagesPath = [
  { id: 1, path: "/", name: "Home" },
  { id: 2, path: "/users", name: "ユーザー一覧" },
];
```

### Step3
- /usersでアクセスした際にUsersコンポーネントを表示させるためルーティングの設定をする  
```src/router/index.tsx```
```
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/pages/Home"
import Users from "../components/pages/Users" // 追記
import ErrorBoundary from "../components/pages/ErrorBoundary";
import Layout from "../components/templates/Layout";


const router = createBrowserRouter([
  {
    path: "/",
    // elementに共通レイアウトを指定（下記の場合、Layoutコンポーネントの<Outlet />の箇所に、<Home />がレンダリングされる）
    element: <Layout />,
    // pathがマッチしない場合にerrorElement表示
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />
      },
      // 追記
      {
        path: "users",
        element: <Users />
      },
    ]
  }
]);

export const Router = () => <RouterProvider router={router} />;
```


## Footer
```
import styled from "styled-components";

const FooterBlock = styled.footer`
  background-color: #000;
  padding: 10px;
  margin-top: auto;
  color: #fff;
  text-align: center;
`;

const Footer = () => {
  return <FooterBlock>&copy; hoge, inc</FooterBlock>;
};

export default Footer
```

## Layout
```
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
      <Footer />
    </Wrapper>
  );
};

export default Layout
```

# その他のスタイル設定
## CSS Module
コンポーネント単位でローカルスコープでのスタイル定義が可能  
そのためスタイルの競合が回避できる  
  
### 使用例
#### Step1
Header.tsxと同階層に、header.modules.css ファイルを作成  
通常のcssと同じように記述できる  
```
.headerBlock {
  background-color: #000;
  padding: 10px;
  display: flex;
  align-items: center;
}
.navBlock {
  display: flex;
  list-style: none;
  gap: 20px;
  margin-left: auto;
}
.navBlock li {
  font-size: 18px;
}
.styledLink {
  color: white;
}
```

#### Step2
使用するコンポーネントで呼び出して要素に指定  
Header.tsx
```
import { Link } from "react-router-dom";
import styles from "./header.modules.css";

const pagesPath = [
  { id: 1, path: "/", name: "Home" },
];

function Logo() {
  return (
    <Link className={styles.styledLink} to={'/'}><img src="/images/logo.png" /></Link>
  )
}

const Header = () => {
  return (
    <header className={styles.headerBlock}>
      <Logo />
      <nav className={styles.navBlock}>
        {pagesPath.map((pagePath) => {
          return (
            <li key={pagePath.id}>
              <Link className={styles.styledLink} to={pagePath.path}>{pagePath.name}</Link>
            </li>
          );
        })}
      </nav>
    </header>
  );
};

export default Header
```