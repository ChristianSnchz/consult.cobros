import React from 'react';
import { StyledSpinner, SpinnerCircle, SpinnerText, SpinnerContainer } from './styles';

interface ISpinner {
  loading: boolean;
  size?: number;
  color?: string;
  zIndex?: number;
  text?: string;
}
const initialProps: ISpinner = {
  loading: false,
  size: 30,
  color: 'rgb(255, 0, 0)',
  zIndex: 101,
  text: ''
};
const Spinner: React.FC<ISpinner> = ({ loading, size, color, text, zIndex, ...props }): JSX.Element =>
  loading && (
    <SpinnerContainer zIndex={zIndex} {...props}>
      <StyledSpinner size={size} viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <SpinnerCircle color={color} />
      </StyledSpinner>
      {!!text && <SpinnerText>{text}</SpinnerText>}
    </SpinnerContainer>
  );

Spinner.defaultProps = initialProps;

export default Spinner;
