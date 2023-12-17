import styled from "styled-components";
import { ResetButton } from "../../lib/mixins";
import { ButtonHTMLAttributes } from "react";
import { Color } from "../../const";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  const { children, ...restProps } = props;

  return <ButtonStyled {...restProps}>{children}</ButtonStyled>;
}

const ButtonStyled = styled.button`
  ${ResetButton}
  padding: 5px 10px;
  background-color: ${Color.Purple};
  font-size: 16px;
  line-height: normal;
  color: ${Color.White};
  border-radius: 10px;
`;
