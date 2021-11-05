import React, { Dispatch, FC, SetStateAction, useState, useEffect, useContext } from 'react';
import Button from '@santander/everest-ui/lib/Button';
import { FiltersContainer, FieldContainer, ActionsContainer } from './styles';
import InputSelector from './InputSelector';
import useInterceptor from '../../../utils/hooks/useInterceptor';
import { ContainerP, ContainerTitle } from '../../../styles/general';
import filterValidator from '../../../utils/formUtils/filterValidator';
import { AppContext } from '../../../contexts/AppContext';
import Spinner from '../Spinner';

export interface IFilterObject {
  [key: string]: Record<string, any>;
}

interface IFieldsInterceptor {
  [field: string]: (
    value: Record<string, any>,
    oldValue: Record<string, any>,
    values: IFilterObject
  ) => Record<string, any>;
}

interface FilterProps {
  isMobile?: boolean;
  filterMobile?: boolean;
  setfilterMobile?: Dispatch<SetStateAction<boolean>>;
  filtersObject: IFilterObject;
  onApplyFilters: (a: IFilterObject) => void;
  fieldsInterceptor?: IFieldsInterceptor;
  showAdvancedOptions?: boolean;
}

const Filters: FC<FilterProps> = ({
  isMobile = false,
  filterMobile = false,
  setfilterMobile,
  filtersObject,
  onApplyFilters,
  fieldsInterceptor = {},
  showAdvancedOptions = true
}) => {
  const { isLoading } = useContext(AppContext);
  const [isCollapseOpen, setIsCollapseOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState(filtersObject);
  const setInterceptorFilter = useInterceptor({
    fields: fieldsInterceptor,
    setValues: setFilters,
    values: filters
  });

  useEffect(() => {
    setFilters(filtersObject);
  }, [filtersObject]);

  const handleFilters = () => {
    const newFilters = filterValidator.validateAllFields(filters);
    setFilters(newFilters);
    if (!filterValidator.fieldsHasErrors(newFilters)) {
      onApplyFilters(filters);
      if (setfilterMobile) {
        setfilterMobile(false);
      }
    }
  };

  return (
    (!isMobile || (isMobile && filterMobile)) && (
      <>
        <FiltersContainer>
          <div style={{ flexBasis: '100%' }}>
            <ContainerTitle isMobile={isMobile} data-testid="title">
              Completá estos datos para iniciar tu consulta
            </ContainerTitle>
            <ContainerP isMobile={isMobile}>
              Podés usar todos los filtros que quieras para mejorar tu búsqueda
            </ContainerP>
          </div>
          {Object.keys(filters).map(
            el =>
              !(filters[el].defaultHidden && !isCollapseOpen) && (
                <FieldContainer isMobile={isMobile} width={filters[el].width} key={el}>
                  {InputSelector(filters[el], setInterceptorFilter)}
                </FieldContainer>
              )
          )}
          <ActionsContainer isMobile={isMobile}>
            <Button
              className="pub-debt-btn-apply"
              data-testid="btn-aplicar"
              variant={isMobile ? 'primary' : 'secondary'}
              size="medium"
              onClick={() => handleFilters()}
              text="Aplicar"
            />
          </ActionsContainer>
        </FiltersContainer>
        <FiltersContainer isMobile={isMobile}>
          <ActionsContainer isMobile={isMobile} style={{ marginTop: '0' }}>
            {showAdvancedOptions && (
              <Button
                className="pub-debt-btn-no-border"
                variant={'secondary'}
                onClick={() => setIsCollapseOpen(prev => !prev)}
                text={isCollapseOpen ? 'Ocultar opciones de búsqueda avanzada' : 'Ver opciones de búsqueda avanzada'}
              />
            )}
          </ActionsContainer>
        </FiltersContainer>
        {isMobile && isLoading && <Spinner data-testid="spinnner-test" loading={true} color="#ec0000" size={36} />}
      </>
    )
  );
};

export default Filters;
