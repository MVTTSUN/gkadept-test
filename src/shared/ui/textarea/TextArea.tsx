import styled from "styled-components";
import { TextareaHTMLAttributes, useEffect, useRef, useState } from "react";
import { useDebounce } from "../../lib/hooks";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  debounceCallback: (value: string) => void;
};

export function TextArea(props: TextAreaProps) {
  const { value, debounceCallback, ...restProps } = props;
  const [valueState, setValueState] = useState<string>(value as string);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const isSameStateAndDebounce = useRef<boolean>(true);
  const debouncedValueState = useDebounce({
    dependentValue: valueState,
    delay: 1000,
  });

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight - 16 + "px";
    }

    isSameStateAndDebounce.current = debouncedValueState === valueState;
  }, [valueState]);

  useEffect(() => {
    if (!isSameStateAndDebounce.current) {
      debounceCallback(debouncedValueState);
    }
  }, [debouncedValueState]);

  return (
    <TextAreaStyled
      maxLength={35}
      ref={textAreaRef}
      rows={1}
      {...restProps}
      value={valueState}
      onChange={(e) => setValueState(e.target.value)}
    />
  );
}

const TextAreaStyled = styled.textarea`
  overflow: hidden;
  padding: 8px;
  background-color: transparent;
  resize: none;
  border: none;
`;
