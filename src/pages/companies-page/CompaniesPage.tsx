import styled from "styled-components";
import { Companies } from "../../widgets/companies/ui";
import { Employees } from "../../widgets/employees";
import { useAppSelector } from "../../shared/lib/hooks";
import { getSelectedCompany } from "../../shared/model/companies";

export function CompaniesPage() {
  const selectedCompany = useAppSelector(getSelectedCompany);

  return (
    <Container $selectedCompany={!!selectedCompany}>
      <Companies />
      {selectedCompany && <Employees />}
    </Container>
  );
}

const Container = styled.div<{ $selectedCompany: boolean }>`
  display: grid;
  grid-template-columns: 1fr ${({ $selectedCompany }) =>
      $selectedCompany && "1fr"};
`;
