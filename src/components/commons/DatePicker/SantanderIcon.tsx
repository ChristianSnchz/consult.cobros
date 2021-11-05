import React, { FC } from 'react';
import { Icon } from '@santander/everest-ui';
import styled from 'styled-components';
import { RED } from './colors';

interface iconProps {
  color?: string;
  size?: string;
  icon: string;
  onClick?: () => void;
}

const IconWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SantanderIcon: FC<iconProps> = ({ color = RED, size = '24px', icon, onClick }) => (
  <IconWrapper onClick={onClick}>
    <Icon color={color} size={size} icon={`icon-${icon}`} />
  </IconWrapper>
);
export default SantanderIcon;
