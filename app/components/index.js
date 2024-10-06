import React from 'react';
import loadable from '@utils/loadable';
import Loading from './Loading';

// Loading - No need to lazy load this component
export { default as Loading } from './Loading';
export { default as HandleSwitch } from './FormElements/HandleSwitch';
export { default as Editor } from './FormElements/Editor';

// Layout
export const Footer = loadable(() => import('./Footer'), {
  fallback: <Loading />,
});

export const Navbar = loadable(() => import('./Navbar'), {
  fallback: <Loading />,
});

export const Sidebar = loadable(() => import('./Sidebar'), {
  fallback: <Loading />,
});

// Form Elements
export const CustomDatePicker = loadable(
  () => import('./FormElements/CustomDatePicker'),
  {
    fallback: <Loading />,
  },
);

export const DateRangePicker = loadable(
  () => import('./FormElements/DateRangePicker'),
  {
    fallback: <Loading />,
  },
);

export const ReactSelect = loadable(
  () => import('./FormElements/ReactSelect'),
  {
    fallback: <Loading />,
  },
);

export const Select = loadable(() => import('./FormElements/SelectBox'), {
  fallback: <Loading />,
});

// Forms
export const Login = loadable(() => import('./Auth/Login'), {
  fallback: <Loading />,
});

export const Register = loadable(() => import('./Auth/Register'), {
  fallback: <Loading />,
});

export const ForgotPassword = loadable(() => import('./Auth/ForgotPassword'), {
  fallback: <Loading />,
});

// Common
export const Loader = loadable(() => import('./Loader'), {
  fallback: <Loading />,
});

export const Pagination = loadable(() => import('./Pagination'), {
  fallback: <Loading />,
});

export const PageHeader = loadable(() => import('./PageHeader'), {
  fallback: <Loading />,
});

export const DashboardCard = loadable(() => import('./DashboardCard'), {
  fallback: <Loading />,
});

export const ActionButton = loadable(() => import('./ActionButton'), {
  fallback: <Loading />,
});

//FOrm Elements
export const InputField = loadable(() => import('./FormElements/InputField'), {
  fallback: <Loading />,
});

export const CurrencyInputField = loadable(
  () => import('./FormElements/CurrencyInputField'),
  {
    fallback: <Loading />,
  },
);
export const SelectBox = loadable(() => import('./FormElements/SelectBox'), {
  fallback: <Loading />,
});
export const TextField = loadable(() => import('./FormElements/TextField'), {
  fallback: <Loading />,
});

// Modals

export const AddBankAccount = loadable(
  () => import('./Modals/AddBankAccount'),
  {
    fallback: <Loading />,
  },
);

export const AddUpi = loadable(() => import('./Modals/AddUpi'), {
  fallback: <Loading />,
});

export const AddAgentBankAccount = loadable(
  () => import('./Modals/AddAgentBankAccount'),
  {
    fallback: <Loading />,
  },
);

export const AddAgentUpi = loadable(() => import('./Modals/AddAgentUpi'), {
  fallback: <Loading />,
});

export const AddWiningNumber = loadable(
  () => import('./Modals/AddWiningNumber'),
  {
    fallback: <Loading />,
  },
);

export const Balance = loadable(() => import('./Modals/Balance'), {
  fallback: <Loading />,
});

export const WithdrawReject = loadable(
  () => import('./Modals/WithdrawReject'),
  {
    fallback: <Loading />,
  },
);

export const AgentUserBalance = loadable(
  () => import('./Modals/AgentUserBalance'),
  {
    fallback: <Loading />,
  },
);

export const AgentBalanceWithdraw = loadable(
  () => import('./Modals/AgentBalanceWithdraw'),
  {
    fallback: <Loading />,
  },
);

export const ApexChart = loadable(() => import('./Charts/ApexChart'), {
  fallback: <Loading />,
});

export const PieChart = loadable(() => import('./Charts/PieChart'), {
  fallback: <Loading />,
});

export const Donut = loadable(() => import('./Charts/Donut'), {
  fallback: <Loading />,
});

export const AddBanner = loadable(() => import('./Modals/AddBanner'), {
  fallback: <Loading />,
});
export const UserDetails = loadable(() => import('./PopUp/UserDetails'), {
  fallback: <Loading />,
});
