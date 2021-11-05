import styled from 'styled-components';
import { number } from 'prop-types';
import { RED } from './colors';

export const StyledWeeklyDay = styled('div')<{ index: number }>`
  text-align: center;
  color: rgb(37, 127, 164);
  user-select: none;
  font-weight: bold;
  font-size: 0.875rem;
  font-family: 'SantanderMicrotext';
  text-transform: uppercase;
  -ms-grid-column: ${({ index }) => index + 1};
  -ms-grid-row: 1;
`;

export const Weekly = styled('div')`
  display: grid;
  display: -ms-grid;
  grid-template-rows: repeat(7, auto);
  -ms-grid-rows: (auto) [7];
  font-family: 'SantanderMicrotext';
  grid-template-columns: repeat(7, 1fr);
  -ms-grid-columns: (1fr) [7];
  height: auto;
  justify-content: center;
  margin-bottom: 5px;
  margin-top: 6px;
  margin-top: 10px;
  padding: 0 4px;
`;

export const MonthLabel = styled('div')`
  font-family: SantanderHeadline-Regular;
  text-align: center;
  color: white;
  margin: 10px auto;
  user-select: none;
  span {
    text-transform: capitalize;
    font-size: 1rem;
    font-weight: normal;
    height: 28px;
    line-height: 28px;
    text-align: center;
  }
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  border-radius: 4px 4px 0 0;
  width: 100%;

  height: 50px;
  font-size: 1.25rem;
  font-weight: bold;
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.15);
  background-color: rgb(37, 127, 164);
  vertical-align: middle;
  z-index: 2;
  justify-content: space-between;
  flex-direction: row;
`;
export const WrapperSantanderIcon = styled('div')`
  height: 100%;
  margin: 0 8px;
  cursor: pointer;
  span {
    padding: 4px;
  }
  display: flex;
  &:hover {
    span {
      border-radius: 50%;
      pointer-events: none;
      background: rgb(159 198 214 / 80%);
      box-shadow: rgb(0 0 0 / 20%) 0px 2px 5px;
      transition: all 250ms ease-in-out;
    }
  }
`;
export const MonthWrapper = styled('div')`
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.15);
  background-color: white;
  margin-right: 1rem;

  @media (max-width: 576px) {
    justify-self: center;
    :last-of-type {
      margin: 1rem 0;
    }
  }
`;

// Fix Grid Layout for Internet Explorer
export const DaysMatrixWrapper = styled('div')<{ index: number }>`
  -ms-grid-column: ${({ index }) => (index % 7) + 1};
  -ms-grid-row: ${({ index }) => Math.trunc(index / 7) + 1};
`;
