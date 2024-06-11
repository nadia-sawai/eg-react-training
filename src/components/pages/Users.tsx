import { useEffect, useState } from "react"
import Button from "../ui/Button"
import { PageTitle } from "../ui/Title"
import styled from "styled-components"

// データのtype
type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

const Box = styled.div`
  margin-bottom: 40px;
`
const Users = () => {
  // 取得したデータの保存用State（初期値は空の配列）
  const [dataUsers, setDataUsers] = useState<User[]>([])
  
  // []の依存配列が空の場合は初回ロード時のみ実行
  // 補足： useEffectで第二引数を指定しない場合は毎回レンダリングが走る際に実行され、依存配列を指定すればそれをトリガーに実行される
  useEffect(() => {
    fetchData()
  },[])
  
  // apiからデータを取得
  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const result = await response.json()
    setDataUsers(result)
  }

  // clickでもapiからデータを取得
  const handleGetUsers = () => {
    fetchData()
  }

  //clickで表示されているユーザーをクリア
  const handleClearUsers = () => {
    setDataUsers([])
  }

  // idをapiエンドポイントに渡して個別のユーザーを取得する方法
  // 入力されたidを保存するStateを用意
  const [inputId, setInputId] = useState('')
  // 取得したデータの保存用State（初期値は空の配列）
  const [dataUser, setDataUser] = useState<User | null>(null)
  // マッチするidがない場合のエラーState
  const [errorBool, setErrorBool] = useState(false)
  // idを入力するinput用
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(e.target.value)
  }

  // submit用
  const handleSubmit = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${inputId}`)
    if(response.ok) {
      const result = await response.json()
      setDataUser(result)
      // errorのboolをfalseに
      setErrorBool(false)
    } else {
      setDataUser(null)
      // errorがあるのでboolをtrueに
      setErrorBool(true)
    }
  }

  return (
    <>
      <PageTitle title="User" />
      <Box>
        <Button onClick={handleGetUsers}>ユーザー取得</Button>
        <Button onClick={handleClearUsers}>ユーザー一覧削除</Button>
        {dataUsers && (
          <table>
            <tbody>
              {/* mapを使用して配列内要素を繰り返し出力する */}
              {dataUsers.map((item) => (
                // keyはどの要素が変更されたかを識別するために必須（ユニーク指定）
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Box>
      <Box>
        <h3>個別のユーザを取得</h3>
        {/* idを入力するinputを用意 */}
        <input type="text" onChange={handleChange} />
        <br />
        <br />
        <Button onClick={handleSubmit}>個別ユーザー取得</Button>
        {dataUser && (
          <table>
            <tbody>
              <tr>
                <th>{dataUser.id}</th>
                <td>{dataUser.name}</td>
              </tr>
            </tbody>
          </table>
        )}
        {/* エラーがある場合テキスト表示 */}
        {errorBool && <div>存在しない</div>}
      </Box>
    </>
  )
}

export default Users