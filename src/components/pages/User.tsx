import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PageTitle } from "../ui/Title"

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

const User = () => {
  // urlからidを取得（useParams().id のidは、ルーティングで設定した:idと命名を同じにすること）
  const id = useParams().id
  // 取得したデータ保存用
  const [dataUser, setDataUser] = useState<User | null>(null)
  // エラー用
  const [errorMessage, setErrorMessage] = useState('')
  // ローディング用
  const [loadingBool, setLoadingBool] = useState(false)
  
  useEffect(() => {
    const getUser = async () => {
      // ローディングを表示
      setLoadingBool(true)

      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        setDataUser(response.data)
      } catch(e) {
        // エラー(e)がaxiosのものか判断
        if (axios.isAxiosError(e)) {
          // axiosエラーのmessageをエラーにセットする
          setErrorMessage(e.message)
        }
      } finally {
        // ローディングを非表示
        setLoadingBool(false)
      }
    }
    getUser()
  },[id])

  function Loading() {
    return <div>読込中</div>
  }

  return (
    <>
      <PageTitle title="User詳細" />
      {/* ローディング */}
      {loadingBool ? 
        <Loading />
        : (
          <>
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
          </>
      )}

      {/* apiからのエラーテキスト表示 */}
      {errorMessage && <div>{errorMessage}</div>}
    </>
  )
}

export default User