import styled from "styled-components";
import { ColumnsTable } from "../../types";
import { ResetTableData } from "../../lib/mixins";
import { Color } from "../../const";

type RowHeaderTable = {
  columns: ColumnsTable[];
  isShowCheckbox?: boolean;
};

export function RowHeaderTable(props: RowHeaderTable) {
  const { columns } = props;

  return (
    <TableRow>
      {props.isShowCheckbox && <TableHeading />}
      {columns.map(({ field, headerName }, index) => (
        <TableHeading key={`${field}-${index}`}>{headerName}</TableHeading>
      ))}
    </TableRow>
  );
}

const TableRow = styled.tr`
  background-color: ${Color.Blue};
  white-space: break-spaces;
`;

const TableHeading = styled.th`
  ${ResetTableData}
  padding: 10px;
  width: 20%;
`;
