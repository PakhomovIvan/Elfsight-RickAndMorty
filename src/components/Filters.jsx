import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useData } from './providers';

export const Filters = () => {
  const { allFilters, setApiURL, setActivePage } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDataFiltersLoading, setIsDataFiltersLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: searchParams.get('status') || '',
    gender: searchParams.get('gender') || '',
    species: searchParams.get('species') || '',
    name: searchParams.get('name') || '',
    type: searchParams.get('type') || ''
  });
  const [selectOpen, setSelectOpen] = useState({
    status: false,
    gender: false,
    species: false
  });
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (
      allFilters.gender.length ||
      allFilters.status.length ||
      allFilters.species.length
    ) {
      setIsDataFiltersLoading(false);
    }
  }, [allFilters]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value
    }));
  };

  const handleClearFilter = (key) => {
    handleFilterChange(key, '');
  };

  const toggleSelect = (key) => {
    setSelectOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const handleApply = useCallback(() => {
    const params = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params[key] = value;
    });

    setSearchParams(params, { replace: true });

    setApiURL((prevURL) => {
      const url = new URL(prevURL);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });
      url.search = params.toString();

      return url.toString();
    });

    setActivePage(0);
  }, [filters, setSearchParams, setApiURL, setActivePage]);

  useEffect(() => {
    if (isFirstRender.current && searchParams.toString()) {
      handleApply();
      isFirstRender.current = false;
    }
  }, [searchParams, handleApply]);

  const handleReset = () => {
    setFilters({
      status: '',
      gender: '',
      species: '',
      name: '',
      type: ''
    });
    setSearchParams({}, { replace: true });
    setApiURL((prevURL) => {
      const url = new URL(prevURL);
      url.search = '';

      return url.toString();
    });
    setActivePage(0);
  };

  return (
    <Container>
      <StyledSelect>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          disabled={isDataFiltersLoading}
          onClick={() => toggleSelect('status')}
          onBlur={() =>
            setSelectOpen((prevState) => ({ ...prevState, status: false }))
          }
        >
          <option value="" disabled hidden>
            Status
          </option>
          {allFilters.status.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ArrowIcon isOpen={selectOpen.status} />
        {filters.status && (
          <ClearButton onClick={() => handleClearFilter('status')}>
            &times;
          </ClearButton>
        )}
      </StyledSelect>
      <StyledSelect>
        <select
          value={filters.gender}
          onChange={(e) => handleFilterChange('gender', e.target.value)}
          disabled={isDataFiltersLoading}
          onClick={() => toggleSelect('gender')}
          onBlur={() =>
            setSelectOpen((prevState) => ({ ...prevState, gender: false }))
          }
        >
          <option value="" disabled hidden>
            Gender
          </option>
          {allFilters.gender.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ArrowIcon isOpen={selectOpen.gender} />
        {filters.gender && (
          <ClearButton onClick={() => handleClearFilter('gender')}>
            &times;
          </ClearButton>
        )}
      </StyledSelect>
      <StyledSelect>
        <select
          value={filters.species}
          onChange={(e) => handleFilterChange('species', e.target.value)}
          disabled={isDataFiltersLoading}
          onClick={() => toggleSelect('species')}
          onBlur={() =>
            setSelectOpen((prevState) => ({ ...prevState, species: false }))
          }
        >
          <option value="" disabled hidden>
            Species
          </option>
          {allFilters.species.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ArrowIcon isOpen={selectOpen.species} />
        {filters.species && (
          <ClearButton onClick={() => handleClearFilter('species')}>
            &times;
          </ClearButton>
        )}
      </StyledSelect>
      <StyledSelect>
        <input
          name="name"
          id="search-name"
          placeholder="Name"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
        {filters.name && (
          <ClearButton onClick={() => handleClearFilter('name')}>
            &times;
          </ClearButton>
        )}
      </StyledSelect>
      <StyledSelect>
        <input
          name="type"
          id="search-type"
          placeholder="Type"
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        />
        {filters.type && (
          <ClearButton onClick={() => handleClearFilter('type')}>
            &times;
          </ClearButton>
        )}
      </StyledSelect>
      <StyledSelect>
        <button onClick={handleApply} disabled={isDataFiltersLoading}>
          Apply
        </button>
        <button onClick={handleReset}>Reset</button>
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
    align-self: center;
  }
`;

const StyledSelect = styled.div`
  width: 100%;
  position: relative;

  & select,
  input {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid #83bf46;
    border-radius: 8px;
    background: #263750;
    color: #b3b3b3;
    text-align: left;
    padding: 10px;
    appearance: none;
  }

  & select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

      @media (max-width: 500px) {
        margin-left: 0;
      }

      &:hover {
        background-color: #ff5152;
        color: #f5f5f5;
      }
    }

    @media (max-width: 1100px) {
      width: 70px;
    }

    @media (max-width: 500px) {
      width: 100%;
      margin-top: 10px;
    }
  }

  &:last-child {
    @media (max-width: 500px) {
      display: flex;
      margin: 0;
      flex-direction: column;
      gap: 10px;
    }
  }
`;

const ClearButton = styled.span`
  position: absolute;
  right: 9px;
  top: 50%;
  transform: translateY(-50%);
  color: #f5f5f5;
  background: #263750;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  margin: 0;
  outline: none;
  z-index: 2;

  &:hover {
    color: #83bf46;
  }
`;

const ArrowIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: ${(props) => (props.isOpen ? '0px' : '5px')} solid #fff;
  border-bottom: ${(props) => (props.isOpen ? '5px' : '0px')} solid #fff;
  pointer-events: none;
`;
