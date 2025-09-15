import {
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import {
  useOutletContext,
} from 'react-router';
import {
  AppContext,
  snakeCaseToUpperText,
  displayTaxExempt,
  displayPrice,
} from '@/utils';
import {
  VITE_BACKEND_URL,
  axios,
} from '@/config';
import {
  CURRENCIES,
} from '@/constants';

const usePaymentForm = ({
  isShowingMonthlyPrice = false,
  planName = '',
  subscriptionFunnelId = '',
  updateSubscriptionFunnel = () => {},
}) => {
  const {
    currentOrganization: {
      taxExempt = '',
      taxPercentage = 0,
      taxCode = '',
      taxNumber = '',
      countryCode = '',
    } = {},
  } = useOutletContext();
  const {
    t,
    lang,
    isThemeDark,
    theme,
  } = useContext(AppContext);

  const {
    currentOrganization: {
      _id: organizationId = '',
    } = {},
  } = useOutletContext();

  const [clientSecret, setClientSecret] = useState('');
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currency, setCurrency] = useState('eur');
  const [amountTaxExcluded, setAmountTaxExcluded] = useState('');
  const [isFetchingPaymentIntent, setIsFetchingPaymentIntent] = useState(true);

  const hasLoadedRef = useRef(null);

  const createStripeSubscription = async () => {
    const {
      data: {
        data: {
          clientSecret: clientSecretFromBackend,
          taxAmount: taxAmountFromBackend,
          totalAmount: totalAmountFromBackend,
          currency: currencyFromBackend,
          amountTaxExcluded: amountTaxExcludedFromBackend,
        },
      },
    } = await axios.requestWithAuth('post', `${VITE_BACKEND_URL}/organizations/${organizationId}/stripe-subscriptions`, {
      subscriptionFunnelId,
    });
    setClientSecret(clientSecretFromBackend);
    setTaxAmount(taxAmountFromBackend);
    setTotalAmount(totalAmountFromBackend);
    setCurrency(currencyFromBackend);
    setAmountTaxExcluded(amountTaxExcludedFromBackend);
    setIsFetchingPaymentIntent(false);
  };

  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    
    createStripeSubscription();
  }, []);

  // useEffect(() => {
  //   const fetchPaymentIntent = async () => {
  //     const {
  //       data: {
  //         data: {
  //           clientSecret: clientSecretFromBackend,
  //           taxAmount: taxAmountFromBackend,
  //           totalAmount: totalAmountFromBackend,
  //           currency: currencyFromBackend,
  //           amountTaxExcluded: amountTaxExcludedFromBackend,
  //         } = {},
  //       } = {},
  //     } = await axios.requestWithAuth('post', `${VITE_BACKEND_URL}/organizations/${organizationId}/payment-intent`, {
  //       priceId: selectedPriceId,
  //     });
  //     setClientSecret(clientSecretFromBackend);
  //     setTaxAmount(taxAmountFromBackend);
  //     setTotalAmount(totalAmountFromBackend);
  //     setCurrency(currencyFromBackend);
  //     setAmountTaxExcluded(amountTaxExcludedFromBackend);
  //     setIsFetchingPaymentIntent(false);
  //   };
  //   fetchPaymentIntent();
  // }, [selectedPriceId]);


  const shouldTaxBeAdded = taxExempt === 'none';

  const subscriptionInterval = isShowingMonthlyPrice
    ? 'Monthly'
    : 'Annual';

  const priceListInfos = [
    {
      key: 'amount-tax-excluded',
      primaryText: `${t(planName)} - ${t(`${subscriptionInterval} subscription`)}`,
      secondaryTextLine1: t('Excluding tax'),
      secondaryTextLine2: '',
      amount: displayPrice({
        amount: amountTaxExcluded,
        currency: CURRENCIES[currency],
      }),
    },
    {
      key: 'tax',
      primaryText: t('Tax'),
      secondaryTextLine1: (taxCode && taxPercentage)
        ? `${countryCode} ${snakeCaseToUpperText(taxCode)} ${taxPercentage}%${taxNumber ? ` - ${taxNumber}` : ''}`
        : '',
      secondaryTextLine2: t(displayTaxExempt({ taxExempt })),
      amount: displayPrice({
        amount: taxAmount,
        currency: CURRENCIES[currency],
      }),
    },
    {
      key: 'total',
      primaryText: t('Total'),
      secondaryTextLine1: shouldTaxBeAdded
        ? t('Including tax')
        : '',
      secondaryTextLine2: '',
      amount: displayPrice({
        amount: totalAmount,
        currency: CURRENCIES[currency],
      }),
    },
  ];


  const elementOptions = {
    locale: lang,
    appearance: {
      theme: isThemeDark ? 'night' : 'stripe',
      variables: {
        colorPrimary: theme.palette.primary.main,
        colorBackground: theme.palette.background.default,
        colorText: theme.palette.text.primary,
        colorDanger: theme.palette.error.main,
        fontFamily: theme.typography.fontFamily,
      }
    },
    clientSecret,
  }

  const goBack = () => updateSubscriptionFunnel({
    step: 'address_collection',
  })

  return {
    t,
    priceListInfos,
    isFetchingPaymentIntent,
    elementOptions,
    clientSecret,
    goBack,
  };
};

export default usePaymentForm;
