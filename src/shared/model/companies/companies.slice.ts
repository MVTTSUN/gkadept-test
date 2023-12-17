import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CNT_COMPANIES, CNT_ITEMS_CHUNK, SliceName } from "../../const";
import { Company } from "../../types";
import { generateFakeCompanies } from "../../lib/utils";
import { faker } from "@faker-js/faker/locale/ru";

const initialState = {
  companies: generateFakeCompanies(CNT_ITEMS_CHUNK) as Company[],
  isAllCheckCompanies: false,
  isAllCheckEmployees: false,
  selectedCompany: null as Company | null,
  checkedIdCompanies: [] as string[],
  checkedIdEmployees: [] as string[],
};

export const companiesSlice = createSlice({
  name: SliceName.Companies,
  initialState,
  reducers: {
    generateCompanies(state) {
      if (state.companies.length >= CNT_COMPANIES) {
        return;
      }

      state.companies = state.companies.concat(
        generateFakeCompanies(CNT_ITEMS_CHUNK)
      );
    },
    setChangeCheckCompanies(state, action: PayloadAction<string>) {
      let isAllSelected = true;
      let selectedCompany = {} as Company;
      state.checkedIdCompanies = [];
      state.checkedIdEmployees = [];

      state.isAllCheckCompanies = false;
      state.companies.map((company) => {
        if (company.id === action.payload) {
          company.isChecked = !company.isChecked;
        }

        if (!company.isChecked) {
          isAllSelected = false;
        } else {
          state.checkedIdCompanies.push(company.id);
          selectedCompany = company;
        }
      });

      if (state.checkedIdCompanies.length === 1) {
        state.selectedCompany = selectedCompany;
      } else {
        state.selectedCompany = null;
      }
      state.isAllCheckCompanies = isAllSelected;
    },
    setAllCheckCompanies(state) {
      state.companies.map((company) => {
        company.isChecked = !state.isAllCheckCompanies;

        if (!state.isAllCheckCompanies) {
          state.checkedIdCompanies.push(company.id);
        } else {
          state.checkedIdCompanies = [];
          state.checkedIdEmployees = [];
        }
      });
      state.isAllCheckCompanies = !state.isAllCheckCompanies;

      state.selectedCompany = null;
    },
    addCompanies(state) {
      state.companies.unshift({
        id: faker.string.uuid(),
        isChecked: false,
        name: "",
        countEmployees: 0,
        address: "",
        employees: [],
      });
    },
    removeCompanies(state) {
      if (state.checkedIdCompanies.length === state.companies.length) {
        state.companies = [];
      } else {
        state.companies = state.companies.filter(
          (company) => !state.checkedIdCompanies.includes(company.id)
        );
      }
      state.isAllCheckCompanies = false;
      state.isAllCheckEmployees = false;
      state.selectedCompany = null;
      state.checkedIdCompanies = [];
      state.checkedIdEmployees = [];
    },
    setValueInputCompany(
      state,
      action: PayloadAction<{
        id: string;
        field: string;
        value: string;
      }>
    ) {
      state.companies.map((company) => {
        if (company.id === action.payload.id) {
          company[action.payload.field as "name" | "address"] =
            action.payload.value.trim();
        }
        return company;
      });
    },
    setChangeCheckEmployees(state, action: PayloadAction<string>) {
      if (!state.selectedCompany) {
        return;
      }

      let isAllSelected = true;
      state.checkedIdEmployees = [];

      state.isAllCheckEmployees = false;
      state.selectedCompany.employees.map((employee) => {
        if (employee.id === action.payload) {
          employee.isChecked = !employee.isChecked;
        }

        if (!employee.isChecked) {
          isAllSelected = false;
        } else {
          state.checkedIdEmployees.push(employee.id);
        }
      });

      state.isAllCheckEmployees = isAllSelected;
    },
    setAllCheckEmployees(state) {
      if (!state.selectedCompany) {
        return;
      }

      state.selectedCompany.employees.map((employee) => {
        employee.isChecked = !state.isAllCheckEmployees;

        if (!state.isAllCheckEmployees) {
          state.checkedIdEmployees.push(employee.id);
        } else {
          state.checkedIdEmployees = [];
        }
      });
      state.isAllCheckEmployees = !state.isAllCheckEmployees;
    },
    addEmployees(state) {
      state.companies.map((company) => {
        if (company.id === state.selectedCompany?.id) {
          company.employees.unshift({
            id: faker.string.uuid(),
            isChecked: false,
            surname: "",
            name: "",
            position: "",
          });
          company.countEmployees = company.employees.length;
          state.selectedCompany.countEmployees = company.employees.length;
          state.selectedCompany.employees = company.employees;
        }
        return company;
      });
    },
    removeEmployees(state) {
      state.companies.map((company) => {
        if (company.id === state.selectedCompany?.id) {
          if (state.checkedIdEmployees.length === company.employees.length) {
            company.employees = [];
          } else {
            company.employees = company.employees.filter(
              (employee) => !state.checkedIdEmployees.includes(employee.id)
            );
          }
          company.countEmployees = company.employees.length;
          state.selectedCompany.countEmployees = company.employees.length;
          state.selectedCompany.employees = company.employees;
        }
        return company;
      });
      state.isAllCheckEmployees = false;
      state.checkedIdEmployees = [];
    },
    setValueInputEmployee(
      state,
      action: PayloadAction<{
        id: string;
        field: string;
        value: string;
      }>
    ) {
      state.companies.map((company) => {
        if (company.id === state.selectedCompany?.id) {
          company.employees.map((employee) => {
            if (employee.id === action.payload.id) {
              employee[
                action.payload.field as "surname" | "name" | "position"
              ] = action.payload.value.trim();
            }
            return employee;
          });
          state.selectedCompany.employees = company.employees;
        }
        return company;
      });
    },
  },
});

export const {
  generateCompanies,
  setChangeCheckCompanies,
  setAllCheckCompanies,
  addCompanies,
  removeCompanies,
  setValueInputCompany,
  setChangeCheckEmployees,
  setAllCheckEmployees,
  addEmployees,
  removeEmployees,
  setValueInputEmployee,
} = companiesSlice.actions;

export default companiesSlice.reducer;
