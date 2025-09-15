import {
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  debounce,
} from 'lodash';
import useKeypress from 'react-use-keypress';

const usePaginatedSearchableData = ({
  fetchFunction = () => ({ collection: [], counts: {} }),
  rowsPerPage = 5,
  orderBy = 'timestampOfCreation',
  order = 'desc',
  filters = [],
  countActiveFilter = '',
  isAuthorizedFetching = true,
  page = 0,
  setPage = () => {},
  isMovingForward = false,
  isMovingBackward = false,
  setIsMovingForward = () => {},
  setIsMovingBackward = () => {},
} = {}) => {
  const [showingDocuments, setShowingDocuments] = useState([]);
  const [counts, setCounts] = useState({});
  const [hasSearched, setHasSearched] = useState(false);
  const [hasSearchInputFocus, setHasSearchInputFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearchedTerm, setLastSearchedTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const nbDocuments = counts[countActiveFilter];

  const fetchData = async ({
    isAuthorized: fetchIsAuthorized,
    order: fetchOrder,
    orderBy: fetchOrderBy,
    skip: fetchSkip = 0,
    limit: fetchLimit = rowsPerPage,
    search: fetchSearchTerm = '',
  }) => {
    try {
      const {
        collection,
        counts: fetchedCounts,
      } = await fetchFunction({
        isAuthorized: fetchIsAuthorized,
        order: fetchOrder,
        orderBy: fetchOrderBy,
        skip: +fetchSkip,
        limit: +fetchLimit,
        search: fetchSearchTerm,
        filters,
      });
      setShowingDocuments(
        (collection.length > fetchLimit)
          ? [...collection.slice(0, -1)]
          : [...collection],
      );
      setCounts(fetchedCounts);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  // eslint-disable-next-line
  const debouncedFetch = useCallback(
    debounce(fetchData, 1000),
    [JSON.stringify({ filters })],
  );

  useEffect(() => {
    if (isMovingBackward) {
      setIsLoading(true);
      const skip = page > 0
        ? page * rowsPerPage
        : undefined;
      debouncedFetch({
        isAuthorized: isAuthorizedFetching,
        order,
        orderBy,
        skip,
        limit: rowsPerPage,
        search: searchTerm,
      });
    } else if (isMovingForward) {
      setIsLoading(true);
      const skip = page >= 0
        ? page * rowsPerPage
        : undefined;
      debouncedFetch({
        isAuthorized: isAuthorizedFetching,
        order,
        orderBy,
        skip,
        limit: rowsPerPage,
        search: searchTerm,
      });
    }
    setIsMovingForward(false);
    setIsMovingBackward(false);
    // return () => debouncedFetch.cancel();
    // eslint-disable-next-line
  }, [
    isAuthorizedFetching,
    isMovingForward,
    isMovingBackward,
    debouncedFetch,
  ]);

  const reloadCurrentPageData = () => {
    setIsLoading(true);
    debouncedFetch({
      isAuthorized: isAuthorizedFetching,
      order,
      orderBy,
      limit: rowsPerPage,
      search: searchTerm,
      skip: page >= 0
        ? page * rowsPerPage
        : undefined,
    });
  }

  const reloadAllData = () => {
    setShowingDocuments([]);
    setPage(0);
    setIsLoading(true);
    debouncedFetch({
      isAuthorized: isAuthorizedFetching,
      order,
      orderBy,
      limit: rowsPerPage,
      search: searchTerm,
      skip: 0,
    });
  }

  useEffect(() => {
    if (!hasSearched) {
      reloadAllData();
    }
    // return () => debouncedFetch.cancel();
    // eslint-disable-next-line
  }, [
    hasSearched,
  ]);

  useEffect(() => {
    reloadAllData();
    // return () => debouncedFetch.cancel();
    // eslint-disable-next-line
  }, [
    order,
    orderBy,
    rowsPerPage,
  ]);

  useEffect(() => {
    reloadAllData();
  }, [JSON.stringify({ filters })]);

  useKeypress('Enter', () => {
    if (
      (searchTerm.length > 0)
      && (searchTerm !== lastSearchedTerm)
    ) {
      setIsLoading(true);
      setPage(0);
      debouncedFetch({
        isAuthorized: isAuthorizedFetching,
        order,
        orderBy,
        limit: rowsPerPage,
        skip: 0,
        search: searchTerm,
      });
      setLastSearchedTerm(searchTerm);
      setHasSearched(true);
    } else if (searchTerm.length === 0) {
      setHasSearched(false);
    }
  });


  useKeypress('Escape', () => {
    if (searchTerm.length > 0) {
      setPage(0);
      setSearchTerm('');
      setLastSearchedTerm('');
      setHasSearched(false);
      setShowingDocuments([]);
      reloadAllData();
    }
  });
  
  useEffect(() => {
    if (
      !hasSearchInputFocus
    ) {
      if (
        (searchTerm.length > 0)
        && (searchTerm !== lastSearchedTerm)
      ) {
        setIsLoading(true);
        setPage(0);
        debouncedFetch({
          isAuthorized: isAuthorizedFetching,
          order,
          orderBy,
          limit: rowsPerPage,
          skip: 0,
          search: searchTerm,
        });
        setLastSearchedTerm(searchTerm);
        setHasSearched(true);
      } else if (searchTerm.length === 0 && hasSearched) {
        setHasSearched(false);
        setLastSearchedTerm('');
        reloadAllData();
      }
    }
  }, [hasSearchInputFocus, searchTerm]);

  useEffect(() => {
    setHasSearched(false);
    setSearchTerm('');
    setLastSearchedTerm('');
    reloadAllData();
  }, [JSON.stringify(filters)]);

  return {
    isLoading,
    showingDocuments,
    searchTerm,
    setSearchTerm,
    hasSearchInputFocus,
    setHasSearchInputFocus,
    reloadCurrentPageData,
    reloadAllData,
    counts,
    nbDocuments,
    hasSearched,
  };
};

export default usePaginatedSearchableData;
