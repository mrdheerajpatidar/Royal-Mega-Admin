import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const isDevelopment = NODE_ENV !== 'production';
const isProductionApp = APP_ENV === 'production';

// const token = Cookies.get('loginSuccessRoyalGame');
const token = localStorage.getItem('loginSuccessRoyalGame');
// console.log(JSON.parse(token));

export const setAuthCookie = () => {
  return Cookies.set(
    isDevelopment
      ? 'test__user__isLoggedIn'
      : isProductionApp
      ? '__user__isLoggedIn'
      : `${APP_ENV}__user__isLoggedIn`,
    'true',
    { expires: 1 },
  );
};
export const removeAuthCookie = () => {
  Cookies.remove('token');
  return Cookies.remove(
    isDevelopment
      ? 'test__user__isLoggedIn'
      : isProductionApp
      ? '__user__isLoggedIn'
      : `${APP_ENV}__user__isLoggedIn`,
    'true',
    { expires: 1 },
  );
};
export const isLoggedIn = () => {
  return Boolean(
    Cookies.get(
      isDevelopment
        ? 'test__user__isLoggedIn'
        : isProductionApp
        ? '__user__isLoggedIn'
        : `${APP_ENV}__user__isLoggedIn`,
    ),
  );
};
export const showErrorMessage = (message) => {
  if (message instanceof Array) {
    message.forEach((msg) => toast.error(msg));
  } else {
    toast.error(message);
  }
};
const handleApiError = (err) => {
  return responseFormatter(false, null, err.response.data);
};
const unauthorizedHandler = () => {
  Cookies.remove(
    isDevelopment || isProductionApp
      ? '__admin__isLoggedIn'
      : `${APP_ENV}__admin__isLoggedIn`,
  );
  window.location.href = '/';
};
const responseFormatter = (status, data, error) => {
  return { status, data, error };
};

export const getFileUrl = async (data) => {
  var fileInfo = {};
  await postReq('upload', data)
    .then((res) => {
      fileInfo = res;
    })
    .catch((e) => {
      console.log(e);
    });

  return fileInfo;
};
export const postReq = async (url, data) => {
  const route_url = API_URL + url;
  return await axios
    .post(route_url, data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};
export const getReq = async (url) => {
  const route_url = API_URL + url;
  return await axios
    .get(route_url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};
export const putApiReq = async (url, data) => {
  const route_url = API_URL + url;
  return await axios
    .put(route_url, data, {
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e?.response?.status === 401) {
        unauthorizedHandler;
      } else if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};
export const patchReq = async (endpoint, data) => {
  const url = API_URL + endpoint;

  return await axios
    .patch(url, data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};

export const deleteReq = async (url, data) => {
  const route_url = API_URL + url;
  return await axios
    .delete(route_url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};

// With Auth Token
export const postReqWithoutToken = async (url, data) => {
  const route_url = API_URL + url;
  return await axios
    .post(route_url, data, {
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};
