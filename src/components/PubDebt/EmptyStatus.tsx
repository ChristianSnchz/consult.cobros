import React, { FC, useContext, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../../contexts/AppContext';
import emptyDebts from '../../images/empty_debts.svg';
import errorDebts from '../../images/error_debts.svg';

const DebtsEmptyStatusContainer = styled.div<{ isMobile: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;

  ${({ isMobile }) =>
    isMobile
      ? css`
          flex-direction: column;
          top: 10px;
          margin: auto 0;
        `
      : css`
          flex-direction: row;
          top: -8px;
        `}
`;

const ImageContainer = styled.img<{ isMobile: boolean }>`
  order: ${({ isMobile }) => (isMobile ? '1' : '0')};
`;

const TextContainer = styled.div<{ isMobile: boolean }>`
  display: flex;
  margin-left: 8px;
  flex-direction: column;
  order: ${({ isMobile }) => (isMobile ? '0' : '1')};
  text-align: ${({ isMobile }) => (isMobile ? 'center' : 'start')};

  h4 {
    color: rgb(34, 34, 34);
    font-family: SantanderMicroText-Bold;
    font-size: 1rem;
    margin: 4px 0;
  }

  p {
    color: rgb(34, 34, 34);
    font-family: SantanderMicroText;
    font-size: 0.875rem;
    width: ${({ isMobile }) => (isMobile ? '100%' : '336px')};
    margin: 4px 0;
  }
`;

const emptyStatusType = {
  INITIAL_STATUS: {
    title: 'Elegí los filtros de búsqueda',
    description: 'Comenzá tu consulta ingresando los datos de la deuda',
    imageSrc: emptyDebts
  },
  NOT_RESULTS_FOUND_STATUS: {
    title: 'No se encontraron resultados para la búsqueda',
    description: 'Probá cambiando los filtros de búsqueda.',
    imageSrc: errorDebts
  },
  ERROR_STATUS: {
    title: 'No podemos mostrarte tus deudas',
    description: 'Tuvimos un error. Por favor, intentá nuevamente.',
    imageSrc: errorDebts
  }
};

const EmptyStatus = ({ hasError, isInitial }) => {
  const { isMobile } = useContext(AppContext);

  const getEmptyStatus = () => {
    if (isInitial) {
      return emptyStatusType.INITIAL_STATUS;
    }
    if (hasError) {
      return emptyStatusType.ERROR_STATUS;
    }
    return emptyStatusType.NOT_RESULTS_FOUND_STATUS;
  };

  const emptyStatus = useMemo(() => getEmptyStatus(), []);

  return (
    <DebtsEmptyStatusContainer isMobile={isMobile}>
      <ImageContainer isMobile={isMobile} src={emptyStatus.imageSrc} alt="empty-status" />
      <TextContainer isMobile={isMobile}>
        <h4>{emptyStatus.title}</h4>
        <p>{emptyStatus.description}</p>
      </TextContainer>
    </DebtsEmptyStatusContainer>
  );
};

export default EmptyStatus;
