import React, { createContext, useState, FC, useEffect, useContext } from 'react';
import constant from 'lodash/constant';
import { useLocation } from 'react-router';
import { useAnalytics } from '@santander/analytics-empresas';
import { IDataTableColumn } from 'react-data-table-component';
import { AppContext } from './AppContext';
import { obj } from '../utils/types';

export interface TableContextProps {
  handleRowsPerPage: (count: number) => void;
  handleSort: (column: IDataTableColumn<obj>, sortDirection: 'asc' | 'desc') => void;
  handleChangePage: (page: number) => void;
  filterTable: any;
}

export const initialProps: TableContextProps = {
  handleRowsPerPage: constant,
  handleSort: constant,
  handleChangePage: constant,
  filterTable: null
};
const TableContext = createContext(initialProps);
const TableProvider: FC = ({ children }) => {
  const { isMobile } = useContext(AppContext);
  const [filterTable, setfilterTable] = useState({
    limit: '10',
    offset: '0'
  });
  const { pathname } = useLocation();
  const { triggerEvent } = useAnalytics({ url: pathname });

  const handleSort = (column, sortDirection: 'asc' | 'desc') => {
    triggerEvent(`cambio-de-ordenamiento: ${column.selector}-${sortDirection}`, 'click');
    setfilterTable(prev => ({ ...prev, order: sortDirection }));
  };

  const handleChangePage = (page: number) => {
    triggerEvent('cambio-de-pagina', 'click');
    setfilterTable(prev => ({ ...prev, offset: `${Number(prev.limit) * (page - 1)}` }));
  };
  const handleRowsPerPage = (page: number) => {
    triggerEvent(`cambio-de--por-pagina-${Number(page)}`, 'click');
    setfilterTable(prev => ({ ...prev, limit: `${Number(page)}`, offset: '0' }));
  };

  useEffect(() => {
    setfilterTable(prev => ({ ...prev, offset: '0', limit: isMobile ? '10' : filterTable.limit }));
  }, [isMobile]);

  return (
    <TableContext.Provider
      value={{
        handleRowsPerPage,
        handleChangePage,
        handleSort,
        filterTable
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
export { TableContext };
export default TableProvider;
