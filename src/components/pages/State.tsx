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
  const [count, setCount] = useState(0)
  const [bool, setBool] = useState(false)

  const increment = () => {
    setCount(prev => prev + 1)
  }
  const decrement = () => {
    setCount(prev => prev - 1)
    // setCount(prev => prev > 0 ? prev -1 : prev)
  }

  const changeBool = () => {
    setBool(prev => !prev)
  }

  return (
    <>
      <PageTitle title="State" />
      <ButtonWrap>
        <Button onClick={increment}>クリックで増加</Button>
        <Button variant="secondary" onClick={decrement}>クリックで減少</Button>
      </ButtonWrap>
      <div>カウント：{count}</div>
      {/* ステートによるコンテンツの出し分け */}
      <Button onClick={changeBool}>クリック</Button>
      {bool ? <div>boolはtrue</div> : <div>boolはfalse</div>}
    </>
  )
}

export default State