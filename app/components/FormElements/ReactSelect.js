import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { reactIcons } from '@utils/icons';

const ReactSelect = ({
  placeholder,
  options,
  style,
  errMsg,
  maxMenuHeight,
  label,
  labelClassName,
  borderColor,
  bgColor,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <div className="flex items-center justify-between">
          <label className={`${labelClassName || 'label-sm'}`} htmlFor={label}>
            {label}
          </label>
        </div>
      )}
      <div className="relative w-full">
        <Select
          defaultValue={{ label: placeholder, value: null }}
          options={options}
          className="basic-multi-select"
          classNamePrefix="react-select"
          selectProps="any"
          styles={styles(style, borderColor, bgColor)}
          maxMenuHeight={maxMenuHeight ? 200 : 400}
          isOptionDisabled={(option) => option.disabled}
          {...rest}
        />
        <span className="ay-center z-[3] pointer-events-none text-white text-18 right-2 absolute top-3">
          {reactIcons.chevronDown}
        </span>
      </div>
      {errMsg && (
        <div className="text-12 text-red-500 font-medium">{errMsg}</div>
      )}
    </div>
  );
};

ReactSelect.propTypes = {
  options: PropTypes.array.isRequired,
  style: PropTypes.object,
  maxMenuHeight: PropTypes.bool,
  labelClassName: PropTypes.string,
  label: PropTypes.string,
  errMsg: PropTypes.string,
  borderColor: PropTypes.string,
  bgColor: PropTypes.string,
  placeholder: PropTypes.string,
};

const styles = (style, borderColor, bgColor) => {
  return {
    control: (base) => ({
      ...base,
      border: !style?.borderNone ? `1px solid ${borderColor}` : 0,
      padding: 0,
      paddingLeft: style?.paddingLeft || '0',
      paddingRight: style?.paddingRight || '16px',
      background: style?.background || 'transparent',
      color: '#fff',
      outline: 'none',
      borderRadius: style?.borderRadius || '8px',
      height: style?.height || '42px',
      width: '100%',
      boxShadow: 'none',
      '&:hover': {
        border: !style?.borderNone ? `1px solid ${borderColor}` : 0,
      },
      '&:focus': {
        border: !style?.borderNone ? `1px solid ${borderColor}` : 0,
      },
    }),
    menuList: (styles) => ({
      ...styles,
      background: '#fff',
      color: 'white',
      padding: 0,
      borderRadius: '4px',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      display: 'none',
    }),
    placeholder: (styles) => ({
      ...styles,
      color: '#fff',
    }),
    singleValue: (styles) => ({
      ...styles,
      color: '#fff',
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      display: 'none',
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      display: 'none',
    }),
    option: (styles, { isSelected, isDisabled }) => ({
      ...styles,
      cursor: 'pointer',
      color: isSelected ? '#000' : '#000',
      background: isSelected ? bgColor : '#fff',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? '#E9BC66'
            : '#E9BC66'
          : undefined,
        color: !isDisabled ? (isSelected ? '#000' : '#000') : undefined,
      },
      ':hover': {
        ...styles,
        background: '#E9BC66',
      },
      zIndex: 1,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
      background: '#fff',
    }),
  };
};

export default ReactSelect;
