import React from 'react';
import { Loading } from '@components';
import loadable from '@utils/loadable';

// Layouts
export const DashboardLayout = loadable(
  () => import('./Layouts/DashboardLayout'),
  {
    fallback: <Loading />,
  },
);
export const OuterLayout = loadable(() => import('./Layouts/OuterLayout'), {
  fallback: <Loading />,
});

// Auth Routes START
export const Login = loadable(() => import('../components/Auth/Login'), {
  fallback: <Loading />,
});
export const Register = loadable(() => import('../components/Auth/Register'), {
  fallback: <Loading />,
});

export const ForgotPassword = loadable(
  () => import('../components/Auth/ForgotPassword'),
  {
    fallback: <Loading />,
  },
);
// Auth Routes END

export const NotFound = loadable(() => import('./NotFound'), {
  fallback: <Loading />,
});

// Dashboard START
export const Dashboard = loadable(() => import('./Dashboard'), {
  fallback: <Loading />,
});
export const Home = loadable(() => import('./Home'), {
  fallback: <Loading />,
});

export const AgentHome = loadable(() => import('./AgentHome'), {
  fallback: <Loading />,
});

export const ChangePassword = loadable(() => import('./ChangePassword'), {
  fallback: <Loading />,
});

export const FirstLoginPasswordChange = loadable(
  () => import('./FirstLoginPasswordChange'),
  {
    fallback: <Loading />,
  },
);

export const AgentSetting = loadable(() => import('./AgentSetting'), {
  fallback: <Loading />,
});

// Agents
export const Agents = loadable(() => import('./Agents'), {
  fallback: <Loading />,
});
export const AddAgent = loadable(() => import('./Agents/AddAgent'), {
  fallback: <Loading />,
});

// Users
export const Users = loadable(() => import('./Users'), {
  fallback: <Loading />,
});
export const AddUser = loadable(() => import('./Users/AddUser'), {
  fallback: <Loading />,
});

// Agent Users
export const AgentUsers = loadable(() => import('./AgentUsers'), {
  fallback: <Loading />,
});
export const AddAgentUser = loadable(
  () => import('./AgentUsers/AddAgentUser'),
  {
    fallback: <Loading />,
  },
);

// Agent Users
export const AgentBankAccount = loadable(() => import('./AgentBankAccount'), {
  fallback: <Loading />,
});

// Agent Bet History
export const AgentBetHistory = loadable(() => import('./AgentBetHistory'), {
  fallback: <Loading />,
});

// PowerBall
export const PowerBall = loadable(() => import('./PowerBall'), {
  fallback: <Loading />,
});

export const AddPowrBallDraw = loadable(
  () => import('./PowerBall/AddPowrBallDraw'),
  {
    fallback: <Loading />,
  },
);

export const EditPowerBallDraw = loadable(
  () => import('./PowerBall/EditPowerBallDraw'),
  {
    fallback: <Loading />,
  },
);

// Blog
export const Blog = loadable(() => import('./Blog'), {
  fallback: <Loading />,
});

export const AddBLog = loadable(() => import('./Blog/AddBLog'), {
  fallback: <Loading />,
});

export const EditBlog = loadable(() => import('./Blog/EditBlog'), {
  fallback: <Loading />,
});

// Lottri
export const Lottri = loadable(() => import('./Lottri'), {
  fallback: <Loading />,
});

export const AddLottriDraw = loadable(() => import('./Lottri/AddLottriDraw'), {
  fallback: <Loading />,
});

export const EditLotteriDraw = loadable(
  () => import('./Lottri/EditLotteriDraw'),
  {
    fallback: <Loading />,
  },
);

export const Transactions = loadable(() => import('./Transactions'), {
  fallback: <Loading />,
});
export const AgentTransactons = loadable(
  () => import('./Transactions/AgentTransactons'),
  {
    fallback: <Loading />,
  },
);

export const SettingConfiguration = loadable(
  () => import('./SettingConfiguration'),
  {
    fallback: <Loading />,
  },
);

export const SoldedTicket = loadable(() => import('./SoldedTicket'), {
  fallback: <Loading />,
});
export const SoldedTicketUsers = loadable(
  () => import('./SoldedTicket/SoldedTicketUsers'),
  {
    fallback: <Loading />,
  },
);

export const WinnerList = loadable(() => import('./WinnerList'), {
  fallback: <Loading />,
});

export const UserTransaction = loadable(() => import('./UserTransaction'), {
  fallback: <Loading />,
});

export const UserBetHistory = loadable(() => import('./UserBetHistory'), {
  fallback: <Loading />,
});

export const Sales = loadable(() => import('./Sales'), {
  fallback: <Loading />,
});

export const SalesViewTickets = loadable(() => import('./Sales/ViewTickets'), {
  fallback: <Loading />,
});

export const AgentSales = loadable(() => import('./AgentSales'), {
  fallback: <Loading />,
});

export const AgentSalesiewTickets = loadable(
  () => import('./AgentSales/ViewTickets'),
  {
    fallback: <Loading />,
  },
);

export const AgentWithdrawRequest = loadable(
  () => import('./AgentWithdrawRequest'),
  {
    fallback: <Loading />,
  },
);
export const AgentKyc = loadable(() => import('./AgentKyc'), {
  fallback: <Loading />,
});
export const KycRequest = loadable(() => import('./KycRequest'), {
  fallback: <Loading />,
});

export const AgentWithdraw = loadable(() => import('./AgentWithdraw'), {
  fallback: <Loading />,
});

export const UserWithdrawRequest = loadable(
  () => import('./UserWithdrawRequest'),
  {
    fallback: <Loading />,
  },
);

export const BuyTicket = loadable(() => import('./BuyTicket'), {
  fallback: <Loading />,
});

export const Socket = loadable(() => import('./Socket'), {
  fallback: <Loading />,
});

export const PowerBallWinNumber = loadable(
  () => import('./PowerBallWinNumber'),
  {
    fallback: <Loading />,
  },
);

export const AdminTransactions = loadable(() => import('./AdminTransactions'), {
  fallback: <Loading />,
});

export const Banner = loadable(() => import('./Banner'), {
  fallback: <Loading />,
});

export const Notification = loadable(() => import('./Notification'), {
  fallback: <Loading />,
});
