import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getUniqueFilterValues } from '../../components/helpers/getUniqueFilterValues';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);
  const [filters, setFilters] = useState({
    status: [],
    gender: [],
    species: [],
    name: [],
    type: []
  });

  useEffect(() => {
    setIsFetching(true);
    axios
      .get(apiURL)
      .then(({ data }) => {
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((e) => {
        setIsError(true);
        console.error(e);
      })
      .finally(() => setIsFetching(false));
  }, [apiURL]);

  useEffect(() => {
    if (info.pages) {
      getUniqueFilterValues(info.pages).then((dataCharactersAllFlat) =>
        setFilters(dataCharactersAllFlat)
      );
    }
  }, [info.pages]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      isFetching,
      filters,
      isError,
      info
    }),
    [activePage, apiURL, characters, isFetching, isError, info, filters]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
