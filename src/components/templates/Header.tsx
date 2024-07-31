import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LoginContext } from "../../context/LoginContext";

// styleを指定したコンポーネントととして利用できる
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

const LoginState = styled.div`
  color: #fff;
  margin-left: 20px;
`

const pagesPath = [
  { id: 1, path: "/", name: "Home" },
  { id: 2, path: "/users", name: "ユーザー一覧" },
  { id: 3, path: "/state", name: "State" },
];

function Logo() {
  return (
    <Link to={'/'}><img src="/images/logo.png" /></Link>
  )
}

const Header = () => {
  const {isLogin} = useContext(LoginContext)

  return (
    <HeaderBlock>
      <Logo />
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

export default Header






