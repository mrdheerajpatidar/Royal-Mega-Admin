/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  DashboardLayout,
  OuterLayout,
  NotFound,
  Home,
  Transactions,
  ChangePassword,
  Agents,
  AddAgent,
  AddUser,
  // AddPowrBallDraw,
  Lottri,
  AddLottriDraw,
  SettingConfiguration,
  SoldedTicket,
  WinnerList,
  UserTransaction,
  UserBetHistory,
  Sales,
  AgentWithdrawRequest,
  UserWithdrawRequest,
  // PowerBall,
  Users,
  AgentHome,
  AgentUsers,
  AddAgentUser,
  AgentBetHistory,
  AgentBankAccount,
  AgentWithdraw,
  AgentSetting,
  SalesViewTickets,
  BuyTicket,
  SoldedTicketUsers,
  FirstLoginPasswordChange,
  // EditPowerBallDraw,
  EditLotteriDraw,
  // PowerBallWinNumber,
  AdminTransactions,
  Banner,
  AgentSales,
  AgentSalesiewTickets,
  AgentTransactons,
  Notification,
  Blog,
  EditBlog,
  AddBLog,
  AgentKyc,
  KycRequest,
} from '@containers/pageListAsync';
import { ForgotPassword, Login, Register } from '@components';
import { useSelector } from 'react-redux';
import { deleteReq } from '@utils/apiHandlers';
import { Helmet } from 'react-helmet';

// import { useSelector } from 'react-redux';

function App() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const LoginType = localStorage.getItem('loginType');
  const Agent = useSelector((state) => state.agent.data);
  const location = useLocation();
  useEffect(() => {
    if (location?.pathname != '/buy-ticket' && Agent?.id) {
      handleRemoveAllCart();
    }
  }, [location?.pathname]);

  const handleRemoveAllCart = async () => {
    const agentId = Agent?.id;
    const res = await deleteReq(`cart/items/${agentId}`);
    const { status, error } = res;
    if (status) {
      console.log(status);
    } else if (error) {
      console.log(error);
    }
  };

  const agentPath = [
    '/agent-dashboard',
    '/agent-bet-history',
    '/agent-kyc-request',
    '/agent-bank-details',
    '/deposit-withdraw-request',
    '/agent-users',
    '/agent-settings',
    '/agent-home',
    '/agent-users/add-user/:routeId',
    '/agent-user-bethistory/:userId',
    'agent-user-transaction',
    '/agent-sales',
    '/agent-sales/view-tickets/:transactionId',
    '/agent-transactions',
  ];

  const adminPath = [
    '/dashboard',
    '/user-withdraw-request',
    '/agent-withdraw-request',
    '/user-transaction',
    '/user-bethistory/:userId',
    '/sales',
    '/kycRequest',
    '/sales/view-tickets/:transactionId',
    '/agent-withdraw-request',
    // '/powerball',
    // '/powerball/add-draw',
    '/blog',
    '/blog/add-blog',
    '/lottri',
    '/lottri/add-draw',
    '/setting-configuration',
    'solded-ticket/:id/:game',
    'winner-list/:game/:id',
    '/agents',
    '/agents/add-agent',
    '/users',
    '/users/add-user',
    '/change-password',
    '/banners',
    '/transactions',
  ];
  useEffect(() => {
    if (LoginType == 'admin') {
      agentPath.map((item) => item == pathname && navigate('/dashboard'));
    } else {
      adminPath.map((item) => item == pathname && navigate('/agent-dashboard'));
    }
  }, [LoginType, pathname]);

  useEffect(() => {
    // Scroll to top on url change
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Scroll to element on hash change
    const element = document.getElementById(hash.replace('#', ''));
    if (element) {
      element.scrollIntoView(true);
    }
  }, [hash]);

  return (
    <Fragment>
      <Helmet>
        <title>Royal Mega Agent </title>
      </Helmet>
      <Routes>
        <Route path="/" element={<OuterLayout />}>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/first-login-change-password"
            element={<FirstLoginPasswordChange />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route path="/" element={<DashboardLayout />}>
          <Route index path="/dashboard" element={<Home />} />
          <Route index path="/agent-dashboard" element={<AgentHome />} />
          {/* Power Ball Start */}
          {/* <Route path="powerball">
            <Route index element={<PowerBall />} />
            <Route path="add-draw" element={<AddPowrBallDraw />} />
            <Route path="edit-draw/:drawId" element={<EditPowerBallDraw />} />
            <Route
              path="add-win-number/:drawId"
              element={<PowerBallWinNumber />}
            />
          </Route> */}

          {/* Power Ball End */}
          {/* blog Start */}
          <Route path="blog">
            <Route index element={<Blog />} />
            <Route path="add-blog" element={<AddBLog />} />
            <Route path="edit-blog/:blogId" element={<EditBlog />} />
          </Route>
          {/* blog End */}

          {/* user transaction Start */}
          <Route path="user-transaction/:userId">
            <Route index element={<UserTransaction />} />
          </Route>
          <Route path="notifications">
            <Route index element={<Notification />} />
          </Route>

          <Route path="agent-notifications">
            <Route index element={<Notification />} />
          </Route>
          <Route path="banners">
            <Route index element={<Banner />} />
          </Route>
          <Route path="agent-user-transaction">
            <Route index element={<UserTransaction />} />
          </Route>

          <Route path=":userType/transactions">
            <Route index element={<AdminTransactions />} />
          </Route>
          {/*  user transaction End */}
          {/* Agent Bet History Start */}
          <Route path="agent-bet-history">
            <Route index element={<AgentBetHistory />} />
          </Route>

          {/* Agent Kyc Request */}
          <Route path="agent-kyc-request">
            <Route index element={<AgentKyc />} />
          </Route>

          {/* Admin kycRequest */}
          <Route path="KycRequest">
            <Route index element={<KycRequest />} />
          </Route>

          {/*  Agent Bet History End */}
          {/* Agent Bank Account Start */}
          <Route path="agent-bank-details">
            <Route index element={<AgentBankAccount />} />
          </Route>
          {/*  Agent Bank Account End */}
          {/* user bet history Start */}
          <Route path="user-bethistory/:userId">
            <Route index element={<UserBetHistory />} />
          </Route>
          {/*  user bet history End */}
          {/* user bet history Start */}
          <Route path="agent-user-bethistory/:userId">
            <Route index element={<UserBetHistory />} />
          </Route>
          {/*  user bet history End */}

          {/* Sales Start */}
          <Route path="sales">
            <Route index element={<Sales />} />
            <Route
              path="view-tickets/:transactionId"
              element={<SalesViewTickets />}
            />
          </Route>

          <Route path="agent-sales">
            <Route index element={<AgentSales />} />
            <Route
              path="view-tickets/:transactionId"
              element={<AgentSalesiewTickets />}
            />
          </Route>
          {/*  Sales End */}
          {/* Setting configuration Start */}
          <Route path="setting-configuration">
            <Route index element={<SettingConfiguration />} />
          </Route>
          {/* agent withdraw Start */}
          <Route path="agent-withdraw-request">
            <Route index element={<AgentWithdrawRequest />} />
          </Route>
          {/* agent withdraw Start */}
          <Route path="deposit-withdraw-request">
            <Route index element={<AgentWithdraw />} />
          </Route>
          {/* user withdraw Start */}
          <Route path="user-withdraw-request">
            <Route index element={<UserWithdrawRequest />} />
          </Route>
          {/* Solded Ticket Start */}
          <Route path="solded-ticket/:id/:game/:collectedAmount">
            <Route index element={<SoldedTicket />} />
          </Route>
          {/*  Solded Ticket End */}

          {/* Solded Ticket Start */}
          <Route path="solded-ticket-user/:selection/:drawId">
            <Route index element={<SoldedTicketUsers />} />
          </Route>
          {/*  Solded Ticket End */}

          {/* Winner List Start */}
          <Route path="winner-list/:game/:id">
            <Route index element={<WinnerList />} />
          </Route>
          {/*  Winner List End */}
          {/* Lottri Start */}
          <Route path="lottri">
            <Route index element={<Lottri />} />
            <Route path="add-draw" element={<AddLottriDraw />} />
            <Route path="edit-draw/:drawId" element={<EditLotteriDraw />} />
          </Route>
          {/* Lottri End */}
          {/* Agents Start */}
          <Route path="agents">
            <Route index element={<Agents />} />
            <Route path="add-agent" element={<AddAgent />} />
          </Route>
          {/* Agents End */}
          {/* Userss Start */}
          <Route path="users">
            <Route index element={<Users />} />
            <Route path="add-user" element={<AddUser />} />
          </Route>
          {/* Userss End */}
          {/* Buy Tickets Start */}
          <Route path="buy-ticket">
            <Route index element={<BuyTicket />} />
          </Route>
          {/* Buy Tickets End */}
          {/* Agent Users Start */}
          <Route path="agent-users">
            <Route index element={<AgentUsers />} />
            <Route path="add-user/:routeId" element={<AddAgentUser />} />
          </Route>
          {/* Agent Users End */}
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/agent-transactions" element={<AgentTransactons />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/agent-settings" element={<AgentSetting />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </Fragment>
  );
}

export default App;
