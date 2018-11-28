import {
  Store
} from 'svelte/store.js';
import {
  getPage,
  getSuraMeta,
  totalPages,
  array2Object
} from './quran-meta';


function array2object(array, key) {
  return array.reduce(function reducer(accumulator, item) {
    const groupName = item[key].toString();
    if (!Object.prototype.hasOwnProperty.call(accumulator, groupName)) {
      accumulator[groupName] = [];
    }
    accumulator[groupName].push(item);
    return accumulator;
  }, {});
}

function doGroupSura(obj){
  return Object.keys(obj).map(function(suraNumber){
    return {
      meta: getSuraMeta(suraNumber),
      data: obj[suraNumber]
    }
  })
}

function groupBySura(array, key){
  return doGroupSura(array2object(array, key));
}

const computePage = (quran, pagingType, pagingIndex) => {
  //ignore pagingType for now
  return groupBySura(getPage(quran, pagingIndex), 'sura');
}

class MyStore extends Store{
  updateQuran(array){
    this.set({
      quran: array2Object(array)
    });
  }
}

const store = new MyStore({
  quran: [],
  pagingType: 'page',
  pagingIndex: 597,
  page: [],
  total: {
    pages: totalPages,
    sura: 0
  }
});

store.compute(
  'page',
  ['quran', 'pagingType', 'pagingIndex'],
  computePage
);

export default store;
