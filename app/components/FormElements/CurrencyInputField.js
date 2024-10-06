/* eslint-disable react/prop-types */
import React from 'react';
import CurrencyInput from 'react-currency-input-field';

const CurrencyInputField = ({
  label,
  onChange,
  onBlur,
  placeholder,
  name,
  labelClassName,
  className,
  wrapperClassName,
  errMsg,
  errMsg1,
  required = false,
  addonLeft,
  addonRight,
  value,
}) => {
  return (
    <div className={`mb-3 ${wrapperClassName || ''}`}>
      {label && (
        <label
          className={`relative block font-medium text-white mb-[5px] text-14 ${labelClassName}`}
        >
          {label}
          {required && (
            <span className="text-red-500 text-14 font-bold"> * </span>
          )}
        </label>
      )}
      <div className="relative">
        {addonLeft && <div>{addonLeft}</div>}
        <CurrencyInput
          value={value}
          // intlConfig={{ locale: 'en-IN' }}
          onValueChange={onChange || null}
          placeholder={placeholder || ''}
          name={name || ''}
          onBlur={onBlur}
          allowDecimals={false}
          intlConfig={{ locale: 'en-IN', currency: 'INR' }}
          className={`border-[1px] rounded-lg block w-full px-3 py-3 text-14 leading-4 border-primary-200 text-white ${className}`}
        />
        {addonRight && <div>{addonRight}</div>}
      </div>
      {errMsg1 && (
        <p className="text-red-500 text-14 mt-[2px] text-left">{errMsg1}</p>
      )}
      {errMsg && (
        <p className="text-red-500 text-14 mt-[2px] text-left">{errMsg}</p>
      )}
    </div>
  );
};

export default CurrencyInputField;
