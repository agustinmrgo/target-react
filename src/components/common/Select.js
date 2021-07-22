import React from 'react';
import { arrayOf, bool, func, shape, string, number, oneOfType } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ReactSelect from 'react-select';
import { parseInputErrors } from 'utils/helpers';
import { black, white } from '../../constants/colors';

const customStyles = {
  container: provided => ({ ...provided, marginTop: '0.5rem' }),
  menu: provided => ({
    ...provided,
    border: `1px solid ${black}`,
    borderRadius: 0,
    padding: 0
  }),
  menuList: provided => ({ ...provided, padding: 0 }),
  control: provided => ({
    ...provided,
    border: `1px solid ${black}`,
    borderRadius: 0
  }),
  singleValue: provided => ({
    ...provided,
    fontSize: '1.1rem',
    letterSpacing: '0.07rem',
    textAlign: 'center',
    fontWeight: 600
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '1.3rem',
    letterSpacing: '0.195rem',
    color: state.isSelected ? white : black,
    backgroundColor: state.isSelected ? black : white,
    padding: '0.5rem'
  }),
  placeholder: provided => ({
    ...provided,
    color: black,
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.165rem'
  })
};

const Select = ({
  label,
  name,
  options,
  onChange,
  placeholder,
  errors,
  active,
  touched,
  ...props
}) => (
  <>
    {label && <label htmlFor={name}>{label}</label>}
    <div>
      <ReactSelect
        name={name}
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
      {touched && errors && (
        <span className="span-error">
          <FormattedMessage
            id={parseInputErrors(errors)}
            defaultMessage={parseInputErrors(errors)}
          />
        </span>
      )}
    </div>
  </>
);

Select.propTypes = {
  name: string.isRequired,
  label: string,
  onChange: func.isRequired,
  placeholder: string,
  errors: arrayOf(string),
  options: arrayOf(shape({ value: oneOfType([string, number]), label: string })),
  active: bool.isRequired,
  touched: bool.isRequired
};

export default Select;
