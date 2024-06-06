import styled from "styled-components";

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