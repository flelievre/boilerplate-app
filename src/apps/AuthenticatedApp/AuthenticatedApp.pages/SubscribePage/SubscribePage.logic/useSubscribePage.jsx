import {
  useEffect,
  useContext,
  useState,
} from 'react';
import {
  orderBy,
  find,
} from 'lodash';
import {
  useOutletContext,
  useParams,
} from 'react-router';
import {
  AppContext,
  useBoolean,
  useDocSocket,
} from '@/utils';
import {
  axios,
  VITE_BACKEND_URL,
} from '@/config';
import {
  patchSubscriptionFunnel,
} from '../SubscribePage.functions';

const useSubscribePage = () => {
  const {
    t,
  } = useContext(AppContext);

  const {
    currentOrganization: {
      _id: organizationId = '',
    } = {},
  } = useOutletContext();

  const [
    products,
    setProducts,
  ] = useState([]);

  const [
    isInitiating,
    setIsInitiating,
  ] = useState(true);

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const {
    subscriptionFunnelId = '',
  } = useParams();

  const {
    doc,
    isLoading: isInitializingListener,
  } = useDocSocket({
    docType: 'subscriptionFunnel',
    docId: subscriptionFunnelId,
    isAuthorized: true,
  });

  const {
    value: isShowingMonthlyPrice,
    toggleValue: toggleYearlyOrMonthlyPrice,
  } = useBoolean();

  useEffect(() => {
    const getProducts = async () => {
      setIsInitiating(true);
      try {
        const {
          data: {
            data: {
              products: fetchedProducts,
            } = {},
          } = {},
        } = await axios.get(`${VITE_BACKEND_URL}/products`);
        setProducts(fetchedProducts);
      } catch (e) {
        console.error(e);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (
      (products.length > 0)
      && !isInitializingListener
    ) {
      setIsInitiating(false);
    }
  }, [products, isInitializingListener]);

  const productsWithMonthlyOrYearlyPrice = orderBy(
    products.map(({
      prices = [],
      description = null,
      ...productOtherProps
    }) => ({
      price: find(
        prices.map(({
          unitAmount,
          ...priceOtherProps
        }) => ({
          unitAmount: isShowingMonthlyPrice
            ? unitAmount
            : +`${(unitAmount / 12).toFixed(0)}`,
          originalAmount: unitAmount,
          ...priceOtherProps,
        })),
        {
          interval: isShowingMonthlyPrice
            ? 'month'
            : 'year',
        },
      ),
      description: description
        ? description.split('\\n')
        : [],
      ...productOtherProps,
    })),
    'price.unitAmount',
  );

  const {
    _id = '',
    interval = '',
    planName = '',
    step = '',
    stripePriceId = '',
  } = doc || {};

  const selectPlan = (stripePriceId) => {
    return updateSubscriptionFunnel({
      stripePriceId,
    })
  };

  const updateSubscriptionFunnel = async ({
    stripePriceId = '',
    step = '',
  }) => {
    try {
      setIsLoading(true);
      await patchSubscriptionFunnel({
        organizationId,
        subscriptionFunnelId: _id,
        payload: {
          stripePriceId,
          step,
        },
      });
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  return {
    productsWithMonthlyOrYearlyPrice,
    isInitiating,
    step,
    toggleYearlyOrMonthlyPrice,
    isShowingMonthlyPrice,
    selectPlan,
    updateSubscriptionFunnel,
    stripePriceId,
    interval,
    isLoading,
    subscriptionFunnelId,
    planName,
  };
};

export default useSubscribePage;
