const initialState = {
  query: '',
  items: [],
  totalCount: 0,
  sortBy: '',
  sortOrder: 'desc',
  itemsPerPage: 5,
  page: 1,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        query: action.data,
      };
    case 'SAVE_RESULTS':
      return {
        ...state,
        items: action.data,
      };
    case 'SET_TOTAL_COUNT':
      return {
        ...state,
        totalCount: action.data,
      };
    case 'SET_SORTING':
      return {
        ...state,
        sortBy: action.data.field,
        sortOrder: action.data.order,
      };
    case 'SET_ITEMS_PER_PAGE':
      return {
        ...state,
        itemsPerPage: action.data,
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.data,
      };
    default:
      return state;
  }
}
