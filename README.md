# スタイルの設定（styled-component）

- [ ] スタイルの指定を学ぶ

## インストール
```$ npm install styled-components```

## Header
- ロゴとナビゲーションを表示してスタイルをあてる
```
import { Link } from "react-router-dom";
import styled from "styled-components";

// styleを指定したコンポーネントとして利用できる
const HeaderBlock = styled.header`
  background-color: #000;
  padding: 10px;
  display: flex;
  align-items: center;
`;
const NavBlock = styled.nav`
  display: flex;
  list-style: none;
  gap: 20px;
  margin-left: auto;
  li {
    font-size: 18px;
  }
`;
// react-router-domの<Link />要素などにスタイルをあてる場合はstyled()内に指定する
const StyledLink = styled(Link)`
  color: white;
`;

const pagesPath = [
  { id: 1, path: "/", name: "Home" },
];

function Logo() {
  return (
    <Link to={'/'}><img src="/images/logo.png" /></Link>
  )
}

const Header = () => {
  return (
    <HeaderBlock>
      <Logo />
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

export default Header
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