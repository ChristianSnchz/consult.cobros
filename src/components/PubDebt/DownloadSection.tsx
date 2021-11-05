import React, { FC, useContext, useState } from 'react';
import { useLocation } from 'react-router';
import { useAnalytics } from '@santander/analytics-empresas';
import { downloadPubDebts } from '../../services/pubDebtService';
import {
  DownloadButton,
  DownloadButtons,
  DownloadContainer,
  DownloadIcon,
  DownloadInfo,
  DownloadLabel
} from './styled';
import { PubDebtContext } from '../../contexts/PubDebContext';

interface DownloadSectionProps {
  isMobile?: boolean;
  hasData?: boolean;
}

const DOWNLOAD_TYPES = {
  NONE: 'NONE',
  TABLE: 'TABLE',
  AGREEMENTS: 'AGREEMENTS'
};

const DownloadSection: FC<DownloadSectionProps> = ({ isMobile, hasData }) => {
  const [downloading, setDownloading] = useState<string>(DOWNLOAD_TYPES.NONE);
  const { pathname } = useLocation();
  const { triggerEvent } = useAnalytics({ url: pathname });
  const { params, showDownloadAll } = useContext(PubDebtContext);

  const handleDownloadPubDebt = async () => {
    setDownloading(DOWNLOAD_TYPES.TABLE);
    triggerEvent('Descargas-de-publicacion-deuda-acuerdo', 'click');
    try {
      await downloadPubDebts({ ...params, type: 'all_csv' });
    } finally {
      setDownloading(DOWNLOAD_TYPES.NONE);
    }
  };

  const handleDownloadPubDebtYestarday = async () => {
    setDownloading(DOWNLOAD_TYPES.AGREEMENTS);
    triggerEvent('Descargas-de-publicacion-deuda-tabla', 'click');
    try {
      await downloadPubDebts({ ...params, agreement: showDownloadAll, type: 'yesterday_csv' }, true);
    } finally {
      setDownloading(DOWNLOAD_TYPES.NONE);
    }
  };

  return (
    <>
      {!!showDownloadAll && !isMobile && (
        <DownloadContainer>
          <DownloadInfo>
            <span>¿Necesitás descargar estos datos?</span>
            <span>Podés bajar la deuda publicada para este acuerdo o los datos de la tabla</span>
          </DownloadInfo>
          <DownloadButtons>
            <DownloadButton
              data-testid="btn-download-agreement"
              button="button"
              disabled={downloading === DOWNLOAD_TYPES.AGREEMENTS}
              onClick={() => handleDownloadPubDebtYestarday()}
            >
              <DownloadIcon color="rgba(37,127,164,1)" size="16px" icon="be-280" />
              <DownloadLabel>
                {downloading === DOWNLOAD_TYPES.AGREEMENTS ? 'Descargando...' : 'Descargar acuerdo'}
              </DownloadLabel>
            </DownloadButton>
            {hasData && (
              <DownloadButton
                data-testid="btn-download-table"
                button="button"
                disabled={downloading === DOWNLOAD_TYPES.TABLE}
                onClick={() => handleDownloadPubDebt()}
              >
                <DownloadIcon color="rgba(37,127,164,1)" size="16px" icon="be-280" />
                <DownloadLabel>
                  {downloading === DOWNLOAD_TYPES.TABLE ? 'Descargando...' : 'Descargar datos de tabla'}
                </DownloadLabel>
              </DownloadButton>
            )}
          </DownloadButtons>
        </DownloadContainer>
      )}
    </>
  );
};

export default DownloadSection;
