import { PAGE, SURA } from "./constants";
import computePagingMeta from "./compute-paging-meta";
import computePage from "./compute-page";
import computePagesTotal from "./compute-pages-total";
import { getBoundIndex } from "./get-bound-index.js";
import prepare from './prepare';
import { assign } from "../utils/object";

export const ACTION_SET_SOURCE = 1;
export const ACTION_SET_PAGE_TYPE = 2;
export const ACTION_SET_PAGE_INDEX = 3;
export const ACTION_SET_PAGE = 4;

const pagingTotals = {
  page: computePagesTotal(PAGE),
  sura: computePagesTotal(SURA)
};

export const initialState = {
  pagingType: PAGE,
  pagingIndex: 1,
  pagingTotal: pagingTotals[PAGE],
  pagingMeta: computePagingMeta(PAGE),
  page: []
};

let source = [];

export function reducer(state, action) {
  let pagingIndex, pagingType;
  switch (action.type) {
    case ACTION_SET_SOURCE:
      source = prepare(action.source.replace(/\r?\n|\r/g, "|").split("|"));
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
      break;
    case ACTION_SET_PAGE_INDEX:
      pagingType = state.pagingType;
      pagingIndex = getBoundIndex(state.pagingType, action.pagingIndex);
      if (pagingIndex !== undefined && pagingIndex !== state.pagingIndex) {
        return assign({}, state, {
          pagingIndex,
          page: computePage(source, pagingType, pagingIndex)
        });
      }
      break;
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
