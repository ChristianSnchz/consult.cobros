import React, { FC, useEffect, useState } from 'react';
import Button from '@santander/everest-ui/lib/Button';
import styled from 'styled-components';

import { ButtonsWrapper, Wrapper } from '../../components/commons/modalStyles';

interface IRemoveModal {
  onPrimary: () => Promise<any>;
  onSecondary: () => void;
}
const Message = styled.span`
  height: 50px;
`;
const RemoveModal: FC<IRemoveModal> = ({ onPrimary, onSecondary }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (!loading && success) setTimeout(() => onSecondary(), 1500);
  }, [loading, success, onSecondary]);
  return (
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
          onClick={() => {
            setLoading(true);
            onPrimary()
              .then(() => {
                setSuccess(true);
                setLoading(false);
              })
              .catch(() => {
                setError(true);
                setLoading(false);
              });
          }}
        />
        <Button data-testid="btn-cancel" text={'Salir'} variant="secondary" onClick={onSecondary} />
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default RemoveModal;
