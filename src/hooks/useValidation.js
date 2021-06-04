import { useCallback } from 'react';
import validate from '@rootstrap/validate';

validate.validators.presence.options = { allowEmpty: false };

export const useValidation = (constraints, options = { fullMessages: false }) =>
  useCallback(values => validate(values, constraints, options), [constraints, options]);
