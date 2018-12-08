import {
  Store
} from 'svelte/store.js';
import {
  PAGE,
  PAGING_TYPE,
  PAGING_INDEX
} from './constants';
import computePagingMeta from './utils/quran/compute-paging-meta';
import computePage from './utils/quran/compute-page';
import computePagesTotal from './utils/quran/compute-pages-total';

const store = new Store({
  quran: [],
  pagingType: PAGE,
  pagingIndex: 1,
  //pagingTotal: 0,
  page: [],
});

store.compute(PAGE, ['quran', PAGING_TYPE, PAGING_INDEX], computePage);
store.compute('pagingTotal', [PAGING_TYPE], computePagesTotal);
store.compute('pagingMeta', [PAGING_TYPE], computePagingMeta);

export default store;