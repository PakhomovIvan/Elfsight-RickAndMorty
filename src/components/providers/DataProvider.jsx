import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { getUniqueFilterValues } from '../../components/helpers/getUniqueFilterValues';

const API_URL = 'https://rickandmortyapi.com/api/character';

export function DataProvider({ children }) {
  const isFiltersLoaded = useRef(false);
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(() => {
    const url = new URL(API_URL);
    const params = new URLSearchParams(window.location.search);
    url.search = params.toString();

    return url.toString();
  });
  const [allFilters, setAllFilters] = useState({
    status: [],
    gender: [],
    species: [],
    name: [],
    type: []
  });

  useEffect(() => {
    setIsFetching(true);
    setIsError(false);
    axios
      .get(apiURL)
      .then(({ data }) => {
        setCharacters(data.results || []);
        setInfo(data.info || []);
      })
      .catch((e) => {
        setIsError(true);
        setCharacters([]);
        console.error('Error fetching data:', e);
      })
      .finally(() => setIsFetching(false));
  }, [apiURL]);

  useEffect(() => {
    if (!isFiltersLoaded.current && info.pages && !isError) {
      getUniqueFilterValues(info.pages)
        .then((dataCharactersAllFlat) => {
          setAllFilters(dataCharactersAllFlat);
          isFiltersLoaded.current = true;
        })
        .catch((e) => {
          console.error('Error fetching filter values:', e);
        });
    }
  }, [info.pages, isError]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      isFetching,
      allFilters,
      isError,
      info
    }),
    [activePage, apiURL, characters, isFetching, isError, info, allFilters]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
