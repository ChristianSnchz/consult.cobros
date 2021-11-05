import React, { FC, useContext, useState } from 'react';
import styled from 'styled-components';
import Button from '@santander/everest-ui/lib/Button';
import { IShippingDetail } from '../../../contexts/ShippingPubContext/interfaces';
import { ModalContext } from '../../../contexts/ModalContext';
import GeneralDetail from './GeneralDetail';
import { deleteShippingsPub } from '../../../services/shippingPubService';
import { ShippingPubContext } from '../../../contexts/ShippingPubContext';

export const Wrapper = styled.div`
  margin-top: 1rem;
`;

const Message = styled.span`
  height: 50px;
`;

export const ButtonsWrapper = styled('div')<{
  withoutBorder: boolean;
  direction: 'flex-start' | 'space-around' | 'space-between';
}>`
  display: flex;
  flex-direction: row;
  ${({ withoutBorder }) => (!withoutBorder ? 'border-top: 2px solid #b5b5b5;' : '')};
  padding-top: 1rem;
  width: 100%;
  justify-content: ${({ direction }) => direction || 'flex-start'};
  button:nth-child(1) {
    margin-right: 1rem;
  }
`;

interface IDeletePublicationProps {
  shipingDetail: IShippingDetail;
  id: string;
}

const DeletePublication: FC<IDeletePublicationProps> = ({ shipingDetail, id }) => {
  const { setInfoModal, setShowModal } = useContext(ModalContext);
  const { setNewRequest } = useContext(ShippingPubContext);
  const [loading, setloading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleCancel = () => {
    setInfoModal({
      onPrimary: null,
      primaryText: '',
      children: <GeneralDetail shippingDetailLoad={shipingDetail} id={id} />,
      title: 'Detalle del documento',
      size: 'lg',
      alignment: 'center'
    });
    // setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      setloading(true);
      const result = await deleteShippingsPub(id);
      setNewRequest(prev => prev + 1);
      setloading(false);
      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    } catch (err) {
      setloading(false);
      setError(true);
    }
  };

  return (
    <>
      <Wrapper>
        <Message>
          {(loading && 'Eliminando...') ||
            (success && '¡Fue eliminado correctamente!') ||
            (error && '¡Lo sentimos hubo un error!') ||
            'Para borrar esta publicación presione "Eliminar" '}
        </Message>

        <ButtonsWrapper withoutBorder direction="space-around">
          <Button
            data-testid="btn-remove"
            disabled={loading || success}
            text={'Eliminar'}
            variant="primary"
            onClick={handleDelete}
          />
          <Button
            disabled={loading || success}
            data-testid="btn-cancel"
            text="Cancelar"
            variant="secondary"
            onClick={handleCancel}
          />
        </ButtonsWrapper>
      </Wrapper>
    </>
  );
};

export default DeletePublication;
