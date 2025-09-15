import {
  useEffect,
} from 'react';
import {
  useParams,
  useNavigate,
} from 'react-router';
import useUri from './useUri.jsx';

const useTabs = ({
  tabInfos = [],
  nbParams = -1,
  activeTabKey = 'activeTab',
} = {}) => {
  const navigate = useNavigate();

  const params = useParams();

  const activeTab = params[activeTabKey];

  const {
    fullUri,
    uriBasePath,
    lastUriElement,
  } = useUri({
    nbParams,
  });

  const nbParamsToRemove = nbParams === -1
    ? (fullUri.split('/').length - 1)
    : nbParams;

  const isPathMatchingATab = tabInfos
    .map(({ routeTo }) => routeTo)
    .includes(lastUriElement);

  const tabsUriBaseRoute = isPathMatchingATab
    ? uriBasePath
    : fullUri.split('/').slice(0, nbParamsToRemove).join('/');

  const foundActiveTabIndex = tabInfos.findIndex((tabInfo) => (
    (tabInfo.key === activeTab)
  ));

  const activeTabIndex = (foundActiveTabIndex === -1)
    ? 0
    : foundActiveTabIndex;

  useEffect(() => {
    if (
      !isPathMatchingATab
      && (activeTabIndex === 0)
      && (tabInfos.length > 0)
      && (tabInfos[0]?.routeTo)
    ) {
      navigate(
        `${tabsUriBaseRoute}/${tabInfos[0].routeTo}`,
        {
          replace: true,
        },
      );
    }
    // eslint-disable-next-line
  }, [isPathMatchingATab, activeTabIndex]);

  const getActiveIndexFromKey = (key = 'information') => (
    tabInfos.findIndex(({ key: tabKey }) => (
      tabKey === key
    ))
  );

  return {
    tabsUriBaseRoute,
    activeTabIndex,
    tabsActiveKey: tabInfos[activeTabIndex].key,
    getActiveIndexFromKey,
  };
};

export default useTabs;
