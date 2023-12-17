import { Company } from "../../../../shared/types";

const getDataCompanyTableAdapter = (company: Company) => [
  {
    isEditable: true,
    text: company.name,
  },
  {
    isEditable: false,
    text: company.countEmployees.toString(),
  },
  {
    isEditable: true,
    text: company.address,
  },
];

export { getDataCompanyTableAdapter };
