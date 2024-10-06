import { getReq, isLoggedIn } from '@/utils/apiHandlers';
import { SET_AGENT, CLEANUP } from '../actions/actionConstants';

// Async function to fetch user details
export const getAgent = async () => {
  const islogin = isLoggedIn();
  if (islogin) {
    try {
      const response = await getReq('users/me');
      if (response?.status) {
        return response.data; // Return the data instead of logging it
      }
      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
};

const initialState = {};

const agentModule = (state = { ...initialState }, action = {}) => {
  switch (action.type) {
    case SET_AGENT:
      return {
        ...state,
        ...action.payload,
      };
    case CLEANUP:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default agentModule;
