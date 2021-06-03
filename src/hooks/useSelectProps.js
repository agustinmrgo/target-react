import { useCallback } from 'react';

export default (
  handleValueChange, // callback for when the value changes
  handleFocus, // callback after focus
  handleBlur, // callback after blur
  values, // all values, it returns the correct one given the key
  errors, // all errors, it returns the correct one given the key
  activeFields, // all fields active state, it returns the correct one given the key
  touchedFields // all fields touched state, it returns the correct one given the key
) =>
  useCallback(
    fieldKey => ({
      errors: errors[fieldKey],
      // Is currently active?
      active: activeFields[fieldKey] || false,
      // Has been touched?
      touched: touchedFields[fieldKey] || false,
      onChange: ({ value }, isInitialSetup) => handleValueChange(fieldKey, value, isInitialSetup),
      onFocus: () => handleFocus(fieldKey),
      onBlur: () => handleBlur(fieldKey)
    }),
    [handleFocus, handleBlur, handleValueChange, errors, activeFields, touchedFields]
  );
