import React from 'react';
import { Switch } from '@headlessui/react';
import PropTypes from 'prop-types';

const HandleSwitch = ({ id, onChange = null, isChecked }) => {
  return (
    <Switch
      checked={isChecked}
      onChange={onChange}
      id={id}
      className={`${isChecked ? 'bg-primary-300' : 'bg-[#C2C2C2]'}
          relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${isChecked ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
};
HandleSwitch.propTypes = {
  isChecked: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func,
};
export default HandleSwitch;
