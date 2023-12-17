import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { Color } from "../../const";

type CheckBoxProps = InputHTMLAttributes<HTMLInputElement> & {
  isShowLabel?: boolean;
  textLabel?: string;
};

export function CheckBox(props: CheckBoxProps) {
  const { isShowLabel, textLabel, ...restProps } = props;

  return (
    <InputLabel $isShowLabel={isShowLabel}>
      <CheckBoxStyled {...restProps} type="checkbox" />
      <SpanFill />
      {isShowLabel && <SpanLabel>{textLabel}</SpanLabel>}
    </InputLabel>
  );
}

const CheckBoxStyled = styled.input`
  opacity: 0;
  width: 16px;
  height: 16px;
`;

const SpanFill = styled.span``;

const SpanLabel = styled.span`
  font-size: 16px;
  line-height: normal;
`;

const InputLabel = styled.label<{ $isShowLabel?: boolean }>`
  position: relative;
  cursor: pointer;
  display: flex;
  width: ${({ $isShowLabel }) => ($isShowLabel ? "auto" : "16px")};
  gap: 5px;
  margin: 0 auto;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 14px;
    height: 14px;
    border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 4px;
  }

  ${CheckBoxStyled} + ${SpanFill} {
    position: absolute;
    top: 2px;
    left: 2px;
    background-color: ${Color.Purple};
    width: 12px;
    height: 12px;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  ${CheckBoxStyled}:checked + ${SpanFill} {
    opacity: 1;
  }
`;
