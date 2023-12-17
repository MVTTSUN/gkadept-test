import { css } from "styled-components";

const ResetTable = css`
  border-collapse: collapse;
`;

const ResetTableData = css`
  padding: 0;
`;

const ResetButton = css`
  cursor: pointer;
  padding: 0;
  background-color: transparent;
  border: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

export { ResetTable, ResetTableData, ResetButton };
