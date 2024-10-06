import { reactIcons } from '@/utils/icons';
import React, { useRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PropTypes } from 'prop-types';

const DateRangePicker = ({ changeDateRange, MydateRange }) => {
  // const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = MydateRange;
  const datePickerRef = useRef();
  // [new Date(), new Date()]

  const handleCalendarIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div className="flex items-center px-4 border-[1px] rounded-lg  border-primary-200 relative h-[45px] date-sm w-full">
      <ReactDatePicker
        className=" min-w-[240px] bg-black outline-none  border-none"
        ref={datePickerRef}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        isClearable={true}
        onChange={(update) => {
          changeDateRange(update);
        }}
      />
      <span
        className="absolute text-primary-200 ay-center right-5 text-xl cursor-pointer"
        onClick={handleCalendarIconClick}
      >
        {reactIcons.weeklyCalendar}
      </span>
      {/* <span
        onClick={handleCalendarIconClick}
        className="absolute ay-center right-3 cursor-pointer"
      >
        {reactIcons.shortDownArrow}
      </span> */}
    </div>
  );
};
DateRangePicker.propTypes = {
  changeDateRange: PropTypes.func,
  MydateRange: PropTypes.func,
};
export default DateRangePicker;
