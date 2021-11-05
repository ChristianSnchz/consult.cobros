/* eslint-disable no-nested-ternary */
import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { FunctionalTable } from '@santander/obp-ui';
import { AppContext } from '../../../contexts/AppContext';
import {
  TableContainer,
  TableWrapper,
  WrapperTopTableMobile,
  FilterLink,
  AllDebtsMessage,
  CardTableContainer,
  TableSpinner,
  SpinnerContainer
} from './styles';
import EmptyStatus from '../../PubDebt/EmptyStatus';
import CardTable from '../CardTable';
import Spinner from '../Spinner';

export interface ITableContextProps {
  dataList: Array<any>;
  handleChangePage: (page: number) => void;
  handleRowsPerPage: (page: number) => void;
  handleSort: (column: any, sortDirection: 'asc' | 'desc') => void;
  isInitial: boolean;
  params: any;
  totalRows: string | number;
  hasError?: boolean;
}

export type IColumns = {
  name: string;
  center: boolean;
  selector?: string;
  sortable?: boolean;
  wrap?: boolean;
  omit?: boolean;
}[];
export interface ITableBoxProps {
  filterMobile: boolean;
  columns: IColumns;
  setfilterMobile: Dispatch<SetStateAction<boolean>>;
  contextProps: ITableContextProps;
  cardMobile: (props: any) => JSX.Element;
}

const TableBox: FC<ITableBoxProps> = ({
  filterMobile,
  setfilterMobile,
  columns,
  cardMobile,
  contextProps: { dataList, handleChangePage, handleRowsPerPage, handleSort, isInitial, params, totalRows, hasError }
}) => {
  const { isMobile, setTitle, isLoading } = useContext(AppContext);
  const [accumulatedList, setAccumulatedList] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    setAccumulatedList(prev => (params.offset !== '0' ? [...prev, ...dataList] : dataList));
  }, [dataList]);

  const handleScroll = () => {
    if (accumulatedList.length === totalRows || isLoading) {
      return;
    }
    const { clientHeight } = scrollRef.current;
    const scrollTop = scrollRef?.current.scrollTop;
    const scrollHeight = scrollRef?.current.scrollHeight;
    if (Math.trunc(scrollHeight - scrollTop) === clientHeight) {
      handleChangePage(Number(params.offset) / Number(params.limit) + 2);
    }
  };
  return !isMobile ? (
    <TableContainer>
      {!isLoading && (
        <>
          <TableWrapper data-testid="Table-test">
            <FunctionalTable
              responsive={true}
              pagination={true}
              columns={columns}
              paginationServer
              onSort={handleSort}
              keyField="echeqNumber"
              noDataComponent={<EmptyStatus hasError={hasError} isInitial={isInitial} />}
              emptyText={'No se encontraron resultados'}
              conditionalRowStyles={[
                {
                  when: row => row.id,
                  style: {
                    'border-bottom': 'none'
                  }
                }
              ]}
              data={dataList}
              onChangeRowsPerPage={handleRowsPerPage}
              noContextMenu
              paginationDefaultPage={Number(params.offset) / Number(params.limit) + 1}
              paginationPerPage={Number(params.limit)}
              paginationTotalRows={Number(totalRows)}
              onChangePage={handleChangePage}
            />
          </TableWrapper>
        </>
      )}
    </TableContainer>
  ) : (
    !filterMobile && (
      <>
        <WrapperTopTableMobile>
          <FilterLink
            data-testid="filter-btn"
            onClick={() => {
              setTitle('Filtros');
              setfilterMobile(!filterMobile);
            }}
          >
            Cambiar filtros de búsqueda
          </FilterLink>
        </WrapperTopTableMobile>
        {isLoading && !accumulatedList.length ? (
          <Spinner data-testid="spinnner-test" loading={true} color="#ec0000" size={36} />
        ) : !hasError && accumulatedList.length > 0 ? (
          <CardTableContainer data-testid="card-test" isLoading={isLoading} ref={scrollRef} onScroll={handleScroll}>
            {accumulatedList.map(item => (
              <CardTable item={item} key={item.id} component={cardMobile} />
            ))}
            {accumulatedList.length === totalRows && (
              <AllDebtsMessage Title>Estos son todos los resultados de tu consulta</AllDebtsMessage>
            )}
            {isLoading && (
              <SpinnerContainer>
                <TableSpinner data-testid="spinnner-test" loading={true} color="#ec0000" size={26} />
              </SpinnerContainer>
            )}
          </CardTableContainer>
        ) : (
          <EmptyStatus hasError={hasError} isInitial={isInitial} />
        )}
      </>
    )
  );
};

export default TableBox;
