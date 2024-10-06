export const formatAmount = (amount) => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
};

export const getQueryString = (params) => {
  return new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).filter(
        ([, value]) => value !== '' && value !== undefined && value !== null,
      ),
    ),
  ).toString();
};

export const maskWalletAddress = (
  address,
  startChars = 3,
  endChars = 4,
  maskChar = '...',
) => {
  if (address.length < startChars + endChars) {
    return address;
  } else {
    return (
      address.substring(0, startChars) +
      maskChar +
      address.substring(address.length - endChars)
    );
  }
};
