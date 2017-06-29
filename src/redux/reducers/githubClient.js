const initialState = {
  client: null,
  userID: -1,
  userName: '',
  stateToken: '',
  accessToken: '',
  accessTokenUsed: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'STORE_CLIENT_HANDLE':
      return {
        ...state,
        client: action.data,
      };
    case 'SET_USER_ID':
      return {
        ...state,
        userID: action.data,
      };
    case 'SET_USER_NAME':
      return {
        ...state,
        userName: action.data,
      };
    case 'SET_STATE_TOKEN':
      return {
        ...state,
        stateToken: action.data,
      };
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.data,
        accessTokenUsed: false,
      };
    case 'TOGGLE_ACCESS_TOKEN_USED':
      return {
        ...state,
        accessTokenUsed: action.data,
      };
    default:
      return state;
  }
}
