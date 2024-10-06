// /* eslint-disable react/prop-types */
// import { reactIcons } from '@utils/icons';
// import React from 'react';

// const SelectBox = ({
//   name,
//   className,
//   value,
//   onChange,
//   wrapperClassName,
//   errMsg,
//   required,
//   label,
//   labelClassName,
//   firstOption,
//   optionArr,
//   optionClassName,
//   iconClassName,
// }) => {
//   return (
//     <div className={`mb-3 relative ${wrapperClassName}`}>
//       {label && (
//         <label
//           className={`relative block font-medium text-primary-100-black-2 mb-[5px] text-14 ${labelClassName}`}
//         >
//           {label}
//           {required && (
//             <span className="text-red-500 text-14 font-bold"> * </span>
//           )}
//         </label>
//       )}
//       <select
//         name={name || ''}
//         className={`appearance-none border-[1px]  block w-full px-3 py-3 text-14 leading-4 border-primary-200 bg-transparent pr-7 ${className}`}
//         value={value}
//         onChange={onChange}
//       >
//         {firstOption && firstOption}
//         {optionArr?.map((item, index) => (
//           <option
//             className={`${optionClassName || ''}`}
//             key={index}
//             value={item.name}
//           >
//             {item.name}
//           </option>
//         ))}
//       </select>
//       <span
//         className={`text-white absolute top-[32px] text-20 right-2 ${iconClassName}`}
//       >
//         {reactIcons.chevronDown}
//       </span>
//       {errMsg && <p className="text-red-500 text-14 mt-[2px]">{errMsg}</p>}
//     </div>
//   );
// };

// export default SelectBox;

/* eslint-disable react/prop-types */
import { reactIcons } from '@utils/icons';
import React from 'react';

const SelectBox = ({
  name,
  className,
  value,
  onChange,
  wrapperClassName,
  errMsg,
  required,
  label,
  labelClassName,
  firstOption,
  optionArr,
  optionClassName,
  iconClassName,
}) => {
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue); // Pass only the value
  };

  return (
    <div className={`mb-3 relative ${wrapperClassName}`}>
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
      <select
        name={name || ''}
        className={`appearance-none border-[1px]  block w-full px-3 py-3 text-14 leading-4 border-primary-200 bg-transparent pr-7 ${className}`}
        value={value}
        onChange={handleSelectChange} // Use the new handler
      >
        {firstOption && firstOption}
        {optionArr?.map((item, index) => (
          <option
            className={`${optionClassName || ''}`}
            key={index}
            value={item.value}
          >
            {item.name}
          </option>
        ))}
      </select>
      <span
        className={`text-white absolute top-[32px] text-20 right-2 ${iconClassName}`}
      >
        {reactIcons.chevronDown}
      </span>
      <div className="!text-start">
        {errMsg && <p className="text-red-500 text-14 ">{errMsg}</p>}
      </div>
    </div>
  );
};

export default SelectBox;
