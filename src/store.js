import { writable } from "svelte/store";
import {
  ACTION_SET_PAGE_INDEX,
  ACTION_SET_PAGE_TYPE,
  ACTION_SET_PAGE,
  ACTION_SET_SOURCE,
  initialState,
  reducer
} from "./quran/state";

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
    },
    /**
     * 
     * @param {string} source 
     */
    setSource: function(source) {
      dispatch({
        type: ACTION_SET_SOURCE,
        source
      });
    }
  };
}

export default createStore();
