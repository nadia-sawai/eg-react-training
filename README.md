# props

- [ ] propsの受け渡しをコンポーネントを作成しながら学ぶ
- [ ] 受け取ったpropによる条件分岐を学ぶ

## 属性を指定して値を渡す場合
### Step1
- ページタイトルを表示する共通コンポーネントを作成
- indexに集約してエクスポートする方法で実装  

```src/components/ui/Title``` に ```PageTitle.tsx``` を作成  
```
// 属性としてpropsを受け取る
import styled from "styled-components";

type PageTitleProps = {
  title: string
}

const PageTitleBlock = styled.h1`
  font-size: 2.6rem;
  border-bottom: 1px solid #000;
  margin-bottom: 40px;
`;

const PageTitle = (props:PageTitleProps) => {
  const { title } = props

  return (
    <PageTitleBlock>{title}</PageTitleBlock>
  )
}

export default PageTitle
```
```src/components/ui/Title``` に ```index.tsx``` を作成  
```
export {default as PageTitle} from './PageTitle';
```


### Step2
- 使用例（Home.tsx）
```
import { PageTitle } from "../ui/Title"

const Home = () => {
  return (
    <PageTitle title="Home" />
  )
}

export default Home
```

## childrenとして値を渡す場合
### Step1
- ボタンを表示する共通コンポーネントを作成
```src/components/ui/Button/index.tsx``` を作成  
children内にレンダリングされる
```
import styled from "styled-components";

// ? をつけることによってはプロパティが任意になる（なくても怒られない）
type ButtonProps = {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const ButtonElement = styled.button`
  font-size: 1.6rem;
  margin: 0 auto;
  padding: 10px;
  line-height: 1;
  border-radius: 10px;
  // propsのvariantにより条件分岐
  &[data-variant='primary'] {
    background-color: #00f;
  }
  &[data-variant='secondary'] {
    background-color: #f00;
  }
  color: #fff;
  max-width: 250px;
  width: 100%;
`;

const Button = (props:ButtonProps) => {
  // propsで受け取った値を分割代入 disabled=false など、初期値も指定できる
  const { variant = "primary", children, onClick, className, disabled = false } = props
  return (
    <ButtonElement
      data-variant={variant}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </ButtonElement>
  )
}

export default Button
```
### Step2
- 使用例（Home.tsx）
```
import Button from "../ui/Button" // インポート
import { PageTitle } from "../ui/Title"

const Home = () => {
  const handleClick = () => {
    console.log("click")
  }

  return (
    <>
      <PageTitle title="Home" />
      // コンポーネント内の要素（今回はボタンというテキスト）がchildrenに出力される
      // ボタンコンポーネント（Button/index.tsx）側でvariantのテキストを受取り、primaryかsecondaryのスタイルを割り当てる
      <Button variant="primary" onClick={handleClick} className="hoge">Primary ボタン</Button>
      <Button variant="secondary" onClick={handleClick} className="hoge" disabled>Secondaryボタン(disabled)</Button>
    </>
  )
}

export default Home
```