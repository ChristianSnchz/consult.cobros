const onSuccessResponse = ({ newData, setShippingPubState, isMobile }) => {
  setShippingPubState(prev => ({
    ...prev,
    data: {
      list: newData.shippingsInfo,
      total: newData.total,
      agreement: newData.agreement
    }
  }));
};

const onErrorResponse = ({ setShippingPubState }) => {
  setShippingPubState(prev => ({
    ...prev,
    data: {
      list: [],
      total: '0',
      agreement: null
    }
  }));
};

export { onSuccessResponse, onErrorResponse };
