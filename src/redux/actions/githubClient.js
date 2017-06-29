
export function storeClientHandle(handle) {
  return {
    type: 'STORE_CLIENT_HANDLE',
    data: handle,
  };
}

export function setUserID(id) {
  return {
    type: 'SET_USER_ID',
    data: id,
  };
}

export function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    data: name,
  };
}

export function setStateToken(token) {
  return {
    type: 'SET_STATE_TOKEN',
    data: token,
  };
}

export function setAccessToken(token) {
  return {
    type: 'SET_ACCESS_TOKEN',
    data: token,
  };
}

export function toggleAccessTokenUsed(boolean) {
  return {
    type: 'TOGGLE_ACCESS_TOKEN_USED',
    data: boolean,
  };
}
