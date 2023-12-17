import { COLUMNS_EMPLOYEE_TABLE } from "../../shared/const";
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks";
import {
  addEmployees,
  getIsAllCheckEmployees,
  getSelectedCompany,
  removeEmployees,
  setAllCheckEmployees,
  setChangeCheckEmployees,
  setValueInputEmployee,
} from "../../shared/model/companies";
import { Employee } from "../../shared/types";
import { Table } from "../../shared/ui/table";

export function Employees() {
  const selectedCompany = useAppSelector(getSelectedCompany);
  const isAllCheckEmployees = useAppSelector(getIsAllCheckEmployees);
  const dispatch = useAppDispatch();

  return (
    <Table<Employee>
      name="Сотрудники"
      columns={COLUMNS_EMPLOYEE_TABLE}
      rows={selectedCompany?.employees || []}
      isShowCheckbox
      onCheck={(id: string) => dispatch(setChangeCheckEmployees(id))}
      onCheckAll={() => dispatch(setAllCheckEmployees())}
      isAllCheck={isAllCheckEmployees}
      onRemove={() => dispatch(removeEmployees())}
      onAdd={() => dispatch(addEmployees())}
      inputCallback={(id: string, field: string, value: string) =>
        dispatch(setValueInputEmployee({ id, field, value }))
      }
    />
  );
}
