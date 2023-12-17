import styled from "styled-components";
import { CompaniesPage } from "../pages/companies-page";
import { withStore } from "./providers/withStore";

function App() {
  return (
    <Main>
      <CompaniesPage />
    </Main>
  );
}

const Main = styled.main``;

const AppWithProviders = withStore(App);
export { AppWithProviders as App };
