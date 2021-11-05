import React, { FC } from 'react';

import { WrapperCard } from './styled';
import { obj } from '../../../utils/types';

interface CardProps {
  item: obj;
  component: (props: { item: obj }) => JSX.Element;
}

const CardTable: FC<CardProps> = ({ item, component: Component }) => (
  <WrapperCard>
    <Component item={item} />
  </WrapperCard>
);

export default CardTable;
