/* eslint-disable react/prop-types */
import React from 'react';

const TextField = ({
  label,
  type,
  onChange,
  onBlur,
  placeholder,
  name,
  autoComplete,
  labelClassName,
  className,
  wrapperClassName,
  errMsg,
  required,
  addonLeft,
  addonRight,
  value,
  maxLength,
}) => {
  return (
    <div className={`mb-3 ${wrapperClassName || ''}`}>
      {label && (
        <label
          className={`relative block font-medium text-primary-100-black-2 mb-[5px] text-14 ${labelClassName}`}
        >
          {label}
          {required && (
            <span className="text-red-500 text-14 font-bold"> * </span>
          )}
        </label>
      )}
      <div className="relative">
        {addonLeft && <div>{addonLeft}</div>}
        <textarea
          value={value}
          type={type || 'text'}
          onChange={onChange || null}
          placeholder={placeholder || ''}
          name={name || ''}
          onBlur={onBlur}
          autoComplete={autoComplete || false}
          maxLength={maxLength || 200}
          className={`border-[1px] rounded-lg block !focus:border-primary-200 ring-0 resize-none w-full px-3 py-3 text-14 leading-4 border-primary-200 outline-none  ${className} `}
        />
        {addonRight && <div>{addonRight}</div>}
      </div>
      {errMsg && <p className="text-red-500 text-14 mt-[2px]">{errMsg}</p>}
    </div>
  );
};

export default TextField;
