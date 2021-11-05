import { useAnalytics } from '@santander/analytics-empresas';
import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import {
  CardContainer,
  CardInformationContainer,
  CardMoreInformation,
  TextCard
} from '../../components/commons/CardTable/styled';
import { StyledIcon } from '../../components/ShippingPub/columns';
import { AppContext } from '../../contexts/AppContext';
import { ModalContext } from '../../contexts/ModalContext';
import { IShippingInfo } from '../../contexts/ShippingPubContext/interfaces';
import RejectedDetail from '../../components/ShippingPub/PopUpDetail/RejectedDetail';
import GeneralDetail from '../../components/ShippingPub/PopUpDetail/GeneralDetail';
import { CANCELLED_STATUS_CODE, REJECTED_STATUS_CODES } from '../../contexts/ShippingPubContext/shippingStatusCodes';
import { ShippingPubContext } from '../../contexts/ShippingPubContext';

interface ICardMobile {
  item: IShippingInfo;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardMobileShipping: FC<ICardMobile> = ({ item }) => {
  const { pathname } = useLocation();
  const { triggerEvent } = useAnalytics({ url: pathname });
  const { setInfoModal, setShowModal } = useContext(ModalContext);
  const { isMobile } = useContext(AppContext);
  const {
    data: { agreement }
  } = useContext(ShippingPubContext);

  const setOpenCard = () => {
    setInfoModal({
      onPrimary: null,
      primaryText: '',
      children: REJECTED_STATUS_CODES.includes(item.codeStatus) ? (
        <RejectedDetail shippingInfo={item} />
      ) : (
        <GeneralDetail id={item.id} />
      ),
      title: 'Detalle del documento',
      size: 'md',
      alignment: isMobile ? 'left' : 'center'
    });
    setShowModal(true);
  };

  return (
    <CardContainer>
      <CardInformationContainer width={'99%'}>
        <TextCard size={1.25} marginBottom={1} bold={true}>
          {`${item.status}`}
        </TextCard>
        <TextCard size={0.75} marginBottom="0.5">
          Fecha de alta: {item.dischargeDate}
        </TextCard>
        <TextCard size={0.75} marginBottom="0.5">
          Acuerdo: {agreement}
        </TextCard>
        <TextCard size={0.75} marginBottom="0.5">
          Número de envío: {item.shippingNumber}
        </TextCard>
      </CardInformationContainer>
      <CardMoreInformation justifyContent="flex-end">
        {item.codeStatus !== CANCELLED_STATUS_CODE && (
          <StyledIcon
            data-testid="ver-detalle-btn"
            onClick={async () => {
              triggerEvent('ver-mas-detalle', 'click');
              setOpenCard();
            }}
            color={!triggerEvent ? '#616166' : '#ec0000'}
            size="22px"
            icon="be-280"
          >
            {'Ver detalle'}
          </StyledIcon>
        )}
      </CardMoreInformation>
    </CardContainer>
  );
};

export default CardMobileShipping;
