import { Dispatch, SetStateAction } from 'react';
import { obj } from '../types';
import { IFilterObject } from '../../components/commons/FiltersBox';

export interface IUseInterceptor {
  fields: {
    [field: string]: (
      value: Record<string, any>,
      oldValue: Record<string, any>,
      values: IFilterObject
    ) => Record<string, any>;
  };
  setValues: Dispatch<SetStateAction<obj>>;
  values: obj;
}
function useInterceptor({ fields, setValues, values }: IUseInterceptor): Dispatch<SetStateAction<obj>> {
  const func = (newVal: obj | ((prev: obj) => obj)) => {
    if (typeof newVal === 'object') {
      const newValues = newVal;
      Object.keys(fields).forEach(field => {
        if (values[field] !== newVal[field]) {
          const newValue = fields[field](newVal[field], values[field], values);
          if (newVal[field] !== newValue) {
            newValues[field] = newValue;
          }
        }
      });
      return newValues;
    }
    const newValues = newVal(values);
    return func(newValues);
  };
  return (val: obj | ((prev: obj) => obj)) => setValues(func(val));
}
export default useInterceptor;
