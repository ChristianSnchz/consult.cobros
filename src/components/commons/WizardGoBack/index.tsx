import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Icon from '@santander/everest-ui/lib/Icon';
import theme from '@santander/obp-ui/lib/theme';
import { useHistory } from 'react-router';

const StyledWizardGoBack = styled.div`
  cursor: pointer;
  width: calc(88% + 5rem);
  transform: translateX(-5px);
  max-width: 1260px;
  margin: 0 auto;
  left: 0;
  display: flex;
  align-items: center;
  font-family: ${theme.obpUI.fontSantanderMicroText};
  color: ${theme.color.white};
`;
interface IWizzard {
  text: string;
}
const WizardGoBack: FC<IWizzard> = ({ text }) => {
  const history = useHistory();
  const [visible, setVisible] = useState<boolean>(history.location.pathname !== '/');

  history.listen(s => {
    setVisible(s.pathname !== '/');
  });

  const handleGo = () => {
    history.goBack();
  };
  return (
    visible && (
      <StyledWizardGoBack onClick={handleGo}>
        <Icon icon="be-090" size="24px" />
        {text}
      </StyledWizardGoBack>
    )
  );
};

export default WizardGoBack;
