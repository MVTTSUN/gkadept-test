import { faker } from "@faker-js/faker/locale/ru";
import { Company } from "../../types";
import { CNT_EMPLOYEES_MAX, CNT_EMPLOYEES_MIN } from "../../const";

const generateFakeCompanies = (itemsChunk: number): Company[] =>
  new Array(itemsChunk).fill(null).map(() => {
    const countEmployees = faker.number.int({
      min: CNT_EMPLOYEES_MIN,
      max: CNT_EMPLOYEES_MAX,
    });

    return {
      id: faker.string.uuid(),
      isChecked: false,
      name: faker.company.name(),
      countEmployees,
      address: faker.location.streetAddress(),
      employees: new Array(countEmployees).fill(null).map(() => ({
        id: faker.string.uuid(),
        isChecked: false,
        surname: faker.person.lastName(),
        name: faker.person.firstName(),
        position: faker.person.jobTitle(),
      })),
    };
  });

export { generateFakeCompanies };
