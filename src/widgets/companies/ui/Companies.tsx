import { COLUMNS_COMPANY_TABLE } from "../../../shared/const";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import {
  addCompanies,
  generateCompanies,
  getCompanies,
  getIsAllCheckCompanies,
  removeCompanies,
  setAllCheckCompanies,
  setChangeCheckCompanies,
  setValueInputCompany,
} from "../../../shared/model/companies";
import { Company } from "../../../shared/types";
import { Table } from "../../../shared/ui/table";

export function Companies() {
  const companies = useAppSelector(getCompanies);
  const isAllCheckCompanies = useAppSelector(getIsAllCheckCompanies);
  const dispatch = useAppDispatch();

  return (
    <Table<Company>
      name="Компании"
      columns={COLUMNS_COMPANY_TABLE}
      rows={companies}
      isShowCheckbox
      onCheck={(id: string) => dispatch(setChangeCheckCompanies(id))}
      onCheckAll={() => dispatch(setAllCheckCompanies())}
      isAllCheck={isAllCheckCompanies}
      onRemove={() => dispatch(removeCompanies())}
      onAdd={() => dispatch(addCompanies())}
      inputCallback={(id: string, field: string, value: string) =>
        dispatch(setValueInputCompany({ id, field, value }))
      }
      fetchingCallback={() => dispatch(generateCompanies())}
    />
  );
}
