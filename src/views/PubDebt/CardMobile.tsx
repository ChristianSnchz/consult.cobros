import { useAnalytics } from '@santander/analytics-empresas';
import React, { FC, useContext } from 'react';
import { useLocation } from 'react-router';
import {
  CardContainer,
  CardInformationContainer,
  CardMoreInformation,
  TextCard
} from '../../components/commons/CardTable/styled';
import { StyledIcon } from '../../components/PubDebt/columns';
import PopUpDetail from '../../components/PubDebt/PopUpDetail/PopUpDetail';
import { AppContext } from '../../contexts/AppContext';
import { IDebts } from '../../contexts/PubDebContext/interfaces';
import { ModalContext } from '../../contexts/ModalContext';
import formatBalance from '../../utils/helpers/balanceHelper';

interface ICardMobile {
  item: IDebts;
}
const CardMobile: FC<ICardMobile> = ({ item }) => {
  const { pathname } = useLocation();
  const { triggerEvent } = useAnalytics({ url: pathname });
  const { setInfoModal, setShowModal } = useContext(ModalContext);
  const { isMobile } = useContext(AppContext);

  const setOpenCard = () => {
    setInfoModal({
      onPrimary: null,
      primaryText: '',
      children: <PopUpDetail row={item} />,
      title: 'Detalle del documento',
      size: 'md',
      alignment: isMobile ? 'left' : 'center'
    });
    setShowModal(true);
  };
  return (
    <CardContainer>
      <CardInformationContainer>
        <TextCard first size={0.75} marginBottom={0.25}>
          {item.debt.documentDescription}
        </TextCard>
        <TextCard color={'#767676'} marginBottom={0.75} size={0.75}>
          N° {item.debt.documentNumber}
        </TextCard>
        <TextCard size={1.5} marginBottom={0.75} bold={true}>
          {`$ ${formatBalance(Number(item.debt.amount))}`}
        </TextCard>
      </CardInformationContainer>
      <CardMoreInformation>
        <TextCard color={'#767676'} size={0.75}>
          Cuota: {item.debt.paymentNumber}
        </TextCard>
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
      </CardMoreInformation>
    </CardContainer>
  );
};
export default CardMobile;
