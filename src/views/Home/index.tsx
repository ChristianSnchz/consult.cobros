import React, { FC, useContext } from 'react';
import Icon from '@santander/everest-ui/lib/Icon';
import theme from '@santander/obp-ui/lib/theme';

import { useHistory } from 'react-router';
import routes from '../../Routes/routes';
import { CardContainer, CardDescription, CardTitle, MenuCard } from './styles';
import { Title } from '../../styles/general';
import { AppContext } from '../../contexts/AppContext';

const Home: FC = () => {
  const history = useHistory();
  const { isMobile } = useContext(AppContext);
  return (
    <>
      <CardContainer isMobile={isMobile}>
        <Title data-testid="title-dashboard" isMobile={isMobile}>
          ¿Qué tipo de consulta querés hacer?
        </Title>
        {routes.map(r => (
          <MenuCard
            disabled={r.disabled}
            isMobile={isMobile}
            key={r.title}
            onClick={() =>
              history.push({
                hash: '',
                pathname: r.url,
                search: '',
                state: { title: r.title }
              })
            }
          >
            <Icon icon={r.icon} size="26px" color={r.disabled ? 'rgb(79, 84, 87)' : theme.color.santanderred} />
            <CardTitle data-testid={r.name}>{r.title}</CardTitle>
            <CardDescription>{r.description}</CardDescription>
          </MenuCard>
        ))}
      </CardContainer>
    </>
  );
};

export default Home;
