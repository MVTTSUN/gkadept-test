import { SliceName } from "../../const";

const getCompanies = (state: Pick<RootState, SliceName.Companies>) =>
  state[SliceName.Companies].companies;
const getIsAllCheckCompanies = (state: Pick<RootState, SliceName.Companies>) =>
  state[SliceName.Companies].isAllCheckCompanies;
const getIsAllCheckEmployees = (state: Pick<RootState, SliceName.Companies>) =>
  state[SliceName.Companies].isAllCheckEmployees;
const getSelectedCompany = (state: Pick<RootState, SliceName.Companies>) =>
  state[SliceName.Companies].selectedCompany;

export {
  getCompanies,
  getIsAllCheckCompanies,
  getIsAllCheckEmployees,
  getSelectedCompany,
};
