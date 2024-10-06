/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const InputField = ({
  label,
  type,
  onChange,
  placeholder,
  name,
  autoComplete = false,
  labelClassName,
  className,
  wrapperClassName,
  errMsg,
  errMsg1,
  required = false,
  addonLeft,
  addonRight,
  value,
  maxLength,
  min,
  disable,
}) => {
  const [readOnly, setReadOnly] = useState(true);
  console.log('value:' + value);

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
        <input
          value={value}
          type={type || 'text'}
          onChange={onChange || null}
          placeholder={placeholder || ''}
          name={name || ''}
          disabled={disable}
          autoComplete={autoComplete ? 'on' : 'off'}
          className={`border-[1px] rounded-lg block w-full px-3 py-3 text-14 leading-4 border-primary-200 text-white ${className}`}
          required={required}
          maxLength={maxLength ? maxLength : type === 'email' ? 135 : 125}
          min={min ? min : 0}
          step={type === 'number' ? 'any' : undefined} // Added step attribute
          onFocus={() => setReadOnly(false)}
          onBlur={() => setReadOnly(true)}
          readOnly={type != 'datetime-local' && readOnly}
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

export default InputField;
