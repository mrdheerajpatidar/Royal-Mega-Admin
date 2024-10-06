import { deleteReq, getReq, patchReq, postReq } from './apiHandlers';

// DASHBOARD Statistics
export const getTotalUsers = async (startDate, endDate) => {
  const res = await getReq(
    `agents/total-users${
      startDate && endDate ? `?fromDate=${startDate}&toDate=${endDate}` : ''
    }`,
  );
  return res;
};

export const getCollection = async (startDate, endDate) => {
  const res = await getReq(
    `dashboard/collections${
      startDate && endDate ? `?fromDate=${startDate}&toDate=${endDate}` : ''
    }`,
  );
  return res;
};
export const getGameStats = async (startDate, endDate) => {
  const res = await getReq(
    `dashboard/games-stats${
      startDate && endDate ? `?fromDate=${startDate}&toDate=${endDate}` : ''
    }`,
  );
  return res;
};

export const getAgentStats = async (startDate, endDate) => {
  const res = await getReq(
    `dashboard/users-stats${
      startDate && endDate ? `?fromDate=${startDate}&toDate=${endDate}` : ''
    }`,
  );
  return res;
};

export const getChartStats = async () => {
  const res = await getReq('dashboard/weekly-game-stats');
  return res;
};

export const getTotalSales = async (startDate, endDate) => {
  const res = await getReq(
    `agents/total-sales${
      startDate && endDate ? `?fromDate=${startDate}&toDate=${endDate}` : ''
    }`,
  );
  return res;
};

// ---------------- Transaction Module START ------------------

// Transaction
export const getTransactionList = async (skip, take, type) => {
  const res = await getReq(
    `transactions/me?skip=${skip}&take=${take}&type=${type}`,
  );
  return res;
};

export const getSoldedTicketList = async (skip, take, drawId) => {
  const res = await getReq(
    `tickets/same-selections?skip=${skip}&take=${take}&drawId=${drawId}`,
  );
  return res;
};

export const getWinnersList = async (skip, take, drawId) => {
  const res = await getReq(
    `tickets?skip=${skip}&take=${take}&drawId=${drawId}&result=Won`,
  );
  return res;
};

export const getSoldedTicketUsersList = async (
  skip,
  take,
  selection,
  drawId,
) => {
  const res = await getReq(
    `tickets/selections?skip=${skip}&take=${take}&selection=${selection}&drawId=${drawId}`,
  );
  return res;
};

export const getUserTransactionsList = async (
  skip,
  take,
  type,
  startDate,
  endDate,
  search,
) => {
  const params = {};

  if (startDate) {
    params.fromDate = startDate;
  }
  if (search) {
    params.username = search;
  }

  if (endDate) {
    params.toDate = endDate;
  }
  const res = await getReq(
    `users/transactions/payment?context=${type}&skip=${skip}&take=${take}&${new URLSearchParams(
      params,
    ).toString()}`,
  );
  return res;
};

export const getAgentDeposit = async (skip, take, startDate, endDate) => {
  const params = {};
  if (startDate) {
    params.fromDate = startDate;
  }
  if (endDate) {
    params.toDate = endDate;
  }
  const res = await getReq(
    `users/me/transactions/payment?context=Transfer&skip=${skip}&take=${take}&${new URLSearchParams(
      params,
    ).toString()}`,
  );
  return res;
};

export const getAgentUserTransactionsList = async (
  skip,
  take,
  type,
  startDate,
  endDate,
  userId,
) => {
  const params = {};

  if (startDate) {
    params.fromDate = startDate;
  }
  if (userId) {
    params.userId = userId;
  }
  if (endDate) {
    params.toDate = endDate;
  }
  const res = await getReq(
    `users/transactions/payment?context=${type}&skip=${skip}&take=${take}&${new URLSearchParams(
      params,
    ).toString()}`,
  );
  return res;
};

export const getAgentPaymentsList = async (skip, take, startDate, endDate) => {
  const params = {};
  if (startDate) {
    params.fromDate = startDate;
  }
  if (endDate) {
    params.toDate = endDate;
  }
  const res = await getReq(
    `users/me/transactions?skip=${skip}&take=${take}&${new URLSearchParams(
      params,
    ).toString()}`,
  );
  return res;
};

export const getAgentUserPaymentsList = async (
  skip,
  take,
  startDate,
  endDate,
  search,
) => {
  const params = {};
  if (startDate) {
    params.fromDate = startDate;
  }
  if (search) {
    params.username = search;
  }
  if (endDate) {
    params.toDate = endDate;
  }
  const res = await getReq(
    `users/transactions/purchase?skip=${skip}&take=${take}&${new URLSearchParams(
      params,
    ).toString()}`,
  );
  return res;
};

export const getAdminUserPaymentsList = async (
  skip,
  take,
  startDate,
  endDate,
  userId,
) => {
  const params = {};
  if (startDate) {
    params.fromDate = startDate;
  }
  if (userId) {
    params.userId = userId;
  }
  if (endDate) {
    params.toDate = endDate;
  }
  const res = await getReq(
    `users/transactions/purchase?skip=${skip}&take=${take}&${new URLSearchParams(
      params,
    ).toString()}`,
  );
  return res;
};

export const getAdminAgentTransactions = async (
  skip,
  take,
  startDate,
  endDate,
  search,
) => {
  const params = {};

  if (startDate) {
    params.fromDate = startDate;
  }
  if (search) {
    params.username = search;
  }

  if (endDate) {
    params.toDate = endDate;
  }
  const res = await getReq(
    `users/transactions/payment?context=Transfer&skip=${skip}&take=${take}&${new URLSearchParams(
      params,
    ).toString()}`,
  );
  return res;
};

export const getAdminTransactionList = async (
  skip,
  take,
  startDate,
  endDate,
  tab,
) => {
  const res = await getReq(
    `users/transactions/purchase?skip=${skip}&take=${take}&context=${tab}${
      startDate && endDate ? `&fromDate=${startDate}&toDate=${endDate}` : ''
    }`,
  );
  return res;
};

export const getUserWithdrawListList = async (
  skip,
  take,
  startDate,
  endDate,
  type,
) => {
  const res = await getReq(
    `withdraw/payout-requests?type=${type}&skip=${skip}&take=${take}${
      startDate && endDate ? `&fromDate=${startDate}&toDate=${endDate}` : ''
    }`,
  );
  return res;
};

export const getAgentWithdrawListList = async (
  skip,
  take,
  startDate,
  endDate,
  Type,
) => {
  const res = await getReq(
    `users/me/transactions/payment?context=${Type}&skip=${skip}&take=${take}${
      startDate && endDate ? `&fromDate=${startDate}&toDate=${endDate}` : ''
    }`,
  );
  return res;
};

export const getActiveDrawList = async () => {
  const res = await getReq('games/draw/active');
  return res;
};

export const getAdminSalesList = async (
  skip,
  take,
  form,
  startDate,
  endDate,
) => {
  const res = await getReq(
    `sales?skip=${skip}&take=${take}${
      form?.agentId ? `&agentId=${form?.agentId}` : ''
    }${form?.username ? `&username=${form?.username}` : ''}${
      startDate && endDate ? `&fromDate=${startDate}&toDate=${endDate}` : ''
    }`,
  );
  return res;
};

export const getAgentSalesList = async (
  skip,
  take,
  form,
  startDate,
  endDate,
  type,
) => {
  const res = await getReq(
    `sales?skip=${skip}&take=${take}&purchasedBy=${type}${
      form?.username ? `&username=${form?.username}` : ''
    }${startDate && endDate ? `&fromDate=${startDate}&toDate=${endDate}` : ''}`,
  );
  return res;
};

export const getAgentTicketDownloadList = async (id) => {
  const res = await getReq(`sales/download-pdf/${id}`);
  return res;
};

export const getAgentUserBetHistory = async (
  skip,
  take,
  form,
  startDate,
  endDate,
) => {
  const params = {
    skip: skip,
    take: take,
  };
  if (form.gameType) {
    params.gameType = form.gameType;
  }
  if (form.search) {
    params.search = form.search;
  }
  // if (form.drawName) {
  //   params.drawName = form.drawName;
  // }
  if (startDate) {
    params.fromDate = startDate;
  }

  if (endDate) {
    params.toDate = endDate;
  }
  const res = await getReq(`tickets?${new URLSearchParams(params).toString()}`);
  return res;
};

export const getAdminSalesTicketsList = async (transactionId) => {
  const res = await getReq(`tickets/${transactionId}`);
  return res;
};

export const getBetHistoryList = async (
  skip,
  take,
  type,
  userId,
  startDate,
  endDate,
) => {
  const res = await getReq(
    `tickets?userId=${userId}&skip=${skip}&take=${take}${
      type ? `&gameType=${type}` : ''
    }${startDate && endDate ? `&fromDate=${startDate}&toDate=${endDate}` : ''}`,
  );
  return res;
};

export const getLotteriTicketsList = async (skip, take, drawId) => {
  const res = await getReq(
    `tickets?drawId=${drawId}&skip=${skip}&take=${take}`,
  );
  return res;
};

export const getSettingConfiguration = async () => {
  const res = await getReq('system/settings');
  return res;
};

// ---------------- Transaction Module END ------------------

// ---------------- Tournament Module START ------------------

// Tournament List
export const getTournamentList = async (skip, take) => {
  const res = await getReq(`tournaments/all?skip=${skip}&take=${take}`);
  return res;
};

// Add Tournament (MTT)
export const postAddMttTournament = async (data) => {
  const res = await postReq('tournaments/create/mtt', data);
  return res;
};

// Add Draw (Powerball)
export const postAddPowerBallDraw = async (data) => {
  const res = await postReq('games/draw', data);
  return res;
};

export const editDraw = async (data, drawId) => {
  const res = await patchReq(`games/draw/${drawId}`, data);
  return res;
};
// Add Blog (Blog)
export const postAddBlog = async (data) => {
  const res = await postReq('blog', data);
  return res;
};
// Edit Blog (Blog)
export const editBlog = async (data, drawId) => {
  const res = await patchReq(`blog/${drawId}`, data);
  return res;
};
// delete Blog (Blog)
export const deleteBlog = async (id) => {
  const res = await deleteReq(`blog/${id}`);
  return res;
};
// Add Tournament (SNG)
export const postAddSngTournament = async (data) => {
  const res = await postReq('tournaments/create/sng', data);
  return res;
};

// Delete Tournament
export const deleteTournament = async (id) => {
  const res = await deleteReq(`tournaments/${id}`);
  return res;
};

// ---------------- Tournament Module END ------------------

// ---------------- Player Module START ------------------

// Add Player
export const postAddPlayer = async (data) => {
  const res = await postReq('create-user', data);
  return res;
};

// Player List
export const getPlayerList = async (skip, take) => {
  const res = await getReq(`users/all?skip=${skip}&take=${take}`);
  return res;
};

// ---------------- Player Module END ------------------

// ---------------- Agent Module START ------------------

// Add Agent
export const postAddAgent = async (data) => {
  const res = await postReq('users', data);
  return res;
};

export const postAuth = async (data) => {
  const res = await postReq('users/authenticate', data);
  return res;
};

export const drawStatusChanges = async (id, data) => {
  const res = await patchReq(`games/draw/status/${id}?status=${data}`);
  return res;
};
export const drawCancel = async (id) => {
  const res = await patchReq(`draw/${id}/cancel`);
  return res;
};

export const userBlockUnBlock = async (status, id) => {
  const res = await postReq(`users/${id}/${status}`);
  return res;
};

export const deleteAgentAccount = async (id) => {
  const res = await deleteReq(`account/${id}`);
  return res;
};

export const deleteBanner = async (id) => {
  const res = await deleteReq(`system/banner/${id}`);
  return res;
};

export const deleteAgentUpi = async (id) => {
  const res = await deleteReq(`upi/${id}`);
  return res;
};

export const agentAccountStatus = async (id) => {
  const res = await patchReq(`account/status/${id}`);
  return res;
};

export const banerActiveStatus = async (id) => {
  const res = await patchReq(`system/banner/default/${id}`);
  return res;
};

export const agentUpiStatus = async (id) => {
  const res = await patchReq(`upi/status/${id}`);
  return res;
};

// Agent List with Pagination
export const getAgentsList = async (skip, take) => {
  const res = await getReq(`agents/all?skip=${skip}&take=${take}`);
  return res;
};

// get lottry draw List with Pagination
export const getLottriDrawList = async (
  skip,
  take,
  startDate,
  endDate,
  form,
) => {
  const res = await getReq(
    `games/draw?type=Lottery&skip=${skip}&take=${take}${
      form?.drawName ? `&drawName=${form?.drawName}` : ''
    }${startDate && endDate ? `&fromDate=${startDate}&toDate=${endDate}` : ''}`,
  );
  return res;
};

// get PowerBall List with Pagination
export const getPowerBallDrawList = async (
  skip,
  take,
  startDate,
  endDate,
  form,
) => {
  const res = await getReq(
    `games/draw?type=PowerBall&skip=${skip}&take=${take}${
      form?.drawName ? `&drawName=${form?.drawName}` : ''
    }${startDate && endDate ? `&fromDate=${startDate}&toDate=${endDate}` : ''}`,
  );
  return res;
};
// get Blog List with Pagination
export const getAllBlogs = async (skip, take, startDate, endDate, form) => {
  const res = await getReq(
    `blog?skip=${skip}&take=${take}${
      form?.drawName ? `&drawName=${form?.drawName}` : ''
    }${startDate && endDate ? `&fromDate=${startDate}&toDate=${endDate}` : ''}`,
  );
  return res;
};

// user List with Pagination
export const getUserList = async (skip, take, type, filter) => {
  const res = await getReq(
    `users?skip=${skip}&take=${take}&type=${type}${
      filter.search ? `&search=${filter?.search}` : ''
    }${filter.createdByType ? `&createdByType=${filter?.createdByType}` : ''}${
      filter.createdBy ? `&createdBy=${filter?.createdBy}` : ''
    }`,
  );
  return res;
};

export const getDropDownUserList = async (type) => {
  const res = await getReq(`users?type=${type}`);
  return res;
};

export const getAgentList = async (skip, take, type, filter) => {
  const res = await getReq(
    `users?skip=${skip}&take=${take}&type=${type}${
      filter.search ? `&search=${filter?.search}` : ''
    }`,
  );
  return res;
};

export const getAgentAccountsList = async () => {
  const res = await getReq('account/users/me');
  return res;
};

export const getBannersList = async () => {
  const res = await getReq('system/banner');
  return res;
};

export const getAgentUpiList = async () => {
  const res = await getReq('upi/users/me');
  return res;
};

export const getDropAgentList = async () => {
  const res = await getReq('agents/username');
  return res;
};

export const getDropUserList = async () => {
  const res = await getReq('users/username');
  return res;
};

export const getDropDrawList = async () => {
  const res = await getReq('games/draw/active');
  return res;
};

// All Agent List
export const getAllAgentsList = async () => {
  const res = await getReq('agents/all');
  return res;
};

// ---------------- Agent Module END ------------------

// ---------------- Game Module START ------------------

// Add Game
export const postAddGame = async (data) => {
  const res = await postReq('games/create', data);
  return res;
};

export const postAddPracticeGame = async (data) => {
  const res = await postReq('games/create/practice', data);
  return res;
};

// Game List
export const getGamesList = async (skip, take) => {
  const res = await getReq(`get-games/all?skip=${skip}&take=${take}`);
  return res;
};

// Delete Game
export const deleteGame = async (id, data) => {
  const res = await deleteReq(`games/${id}`, data);
  return res;
};

// ---------------- Game Module END ------------------

// ---------------- Club Module START ------------------

export const changeSettingConfiguration = async (data) => {
  const res = await patchReq('system/settings', data);
  return res;
};

// ---------------- Tournament Level Module END ------------------

export const agentBalance = async (data) => {
  const res = await postReq('wallet/deposit', data);
  return res;
};

export const passwordAuthentication = async (data) => {
  const res = await postReq('users/authenticate', data);
  return res;
};

export const agentRemoveBalance = async (data) => {
  const res = await postReq('wallet/withdraw', data);
  return res;
};
export const agentWhithdraw = async (data) => {
  const res = await postReq('withdraw/request-payout', data);
  return res;
};

export const agentDeposit = async (data) => {
  const res = await postReq('wallet/deposit/me', data);
  return res;
};

export const withdraReject = async (id, data) => {
  const res = await patchReq(`withdraw/reject-request/${id}`, data);
  return res;
};

export const addLiveStreamUrl = async (id, data) => {
  const res = await patchReq(`games/draw/${id}`, data);
  return res;
};

// Get Game Set Rules For PoweBall
export const getPowerBallGameSets = async () => {
  const res = await getReq('games/gameset-config?type=PowerBall');
  return res;
};

export const getLottriGameSets = async () => {
  const res = await getReq('games/gameset-config?type=Lottery');
  return res;
};

export const addBankAccount = async (data, id) => {
  const res = await postReq(`account/${id}`, data);
  return res;
};

export const addBanner = async (data) => {
  const res = await postReq('system/banner', data);
  return res;
};

export const addUpi = async (data) => {
  const res = await postReq('upi', data);
  return res;
};

export const updateBankAccount = async (data, id) => {
  const res = await patchReq(`account/${id}`, data);
  return res;
};

export const updateUpi = async (data, id) => {
  const res = await patchReq(`upi/${id}`, data);
  return res;
};

export const kycApprove = async (id, status) => {
  const res = await postReq(`user/${id}/verification/${status}`);
  return res;
};

export const kycRejected = async (id, status, data) => {
  const res = await postReq(`user/${id}/verification/${status}`, data);
  return res;
};

export const getBankaccount = async (id) => {
  const res = await getReq(`account/${id}`);
  return res;
};
export const getUpi = async (id) => {
  const res = await getReq(`upi/${id}`);
  return res;
};
