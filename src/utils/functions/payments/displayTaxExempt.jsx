const displayTaxExempt = ({
  taxExempt = '',
}) => {
  switch (taxExempt) {
    case 'exempt': {
      return 'Exempt';
    }
    case 'reverse': {
      return 'To be paid on reverse charge basis';
    }
    default: {
      return '';
    }
  }
};

export default displayTaxExempt;
