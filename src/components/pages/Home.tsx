import { useContext } from "react"
import Button from "../ui/Button"
import { PageTitle } from "../ui/Title"
import { LoginContext } from "../../context/LoginContext"

const Home = () => {
  // 初期はログインしていないためfalse
  // const [isLogin, setIsLogin] = useState(false)
  const {isLogin, toggleLogin} = useContext(LoginContext);
  const handleClick = () => {
    console.log("click")
  }

  const handleLogin = () => {
    toggleLogin()
  }

  return (
    <>
      <PageTitle title="Home" />
      <Button variant="primary" onClick={handleClick} className="hoge">Primary ボタン</Button>
      <Button variant="secondary" onClick={handleClick} className="hoge" disabled>Secondaryボタン(disabled)</Button>

      <h2>ログイン/ログアウトボタン</h2>
      {isLogin ? <Button variant="secondary" onClick={handleLogin} className="hoge">ログアウト</Button> : <Button variant="primary" onClick={handleLogin} className="hoge">ログイン</Button>}
      {isLogin ? <div>ログイン中</div> : <div>ログアウト中</div>}
    </>
  )
}

export default Home