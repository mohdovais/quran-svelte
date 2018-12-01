import {
  Store
} from 'svelte/store.js';
import computePage from './utils/quran/compute-page';
import computePagesTotal from './utils/quran/compute-pages-total';
import {
  PAGE,
  PAGING_TYPE,
  PAGING_INDEX
} from './constants';

const store = new Store({
  quran: [],
  pagingType: PAGE,
  pagingIndex: 597,
  pagingTotal: 0,
  page: [],
});

store.compute(PAGE, ['quran', PAGING_TYPE, PAGING_INDEX], computePage);
store.compute('pagingTotal', [PAGING_TYPE], computePagesTotal);

export default store;