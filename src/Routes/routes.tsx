import React, { FC } from 'react';
import PubDebt from '../views/PubDebt';
import DebtShipping from '../views/ShippingPub';

const Generic: FC = () => <div />;

export default [
  {
    title: 'Envíos',
    name: 'pub-shipping',
    icon: 'fa-100',
    url: '/pub-shipping',
    description: 'Mirá cuál es el estado de tus envíos de publicación',
    component: DebtShipping,
    disabled: false
  },
  {
    title: 'Deuda publicada',
    name: 'pub-debt',
    icon: 'bc-010',
    url: '/pub-debt',
    description: 'Descargá el detalle de las deudas que publicaste',
    component: PubDebt
  },
  {
    title: 'Tarjeta de recaudación',
    name: 'pub-card',
    icon: 'ad-010',
    url: '/pub-card',
    description: 'Revisá cuántas pediste y en qué fechas',
    component: Generic,
    disabled: false
  }
];
