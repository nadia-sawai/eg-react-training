import Button from "../ui/Button"
import { PageTitle } from "../ui/Title"

const Home = () => {
  const handleClick = () => {
    console.log("click")
  }

  return (
    <>
      <PageTitle title="Home" />
      <Button variant="primary" onClick={handleClick} className="hoge">Primary ボタン</Button>
      <Button variant="secondary" onClick={handleClick} className="hoge" disabled>Secondaryボタン(disabled)</Button>
    </>
  )
}

export default Home