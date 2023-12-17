type Company = {
  id: string;
  isChecked: boolean;
  name: string;
  countEmployees: number;
  address: string;
  employees: Employee[];
};

type Employee = {
  id: string;
  isChecked: boolean;
  surname: string;
  name: string;
  position: string;
};

type ColumnsTable = {
  field: string;
  headerName: string;
  isEditable: boolean;
};

export type { Company, Employee, ColumnsTable };
