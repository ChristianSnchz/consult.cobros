import React, { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import Button from '@santander/everest-ui/lib/Button';
import Icon from '@santander/everest-ui/lib/Icon';
import { useAnalytics } from '@santander/analytics-empresas';
import { useLocation } from 'react-router';
import { ErrorMessage, ErrorsContainer, ErrorTitle } from './styles';

interface GeneralErrorsProps {
  hasErrors: boolean;
  setHasErrors: Dispatch<SetStateAction<boolean>>;
  onNotRetry: () => void;
}

const GeneralErrors: FC<GeneralErrorsProps> = ({ children, hasErrors, setHasErrors, onNotRetry }) => {
  const [errorCounter, setErrorCounter] = useState(0);
  const { pathname } = useLocation();
  const { triggerEvent } = useAnalytics({ url: pathname });

  const handleButton = () => {
    if (errorCounter >= 3) {
      triggerEvent('boton-redirigir-a-consultas-general-error', 'click');
      setErrorCounter(0);
      onNotRetry();
    } else {
      setErrorCounter(errorCounter + 1);
      triggerEvent('boton-reintento-general-error', 'click');
    }
    setHasErrors(false);
  };

  return (
    <>
      {hasErrors ? (
        <ErrorsContainer>
          <Icon size="48px" icon="bd-120"></Icon>
          <ErrorTitle>Lo sentimos</ErrorTitle>
          {errorCounter < 3 ? (
            <>
              <ErrorMessage>Ha ocurrido un error al solicitar la información.</ErrorMessage>
              <ErrorMessage>Podés volver a intentarlo.</ErrorMessage>
            </>
          ) : (
            <>
              <ErrorMessage>
                El servicio no está disponible en este momento, pero estamos trabajando para solucionarlo.
              </ErrorMessage>
              <ErrorMessage>Por favor, volvé a intentarlo mas tarde</ErrorMessage>
            </>
          )}
          <Button
            text={errorCounter >= 3 ? 'Entendido' : 'Reintentar'}
            data-testid="btn-error"
            variant="primary"
            onClick={handleButton}
          />
        </ErrorsContainer>
      ) : (
        children
      )}
    </>
  );
};

export default GeneralErrors;
