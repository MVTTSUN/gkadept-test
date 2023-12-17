import styled from "styled-components";
import { RowHeaderTable } from "../row-header-table";
import { RowDataTable } from "../row-data-table";
import { ColumnsTable } from "../../types";
import { ResetTable } from "../../lib/mixins";
import { useCallback, useRef } from "react";
import { CheckBox } from "../checkbox";
import { Button } from "../button";
import { useFetchingScroll, useVirtualizeList } from "../../lib/hooks";

type TableProps<T> = {
  name: string;
  columns: ColumnsTable[];
  rows: T[];
  isShowCheckbox?: boolean;
  onCheck?: (id: string) => void;
  onCheckAll?: () => void;
  isAllCheck?: boolean;
  onRemove?: () => void;
  onAdd?: () => void;
  inputCallback?: (id: string, field: string, value: string) => void;
  fetchingCallback?: () => void;
};

export function Table<T extends { id: string; isChecked: boolean }>(
  props: TableProps<T>
) {
  const {
    name,
    columns,
    rows,
    isShowCheckbox,
    onCheckAll,
    isAllCheck,
    onRemove,
    onAdd,
    fetchingCallback,
    ...restProps
  } = props;
  const scrollElementRef = useRef<HTMLTableSectionElement | null>(null);
  const { virtualItems } = useVirtualizeList({
    itemHeight: 100,
    listHeight: 900,
    itemsCount: rows.length,
    getScrollElement: useCallback(() => scrollElementRef.current, []),
  });
  useFetchingScroll({
    fetchingCallback,
    getScrollElement: useCallback(() => scrollElementRef.current, []),
  });

  return (
    <Container cellSpacing={0} cellPadding={0}>
      <Caption>
        {name}
        <ToolBox>
          {onCheckAll && (
            <div>
              <CheckBox
                onChange={onCheckAll}
                isShowLabel
                textLabel="Выбрать всё"
                checked={isAllCheck}
              />
            </div>
          )}
          {onRemove && (
            <Button type="button" onClick={onRemove}>
              Удалить
            </Button>
          )}
          {onAdd && (
            <Button
              type="button"
              onClick={() => {
                scrollElementRef.current?.scrollTo(0, 0);
                onAdd();
              }}
            >
              Добавить
            </Button>
          )}
        </ToolBox>
      </Caption>
      <Header>
        <RowHeaderTable columns={columns} isShowCheckbox={isShowCheckbox} />
      </Header>
      <Body ref={scrollElementRef}>
        <tr>
          <td>
            <BodyTable
              cellSpacing={0}
              cellPadding={0}
              $height={rows.length * 100}
            >
              <tbody>
                {virtualItems.map((virtualItem) => {
                  const row = rows[virtualItem.index];

                  return (
                    <RowDataTable<T>
                      {...restProps}
                      key={row.id}
                      columns={columns}
                      row={row}
                      isChecked={row.isChecked}
                      isShowCheckbox={isShowCheckbox}
                      offsetTop={virtualItem.offsetTop}
                      index={virtualItem.index}
                    />
                  );
                })}
              </tbody>
            </BodyTable>
          </td>
        </tr>
      </Body>
    </Container>
  );
}

const Container = styled.table`
  ${ResetTable}
  width: 100%;
`;

const Caption = styled.caption`
  padding: 10px;
  font-size: 24px;
  line-height: normal;
`;

const ToolBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Header = styled.thead`
  display: table;
  width: 100%;
  table-layout: fixed;
`;

const BodyTable = styled.table<{ $height: number }>`
  ${ResetTable}
  height: ${({ $height }) => $height}px;
`;

const Body = styled.tbody`
  position: relative;
  display: block;
  height: 900px;
  overflow: auto;
  z-index: 0;
`;
