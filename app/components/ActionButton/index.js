import { Menu } from '@headlessui/react';
import React from 'react';
import { reactIcons } from '../../utils/icons';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
import { createPortal } from 'react-dom';

const ActionButton = ({ option, clickHandler = null }) => {
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    strategy: 'fixed',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5],
        },
      },
    ],
  });

  return (
    <Menu as="div" className="relative inline-block  text-left">
      <div>
        <Menu.Button
          ref={setReferenceElement}
          className="w-10 h-10 flex-center hover:bg-black hover:bg-opacity-20 rounded-md text-18 grid place-content-center"
          onClick={clickHandler}
        >
          {reactIcons.menu}
        </Menu.Button>
      </div>
      {createPortal(
        <Menu.Items
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className="z-[10] mt-2 w-44 divide-y border-none divide-zinc-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="px-1 py-1  bg-white rounded-md border border-primary-200">
            {option?.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={() => item.onClick()}
                    className={`${
                      active
                        ? 'bg-primary-100 text-white border border-primary-200'
                        : 'text-black border border-transparent'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>,
        document.querySelector('#popper'),
      )}
    </Menu>
  );
};
ActionButton.propTypes = {
  option: PropTypes.array,
  clickHandler: PropTypes.func,
};
export default ActionButton;
