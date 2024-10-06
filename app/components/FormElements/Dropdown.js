/* eslint-disable react/prop-types */
import { reactIcons } from '@utils/icons';
import React, { useEffect, useRef, useState } from 'react';

const Dropdown = ({
  optionArr,
  parentClassName,
  headerClassName,
  headerButtonEl,
  headerIconClassName,
  optionWrapperClassName,
  optionClassName,
  errMsg = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);

  return (
    <div className={`relative ${parentClassName}`}>
      <div
        className={`flex items-center gap-1 justify-between cursor-pointer border px-3 py-1 text-16 bg-white ${headerClassName}`}
        onClick={() => setIsOpen(!isOpen)}
        ref={ref}
      >
        {headerButtonEl || (
          <div className="select-none font-medium text-gray-700">Dropdown</div>
        )}
        <span className={`text-gray-400 text-20 ${headerIconClassName}`}>
          {reactIcons.chevronDown}
        </span>
      </div>

      {/* Options */}

      {isOpen && (
        <ul
          className={`bg-white shadow-md absolute top-10 min-w-[130px] right-0 w-full z-50 py-2 ${optionWrapperClassName}`}
        >
          {optionArr.map((item, index) => (
            <li
              key={index}
              className={`text-16 cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-primary-200 hover:text-white ${optionClassName}`}
              onClick={() => {
                item.onClick(item.value);
                setIsOpen(false);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}

      {errMsg && (
        <p className="text-red-500 text-14 mt-[2px] text-left">{errMsg}</p>
      )}
    </div>
  );
};

export default Dropdown;
