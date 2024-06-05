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