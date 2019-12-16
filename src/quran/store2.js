import { writable } from "svelte/store";
import { PAGE, SURA } from "./constants";
import computePagingMeta from "./compute-paging-meta";
import computePage from "./compute-page";
import computePagesTotal from "./compute-pages-total";
import { getBoundIndex } from "./get-bound-index.js";
import { assign } from "../utils/object";

export const ACTION_SET_SOURCE = 1;
export const ACTION_SET_PAGE_TYPE = 2;
export const ACTION_SET_PAGE_INDEX = 3;
export const ACTION_SET_PAGE = 4;

const pagingTotals = {
  page: computePagesTotal(PAGE),
  sura: computePagesTotal(SURA)
};

const initialState = {
  pagingType: PAGE,
  pagingIndex: 1,
  pagingTotal: pagingTotals[PAGE],
  pagingMeta: computePagingMeta(PAGE),
  page: []
};

let source = [];

function reducer(state, action) {
  let pagingIndex, pagingType;
  switch (action.type) {
    case ACTION_SET_SOURCE:
      source = action.source;
      return assign({}, state, {
        page: computePage(source, state.pagingType, state.pagingIndex)
      });

    case ACTION_SET_PAGE_TYPE:
      pagingType = action.pagingType;
      pagingIndex = 1;
      if (pagingType !== undefined && state.pagingType !== pagingType) {
        return assign({}, state, {
          pagingType,
          pagingIndex,
          pagingTotal: pagingTotals[pagingType],
          pagingMeta: computePagingMeta(pagingType),
          page: computePage(source, pagingType, pagingIndex)
        });
      }
    case ACTION_SET_PAGE_INDEX:
      pagingType = state.pagingType;
      pagingIndex = getBoundIndex(state.pagingType, action.pagingIndex);
      if (pagingIndex !== undefined && pagingIndex !== state.pagingIndex) {
        return assign({}, state, {
          pagingIndex,
          page: computePage(source, pagingType, pagingIndex)
        });
      }
    case ACTION_SET_PAGE:
      pagingType = action.pagingType;
      pagingIndex = getBoundIndex(action.pagingType, action.pagingIndex);
      if (
        pagingType !== state.pagingType ||
        pagingIndex !== state.pagingIndex
      ) {
        return assign({}, state, {
          pagingType,
          pagingIndex,
          pagingTotal: pagingTotals[pagingType],
          pagingMeta: computePagingMeta(pagingType),
          page: computePage(source, pagingType, pagingIndex)
        });
      }
  }
  return state;
}

function createStore() {
  const { subscribe, update } = writable(initialState);
  const dispatch = action => update(state => reducer(state, action));

  return {
    subscribe,
    dispatch,
    gotoPage: function({ pagingIndex, pagingType }) {
      const index = pagingIndex === undefined ? 0 : 1;
      const type = pagingType === undefined ? 0 : 2;

      switch (index + type) {
        case 1:
          return dispatch({
            type: ACTION_SET_PAGE_INDEX,
            pagingIndex
          });
        case 2:
          return dispatch({
            type: ACTION_SET_PAGE_TYPE,
            pagingType
          });
        case 3:
          return dispatch({
            type: ACTION_SET_PAGE,
            pagingIndex,
            pagingType
          });
      }
    }
  };
}

export default createStore();
