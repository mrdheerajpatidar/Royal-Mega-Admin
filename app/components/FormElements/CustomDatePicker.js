/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import { reactIcons } from '../../utils/icons';
import moment from 'moment';
const CustomDatePicker = ({
  error,
  className,
  date,
  handleDate,
  dateFormat = 'dd/mm/yyyy',
  minDate,
  allowSameDay,
  value,
  placeholder,
}) => {
  let initialVal = value;
  let text = placeholder || 'Select Date';
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      type="button"
      className="flex justify-between w-full pr-8"
      onClick={onClick}
      ref={ref}
    >
      {initialVal == '' ? text : value}
    </button>
  ));
  return (
    <div className="">
      <div
        className={`flex items-center px-4 border relative rounded-md h-[42px] date-sm w-full ${
          error ? ' border-red-500 ' : 'border-primary-200'
        } ${className}`}
      >
        <ReactDatePicker
          allowSameDay={allowSameDay || false}
          onChange={(date) => {
            handleDate(date);
          }}
          minDate={minDate || null}
          selected={date || new Date()}
          dateFormat={dateFormat}
          showPopperArrow={false}
          popperModifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 5],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                rootBoundary: 'viewport',
                tether: false,
                altAxis: true,
              },
            },
          ]}
          customInput={<CustomInput />}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex justify-between items-center gap-6 px-2 py-1">
              <button
                type="button"
                className="flex justify-center items-center w-9 h-9 bg-primary-300 rounded-full text-16 text-white"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {reactIcons.chevronLeft}
              </button>
              <div>
                <h6 className="text-16 font-semibold leading-[1]">
                  {moment(date).format('MMMM')}
                </h6>
              </div>

              <button
                type="button"
                className="flex justify-center items-center w-9 h-9 bg-primary-300 rounded-full text-16 text-white"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {reactIcons.chevronRight}
              </button>
            </div>
          )}
        />
        <span className="ay-center  z-[3]  text-white text-18 right-2">
          {reactIcons.chevronDown}
        </span>
      </div>
      {error && <div className="text-12 text-red-500 font-medium">{error}</div>}
    </div>
  );
};
CustomDatePicker.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  dateFormat: PropTypes.string,
  date: PropTypes.any,
  icon: PropTypes.bool,
  isCustomIcon: PropTypes.bool,
  handleDate: PropTypes.func,
  handleCustomIcon: PropTypes.func,
};
export default CustomDatePicker;
