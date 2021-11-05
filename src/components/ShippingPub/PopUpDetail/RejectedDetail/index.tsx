import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import Button from '@santander/everest-ui/lib/Button';
import Icon from '@santander/everest-ui/lib/Icon';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router';
import { useAnalytics } from '@santander/analytics-empresas';
import { BlobProvider, usePDF } from '@react-pdf/renderer';
import { ButtonsWrapper, Division, PrintButton, Wrapper } from '../../../commons/modalStyles';
import { downloadRejectedShipping, getRejectedShippingById } from '../../../../services/shippingPubService';
import { ModalContext } from '../../../../contexts/ModalContext';
import { IShippingInfo } from '../../../../contexts/ShippingPubContext/interfaces';
import PDFDownload from './PDFDownload';
import PDFView from './PDFView';
import registerFonts from '../../../../utils/registerFontsToPDF';

interface IRejectedDetailProps {
  shippingInfo: IShippingInfo;
}

const RejectedDetail: FC<IRejectedDetailProps> = ({ shippingInfo }) => {
  const { setIsLoading, isLoading, setHasErrors } = useContext(ModalContext);
  const [downloadingFile, setDownloadingFile] = useState<boolean>(false);
  const { pathname } = useLocation();
  const { triggerEvent } = useAnalytics({ url: pathname });

  const {
    data: rejectedShipping,
    isFetching,
    isError
  } = useQuery(['rejected-detail'], () => getRejectedShippingById(shippingInfo.id, { formatType: 'json' }), {
    retry: 3,
    retryDelay: 5 * 1000
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

  const document = useMemo(
    () => rejectedShipping && <PDFDownload shippingInfo={shippingInfo} rejectedShipping={rejectedShipping} />,
    [rejectedShipping]
  );
  const [_, updateInstance] = usePDF({ document });
  useEffect(() => updateInstance(), [document]);

  const downloadShippingDetailFile = async () => {
    try {
      triggerEvent('Descargas-de-archivo-de-rechazos', 'click');
      setDownloadingFile(true);
      await downloadRejectedShipping(shippingInfo.id);
    } finally {
      setDownloadingFile(false);
    }
  };

  return (
    <Wrapper>
      {rejectedShipping && !isLoading && (
        <>
          <PDFView shippingInfo={shippingInfo} rejectedShipping={rejectedShipping} />
          <Division />
          <ButtonsWrapper>
            <Button
              data-testid="btn-download"
              text={downloadingFile ? 'Descargando...' : 'Descargar'}
              disabled={downloadingFile}
              variant="primary"
              onClick={downloadShippingDetailFile}
              icon={{
                position: 'left',
                icon: 'bc-010',
                size: '24px'
              }}
            />
            <BlobProvider document={document}>
              {({ blob, url, loading, error }) => (
                <PrintButton data-testid="print-test" href={url} disabled={loading} target="_blank">
                  <Icon icon="bd-510" size="24px" />
                  <span>{(loading && 'Cargando') || (error && 'Error') || 'Imprimir'}</span>
                </PrintButton>
              )}
            </BlobProvider>
          </ButtonsWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default RejectedDetail;
