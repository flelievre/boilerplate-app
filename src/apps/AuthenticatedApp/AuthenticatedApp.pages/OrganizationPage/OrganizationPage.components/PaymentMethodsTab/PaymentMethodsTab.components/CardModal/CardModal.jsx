import React from 'react';
import {
  Box,
} from '@mui/material';
import {
  Modal,
} from '@/utils';
import {
  CardElement,
} from '@stripe/react-stripe-js';
import {
  useCardModal,
} from './CardModal.logic';

const CardModal = ({
  isShowingCardModal = false,
  hideCardModal = () => {},
  reloadAllData = () => {},
}) => {
  const {
    isMobile,
    handleSubmit,
    isLoading,
    hasAnError,
    nbFormSubmissionCounter,
    t,
    isThemeDark,
  } = useCardModal({
    hideCardModal,
    reloadAllData,
  });

  return (
    <Modal
      title={t('Update your payment method')}
      isShowingModal={isShowingCardModal}
      hideModal={hideCardModal}
      isLoading={isLoading}
      isMobile={isMobile}
      nbFormSubmissionCounter={nbFormSubmissionCounter}
      hasAnError={hasAnError}
      handleSubmit={handleSubmit}
      submitButtonText={t('Update')}
    >
      <Box
        sx={{
          p: 2,
          border: 'solid 1px',
          borderColor: isThemeDark ? 'divider' : '#e0e0e0',
          borderRadius: 2.5,
        }}
      >
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                color: isThemeDark ? '#ffffff' : '#000000',
                '::placeholder': {
                  color: isThemeDark ? '#b3b3b3' : '#757575',
                },
              },
              invalid: {
                color: '#ff6b6b',
              },
            },
          }}
        />
      </Box>
    </Modal>
  );
};

export default CardModal;
