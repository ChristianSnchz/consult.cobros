import React, { FC, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useAnalytics } from '@santander/analytics-empresas';
import { useQuery } from 'react-query';
import { MobileContainerTitle } from '../../styles/general';
import { FilterContext } from '../../contexts/FilterContext';
import { ShippingPubContext } from '../../contexts/ShippingPubContext';
import { TableContext } from '../../contexts/TableContext';
import { AppContext } from '../../contexts/AppContext';
import Filters from '../../components/commons/FiltersBox';
import TableBox from '../../components/commons/TableBox';
import getColumns from '../../components/ShippingPub/columns';
import { ModalContext } from '../../contexts/ModalContext';
import GeneralDetail from '../../components/ShippingPub/PopUpDetail/GeneralDetail';
import RejectedDetail from '../../components/ShippingPub/PopUpDetail/RejectedDetail';
import CardMobile from './CardMobile';
import RemoveModal from './RemoveModal';
import { deleteShippingsPub } from '../../services/shippingPubService';
import { getAllAgreementsSelect } from '../../services/agrementService';
import filterValidator from '../../utils/formUtils/filterValidator';
import { REJECTED_STATUS_CODES } from '../../contexts/ShippingPubContext/shippingStatusCodes';

const ShippingPub: FC = () => {
  const { isMobile, setIsLoading, setHasErrors } = useContext(AppContext);
  const [filterMobile, setfilterMobile] = useState<boolean>(isMobile);
  const { filters, handleFilters, setFilters } = useContext(FilterContext);
  const { setInfoModal, setShowModal, showModal } = useContext(ModalContext);
  const { handleChangePage, handleRowsPerPage, handleSort } = useContext(TableContext);

  const { isFetching: isFetchingAgreements, isError: errorAgreements } = useQuery(
    ['agreements'],
    () => getAllAgreementsSelect(),
    {
      retry: 3,
      retryDelay: 5 * 1000,
      onSuccess: agreementsData => {
        setFilters(prev => ({ ...prev, agreement: { ...prev.agreement, optionsList: agreementsData } }));
      }
    }
  );

  useEffect(() => {
    setIsLoading(isFetchingAgreements);
  }, [isFetchingAgreements]);

  useEffect(() => {
    if (errorAgreements) {
      setHasErrors(true);
    }
  }, [errorAgreements]);

  const {
    hasError,
    data: { list, total },
    isInitial,
    setNewRequest,
    params
  } = useContext(ShippingPubContext);

  const { pathname } = useLocation();
  const { triggerEvent } = useAnalytics({ url: pathname });
  const [openDetail, setOpenDetail] = useState<any>(null);
  const [openRemove, setOpenRemove] = useState<any>(null);

  useEffect(() => {
    if (!showModal) {
      setOpenDetail(null);
      setOpenRemove(null);
    }
  }, [showModal]);

  useEffect(() => {
    if (openRemove) {
      setInfoModal({
        onPrimary: null,
        primaryText: null,
        children: (
          <RemoveModal
            onPrimary={() =>
              deleteShippingsPub(openRemove.id).then(res => {
                setNewRequest(prev => prev + 1);
                return res;
              })
            }
            onSecondary={() => {
              setShowModal(false);
              setInfoModal(null);
            }}
          />
        ),
        title: '¿Deseas eliminar la publicación?',
        size: 'md',
        alignment: 'center'
      });
      setShowModal(true);
    } else {
      setShowModal(false);
      setInfoModal(null);
    }
  }, [openRemove, setInfoModal, setShowModal]);

  useEffect(() => {
    if (openDetail) {
      setInfoModal({
        onPrimary: null,
        primaryText: '',
        children: REJECTED_STATUS_CODES.includes(openDetail.codeStatus) ? (
          <RejectedDetail shippingInfo={openDetail} />
        ) : (
          <GeneralDetail id={openDetail.id} />
        ),
        title: 'Detalle del documento',
        size: 'lg',
        alignment: 'left'
      });
      setShowModal(true);
    } else {
      setInfoModal(null);
      setOpenDetail(null);
      setShowModal(false);
    }
  }, [openDetail, setInfoModal, setShowModal]);

  return (
    <>
      {isMobile && !filterMobile && (
        <MobileContainerTitle>Estos son los resultados de tu búsqueda</MobileContainerTitle>
      )}
      <Filters
        isMobile={isMobile}
        onApplyFilters={handleFilters}
        filterMobile={filterMobile}
        setfilterMobile={setfilterMobile}
        filtersObject={filters}
        showAdvancedOptions={false}
        fieldsInterceptor={{
          agreement: filterValidator.validateField,
          publicationType: filterValidator.validateField,
          date: filterValidator.validateField
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
        columns={getColumns(triggerEvent, {
          openDetail,
          setOpenDetail,
          openRemove,
          setOpenRemove
        })}
        key={1}
      />
    </>
  );
};

export default ShippingPub;
