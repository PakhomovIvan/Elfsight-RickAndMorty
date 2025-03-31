import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import { axiosInterceptors } from './Api/axios/AxiosInterceptors';
import { AppState, Header, ItemsGrid, Pagination, useData } from './components';

function App() {
  const { isFetching, isError } = useData();
  axiosInterceptors();

  return (
    <Router>
      <Main>
        <Header />
        <AppState />

        {!isFetching && !isError && (
          <>
            <ItemsGrid />
            <Pagination />
          </>
        )}
      </Main>
    </Router>
  );
}

export { App };

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 0;
  max-width: 80%;
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 95%;
  }

  @media (max-width: 930px) {
    max-width: 85%;
  }

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;
