import styled from "styled-components";
import { ColumnsTable } from "../../types";
import { ResetTableData } from "../../lib/mixins";
import { Color } from "../../const";
import { TextArea } from "../textarea";
import { CheckBox } from "../checkbox";

type RowDataTableProps<T> = {
  columns: ColumnsTable[];
  row: T;
  isChecked?: boolean;
  isShowCheckbox?: boolean;
  onCheck?: (id: string) => void;
  offsetTop: number;
  index: number;
  inputCallback?: (id: string, field: string, value: string) => void;
};

export function RowDataTable<T extends { id: string }>(
  props: RowDataTableProps<T>
) {
  const { columns, row, isChecked, isShowCheckbox, onCheck, offsetTop, index, inputCallback } =
    props;

  return (
    <TableRow $offsetTop={offsetTop} $index={index} $isChecked={isChecked}>
      {isShowCheckbox && onCheck && (
        <TableData>
          <CheckBox onChange={() => onCheck(row.id)} checked={isChecked} />
        </TableData>
      )}
      {columns.map(({ field, isEditable }, index) => {
        if (isEditable && inputCallback) {
          return (
            <TableData key={index}>
              <TextArea
                value={String(row[field as keyof typeof row])}
                debounceCallback={(debouncedValueState) => inputCallback(row.id, field, debouncedValueState)}
              />
            </TableData>
          );
        } else {
          return (
            <TableData key={index}>
              {String(row[field as keyof typeof row])}
            </TableData>
          );
        }
      })}
    </TableRow>
  );
}

const TableRow = styled.tr<{
  $offsetTop: number;
  $index: number;
  $isChecked?: boolean;
}>`
  display: table;
  width: 100%;
  table-layout: fixed;
  height: 100px;
  position: absolute;
  top: 0;
  transform: translateY(${({ $offsetTop }) => $offsetTop}px);
  background-color: ${({ $index, $isChecked }) => {
    if ($isChecked) {
      return $index % 2 ? Color.BluePastelDark : Color.TurquoiseDark;
    } else {
      return $index % 2 ? Color.BluePastel : Color.Turquoise;
    }
  }};
  transition: background-color 0.3s ease;
`;

const TableData = styled.td`
  ${ResetTableData}
  text-align: center;
`;
