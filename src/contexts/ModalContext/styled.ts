import styled from 'styled-components';
import Spinner from '@santander/everest-ui/lib/Spinner';

export const SpinnerContainer = styled.div`
  width: 100%;
  height: 18.75rem;
  position: relative;
`;

export const ModalSpinner = styled(Spinner)`
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, -50%);
`;
