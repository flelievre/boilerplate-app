import {
  useLocation,
} from 'react-router';

const useUri = ({
  nbParams = -1,
} = {}) => {
  const {
    pathname: fullUri,
  } = useLocation();

  const splittedUri = fullUri.split('/');

  const lastUriElement = (splittedUri.length > 0)
    ? splittedUri[splittedUri.length - 1]
    : '';

  const beforeLastUriElement = (splittedUri.length > 1)
    ? splittedUri[splittedUri.length - 2]
    : '';

  const uriBasePath = fullUri.split('/').slice(0, nbParams).join('/');

  return {
    fullUri,
    uriBasePath,
    lastUriElement,
    beforeLastUriElement,
  };
};

export default useUri;
