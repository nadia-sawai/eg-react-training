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