const onSuccessResponse = ({ newData, setPubDebState, isMobile, setFilters }) => {
  setPubDebState(prev => ({
    ...prev,
    data: {
      list: newData.debts,
      total: newData.total
    }
  }));
  if (newData.debts.length > 0) {
    const clientCuitValue = newData.debts[0].client.clientCuit;
    const businessNameValue = newData.debts[0].client.businessName;
    setFilters(prev => ({
      ...prev,
      clientCuit: { ...prev.clientCuit, value: clientCuitValue },
      businessName: { ...prev.businessName, value: businessNameValue }
    }));
  }
};

const onErrorResponse = ({ setPubDebState }) => {
  setPubDebState(prev => ({
    ...prev,
    data: {
      list: [],
      total: '0'
    }
  }));
};

export { onSuccessResponse, onErrorResponse };
