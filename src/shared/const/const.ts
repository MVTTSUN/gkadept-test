enum SliceName {
  Companies = "companies",
}

enum Color {
  Turquoise = "#c5fff8",
  BluePastel = "#96efff",
  TurquoiseDark = "#9dd0ca",
  BluePastelDark = "#82d0de",
  Blue = "#5fbdff",
  Purple = "#7b66ff",
  White = "#ffffff",
}

const ROW_DATA_TABLE_HEIGHT = 100;

const CNT_COMPANIES = 10000;
const CNT_ITEMS_CHUNK = 50;

const CNT_EMPLOYEES_MIN = 10;
const CNT_EMPLOYEES_MAX = 100;

const COLUMNS_COMPANY_TABLE = [
  { field: "name", headerName: "Название компании", isEditable: true },
  {
    field: "countEmployees",
    headerName: "Кол-во\nсотрудников",
    isEditable: false,
  },
  { field: "address", headerName: "Адрес", isEditable: true },
];

const COLUMNS_EMPLOYEE_TABLE = [
  { field: "surname", headerName: "Фамилия", isEditable: true },
  { field: "name", headerName: "Имя", isEditable: true },
  { field: "position", headerName: "Должность", isEditable: true },
];

export {
  SliceName,
  Color,
  ROW_DATA_TABLE_HEIGHT,
  CNT_COMPANIES,
  CNT_ITEMS_CHUNK,
  CNT_EMPLOYEES_MIN,
  CNT_EMPLOYEES_MAX,
  COLUMNS_COMPANY_TABLE,
  COLUMNS_EMPLOYEE_TABLE,
};
