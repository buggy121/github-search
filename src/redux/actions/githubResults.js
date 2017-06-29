export function setQuery(text) {
  return {
    type: 'SET_QUERY',
    data: text,
  };
}

export function saveResults(items) {
  return {
    type: 'SAVE_RESULTS',
    data: items,
  };
}

export function setTotalCount(num) {
  return {
    type: 'SET_TOTAL_COUNT',
    data: num,
  };
}

export function setSorting(sField, sOrder) {
  return {
    type: 'SET_SORTING',
    data: {
      field: sField,
      order: sOrder,
    },
  };
}

export function setItemsPerPage(num) {
  return {
    type: 'SET_ITEMS_PER_PAGE',
    data: num,
  };
}

export function setPage(id) {
  return {
    type: 'SET_PAGE',
    data: id,
  };
}
