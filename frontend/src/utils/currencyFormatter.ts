const currencyFormatter = (price: number) => {
    return (price ? Intl.NumberFormat('en-US', {
        notation:'compact',
        style: 'currency',
        currency: 'USD',
      }).format(price) : '--');
  };

export default currencyFormatter;