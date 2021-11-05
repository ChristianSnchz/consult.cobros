import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { BlobProvider, usePDF } from '@react-pdf/renderer';
import Button from '@santander/everest-ui/lib/Button';
import Icon from '@santander/everest-ui/lib/Icon';
import { useQuery } from 'react-query';
import downloadFiles from '../../../../utils/fileUtils/downloadFiles';
import { ButtonsWrapper, Division, PrintButton, Wrapper } from '../../../commons/modalStyles';
import { IShippingDetail } from '../../../../contexts/ShippingPubContext/interfaces';
import { getShippingById } from '../../../../services/shippingPubService';
import { ModalContext } from '../../../../contexts/ModalContext/index';
import registerFonts from '../../../../utils/registerFontsToPDF';
import PDFView from './PDFView';
import PDFDownload from './PDFDownload';
import blobToFile from '../../../../utils/fileUtils/blobToFile';

interface IPopUp {
  id?: string;
  shippingDetailLoad?: IShippingDetail;
}

const GeneralDetail: FC<IPopUp> = ({ id, shippingDetailLoad = null }) => {
  const [shippingDetail, setShippingDetail] = useState<IShippingDetail>(shippingDetailLoad);
  const { setIsLoading, isLoading, setHasErrors } = useContext(ModalContext);

  const { isFetching, isError } = useQuery(['shipping-detail'], () => getShippingById(id), {
    retry: 3,
    retryDelay: 5 * 1000,
    enabled: !shippingDetailLoad,
    onSuccess: data => setShippingDetail(data)
  });

  useEffect(() => setIsLoading(isFetching), [isFetching]);

  useEffect(() => {
    if (isError) {
      setHasErrors(true);
    }
  }, [isError]);

  useEffect(() => {
    registerFonts();
  }, []);

  const document = useMemo(() => shippingDetail && <PDFDownload shippingDetail={shippingDetail} />, [shippingDetail]);
  const [_, updateInstance] = usePDF({ document });
  useEffect(() => updateInstance(), [document]);

  // const handleDelete = () => {
  //   setInfoModal({
  //     onPrimary: null,
  //     primaryText: '',
  //     children: <DeletePublication shipingDetail={shippingDetail} id={id} />,
  //     title: '¿Desea eliminar la publicacion?',
  //     size: 'md',
  //     alignment: 'center'
  //   });
  // };

  return (
    <Wrapper>
      {shippingDetail && !isLoading && (
        <>
          <PDFView shippingDetail={shippingDetail} />
          <Division />
          <BlobProvider document={document}>
            {({ blob, url, loading, error }) => {
              const pdfFile = blob && blobToFile(blob, `comprobante_${id}.pdf`);
              return (
                <ButtonsWrapper direction={shippingDetail.signers ? 'space-between' : 'flex-start'}>
                  <div style={{ display: 'flex' }}>
                    <Button
                      data-testid="btn-download"
                      text={(loading && 'Cargando') || (error && 'Error') || 'Descargar'}
                      disabled={loading || error}
                      variant="primary"
                      onClick={() => downloadFiles(pdfFile)}
                      icon={{
                        position: 'left',
                        icon: 'bc-070',
                        size: '24px'
                      }}
                    />
                    <PrintButton data-testid="print-test" href={url} target="_blank">
                      <Icon icon="bd-510" size="24px" />
                      <span>{(loading && 'Cargando') || (error && 'Error') || 'Imprimir'}</span>
                    </PrintButton>
                  </div>
                  {/* {shippingDetail.signers && (
                  <DeleteButton data-testid="delete-test" onClick={handleDelete}>
                    <span>Eliminar publicacion</span>
                    <Icon icon="bc-430" size="24px" />
                  </DeleteButton>
                )} */}
                </ButtonsWrapper>
              );
            }}
          </BlobProvider>
        </>
      )}
    </Wrapper>
  );
};
export default GeneralDetail;
