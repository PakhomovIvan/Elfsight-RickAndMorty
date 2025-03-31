import { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { useData } from './providers';

export const Filters = () => {
  const { filters } = useData();
  const [isDataFiltersLoading, setIsDataFiltersLoading] = useState(true);

  useEffect(() => {
    if (
      filters.gender.length ||
      filters.status.length ||
      filters.species.length
    )
      setIsDataFiltersLoading(false);
  }, [filters]);

  return (
    <Container>
      <StyledSelect>
        <Select
          options={filters.status}
          isLoading={isDataFiltersLoading}
          placeholder="Status"
          onChange={(e) => console.log(e.value)}
          maxMenuHeight={180}
        />
      </StyledSelect>
      <StyledSelect>
        <Select
          options={filters.gender}
          placeholder="Gender"
          isLoading={isDataFiltersLoading}
          maxMenuHeight={180}
        />
      </StyledSelect>
      <StyledSelect>
        <Select
          options={filters.species}
          placeholder="Species"
          isLoading={isDataFiltersLoading}
          maxMenuHeight={180}
        />
      </StyledSelect>
      <StyledSelect>
        <input
          type="search"
          name="name"
          id="search-name"
          placeholder="Name"
          onChange={(e) => console.log('Name: ', e.target.value)}
        />
      </StyledSelect>
      <StyledSelect>
        <input
          type="search"
          name="type"
          id="search-type"
          placeholder="Type"
          onChange={(e) => console.log('Type: ', e.target.value)}
        />
      </StyledSelect>
      <StyledSelect>
        <button onClick={() => console.log('Apply')}>Apply</button>
        <button onClick={() => console.log('Reset')}>Reset</button>
      </StyledSelect>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 180px 180px 180px;
  grid-gap: 10px;

  & span {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
  }

  @media (max-width: 1100px) {
    grid-template-columns: 150px 150px 150px;
  }

  @media (max-width: 500px) {
    grid-template-columns: 240px;
    gap: 15px;
  }
`;

const StyledSelect = styled.div`
  // max-width: 180px;

  & select,
  input {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid rgb(131, 191, 70);
    border-radius: 8px;
    background: rgb(38, 55, 80);
    color: rgb(179, 179, 179);
    text-align: left;
    padding: 10px;
  }

  & button {
    width: 85px;
    height: 40px;
    border: 1px solid #83bf46;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0);
    color: #83bf46;
    font-family: Inter;
    font-size: 16px;

    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #83bf46;
      color: #f5f5f5;
    }

    &:last-child {
      margin-left: 10px;
      border-color: #ff5152;
      color: #ff5152;

      &:hover {
        background-color: #ff5152;
        color: #f5f5f5;
      }
    }

    @media (max-width: 1100px) {
      width: 70px;
    }
  }
`;
