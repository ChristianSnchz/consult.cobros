/* eslint no-param-reassign: "error" */
import React, { FC, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useAnalytics } from '@santander/analytics-empresas';
import { useQuery } from 'react-query';
import { MobileContainerTitle } from '../../styles/general';
import { FilterContext } from '../../contexts/FilterContext';
// eslint-disable-next-line import/no-unresolved
import { PubDebtContext } from '../../contexts/PubDebContext';
import { TableContext } from '../../contexts/TableContext';
import { AppContext } from '../../contexts/AppContext';
import Filters from '../../components/commons/FiltersBox';
import TableBox from '../../components/commons/TableBox';
import DownloadSection from '../../components/PubDebt/DownloadSection';
import getColumns from '../../components/PubDebt/columns';
import { ModalContext } from '../../contexts/ModalContext';
import CardMobile from './CardMobile';
import PopUpDetail from '../../components/PubDebt/PopUpDetail/PopUpDetail';
import filterValidator from '../../utils/formUtils/filterValidator';
import parsers from '../../utils/helpers/parsers';
import { getAllAgreementsSelect } from '../../services/agrementService';
import { getAllDocumentTypes } from '../../services/documentService';

const PubDebt: FC = () => {
  const { isMobile, setHasErrors, setIsLoading, isLoading } = useContext(AppContext);
  const [filterMobile, setfilterMobile] = useState<boolean>(isMobile);
  const { filters, handleFilters, setFilters } = useContext(FilterContext);
  const { handleChangePage, handleRowsPerPage, handleSort } = useContext(TableContext);
  const {
    hasError,
    data: { list, total },
    isInitial,
    params
  } = useContext(PubDebtContext);

  const { pathname } = useLocation();
  const { triggerEvent } = useAnalytics({ url: pathname });
  const [openViewMore, setOpenViewMore] = useState<any>(null);
  const { showModal, setInfoModal, setShowModal } = useContext(ModalContext);
  const { setShowDownloadAll } = useContext(PubDebtContext);

  const { isFetching: isFetchingAgreements, isError: errorAgreements } = useQuery(
    ['agreements'],
    () => getAllAgreementsSelect(),
    {
      retry: 3,
      retryDelay: 1000,
      onSuccess: agreementsData => {
        setFilters(prev => ({ ...prev, agreement: { ...prev.agreement, optionsList: agreementsData } }));
      }
    }
  );

  const { isFetching: isFetchingDocTypes, isError: errorDocTypes } = useQuery(
    ['document_types'],
    () => getAllDocumentTypes(),
    {
      retry: 3,
      retryDelay: 1000,
      onSuccess: documentTypesData => {
        setFilters(prev => ({ ...prev, documentType: { ...prev.documentType, optionsList: documentTypesData } }));
      }
    }
  );

  useEffect(() => {
    setIsLoading(isFetchingAgreements || isFetchingDocTypes);
  }, [isFetchingAgreements, isFetchingDocTypes]);

  useEffect(() => {
    if (errorAgreements || errorDocTypes) {
      setHasErrors(true);
    }
  }, [errorAgreements, errorDocTypes]);

  useEffect(() => {
    if (openViewMore) {
      setInfoModal({
        onPrimary: null,
        primaryText: '',
        children: <PopUpDetail row={openViewMore} />,
        title: 'Detalle del documento',
        size: 'lg',
        alignment: 'left'
      });
      setShowModal(true);
    } else {
      setInfoModal(null);
      setShowModal(false);
    }
  }, [openViewMore, setInfoModal, setShowModal]);

  useEffect(() => {
    if (!showModal) {
      setOpenViewMore(null);
    }
  }, [showModal]);

  /* ts-disable */
  return (
    <>
      {isMobile && !filterMobile && (
        <MobileContainerTitle>Estos son los resultados de tu búsqueda</MobileContainerTitle>
      )}
      <Filters
        isMobile={isMobile}
        onApplyFilters={handleFilters}
        filterMobile={filterMobile}
        // eslint-disable-next-line no-shadow
        setfilterMobile={setfilterMobile}
        filtersObject={filters}
        fieldsInterceptor={{
          clientNumber: field => parsers.addCeros(filterValidator.validateField(field), 15),
          clientCuit: parsers.parseCUIT,
          agreement: newValue => {
            if (newValue.value) {
              setShowDownloadAll(newValue.value);
            }
            return filterValidator.validateField(newValue);
          },
          documentType: (newValue, _, fields) => {
            fields.documentNumber.value = '';
            fields.documentNumber.disabled = !newValue.value;
            fields.quotaNumber.disabled = !newValue.value;
            fields.quotaNumber.value = !newValue.value ? '' : '0000';
            return newValue;
          },
          documentNumber: filterValidator.validateField,
          quotaNumber: field => parsers.addCeros(filterValidator.validateField(field), 4)
        }}
      />
      <TableBox
        filterMobile={filterMobile}
        contextProps={{
          dataList: list,
          handleChangePage,
          handleRowsPerPage,
          handleSort,
          isInitial,
          params,
          totalRows: total,
          hasError
        }}
        cardMobile={CardMobile}
        setfilterMobile={setfilterMobile}
        columns={getColumns(list, triggerEvent, { open: openViewMore, setOpen: setOpenViewMore })}
        key={1}
      />
      {!hasError && !filterMobile && !isLoading && <DownloadSection isMobile={isMobile} hasData={list.length > 0} />}
    </>
  );
};

export default PubDebt;
