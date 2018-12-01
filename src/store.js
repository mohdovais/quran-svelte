import {
  Store
} from 'svelte/store.js';
import {
  totalPages
} from './quran-meta';

import computePage from './utils/quran/compute-page';

const store = new Store({
  quran: [],
  pagingType: 'page',
  pagingIndex: 597,
  page: [],
  total: {
    pages: totalPages,
    sura: 0
  }
});

store.compute('page', ['quran', 'pagingType', 'pagingIndex'], computePage);

export default store;