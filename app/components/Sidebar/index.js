import { reactIcons } from '@utils/icons';
import React, { useContext, useState } from 'react';
import { agentLinks, links } from '@utils/constants';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@hooks';
import { toast } from 'react-toastify';
import { Loader } from '@components';
import PropTypes from 'prop-types';
import { LayoutContext } from '@contexts';

const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { openSidebar, setOpenSidebar } = useContext(LayoutContext);
  const LoginType = localStorage.getItem('loginType');

  const sidebarHandler = () => {
    setOpenSidebar((prev) => !prev);
  };

  const { logout } = useAuth();

  const logoutHandler = async () => {
    try {
      setIsLoading(true);

      const response = await logout();
      if (response.error) {
        toast.error(response.error, { toastId: 22 });
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <aside
        className={
          'sidebar bg-secondary h-full overflow-x-hidden overflow-y-auto w-full border-r'
        }
      >
        <div className="relative h-full">
          <div
            className="w-[17px] h-[22px] cursor-pointer bg-gradient-2 text-secondary place-content-center absolute top-[10px] right-0 rounded-tl-5 rounded-bl-5 hidden sm:grid"
            onClick={sidebarHandler}
          >
            {openSidebar ? (
              <span className="text-18 text-secondary">
                {reactIcons.chevronLeft}
              </span>
            ) : (
              <span className="text-18 text-secondary">
                {reactIcons.chevronRight}
              </span>
            )}
          </div>
          {LoginType == 'admin' ? (
            <div className="sidebar-content relative top-0 sm:top-[60px] h-[calc(100vh-125px)] sm:h-[calc(100vh-200px)] overflow-y-auto py-1 sm:py-0">
              {links.map((menu, ind) => (
                <NavLink
                  to={menu.path}
                  key={ind}
                  className={({ isActive }) =>
                    `grid place-content-center sm:place-content-start sm:flex sm:items-center gap-3 sm:py-2 sm:px-3 hover:bg-gradient-2  hover:md:rounded-lg mb-1 w-[42px] h-[42px] sm:w-auto sm:h-auto p-0 pt-[10px] sm:pt-2 mx-auto sm:mx-1 text-white transition-none duration-0 hover:text-secondary text-14 ${
                      isActive &&
                      'bg-gradient-2 !text-secondary font-semibold rounded-lg'
                    } ${
                      !openSidebar &&
                      'grid !place-content-center !pt-0 sm:!pt-2'
                    }`
                  }
                >
                  <span className="text-18 ">{menu.icons}</span>
                  <div
                    className={`transition-all duration-300 ${
                      openSidebar ? 'block' : 'hidden'
                    }`}
                  >
                    <div className=" font-smi-bold hidden sm:block">
                      {menu.title}
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          ) : (
            <div className="sidebar-content relative top-0 sm:top-[60px] h-[calc(100vh-125px)] sm:h-[calc(100vh-200px)] overflow-y-auto py-1 sm:py-0">
              {agentLinks.map((menu, ind) => (
                <NavLink
                  to={menu.path}
                  key={ind}
                  className={({ isActive }) =>
                    `grid place-content-center sm:place-content-start sm:flex sm:items-center gap-3 sm:py-2 sm:px-3 hover:bg-gradient-2  hover:md:rounded-lg mb-1 w-[42px] h-[42px] sm:w-auto sm:h-auto p-0 pt-[10px] sm:pt-2 mx-auto sm:mx-1 text-white transition-none duration-0 hover:text-secondary text-14 ${
                      isActive &&
                      'bg-gradient-2 !text-secondary font-semibold rounded-lg'
                    } ${
                      !openSidebar &&
                      'grid !place-content-center !pt-0 sm:!pt-2'
                    }`
                  }
                >
                  <span className="text-18 ">{menu.icons}</span>
                  <div
                    className={`transition-all duration-300 ${
                      openSidebar ? 'block' : 'hidden'
                    }`}
                  >
                    <div className=" font-smi-bold hidden sm:block">
                      {menu.title}
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          )}

          <div className="border-t py-2 absolute bottom-0 left-0 w-full bg-secondary">
            <div
              className={`grid place-content-center sm:place-content-start sm:flex sm:items-center gap-3 sm:py-2 sm:px-3 hover:bg-gradient-1 cursor-pointer hover:md:rounded-lg mb-1 w-[42px] h-[42px] sm:w-auto sm:h-auto p-0 pt-[10px] sm:pt-2 mx-auto sm:mx-1 rounded-lg ${
                !openSidebar && '!pt-0 sm:!pt-2'
              }`}
              onClick={logoutHandler}
            >
              <span className="text-18 text-white">{reactIcons.logout}</span>
              <div
                className={`transition-all duration-300 ${
                  openSidebar ? 'block' : 'hidden'
                }`}
              >
                <div className="text-white font-smi-bold hidden sm:block">
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  sidebarStatusHandler: PropTypes.bool,
};

export default Sidebar;
