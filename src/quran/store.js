//https://github.com/GlobalQuran/site/tree/master/upload/img/font-quran
import { derived, writable } from "svelte/store";
import { PAGE, SURA } from "./constants";
import computePagingMeta from "./compute-paging-meta";
import computePage from "./compute-page";
import computePagesTotal from "./compute-pages-total";
import prepare from "./prepare";

const quran = writable(
  fetch("data/quran-uthmani.txt")
    .then(function(response) {
      if (response.ok) {
        return response.text();
      }
    })
    .then(function(text) {
      return prepare(text.replace(/\r?\n|\r/g, "|").split("|"));
    })
);

const pagingTotals = {
  page: computePagesTotal(PAGE),
  sura: computePagesTotal(SURA),
}

export const pagingType = writable(SURA);

export const pagingIndex = writable(2);

export const pagingTotal = derived(pagingType, $pagingType => {
  switch ($pagingType) {
    case PAGE:
    case SURA:
      return pagingTotals[$pagingType];
    default:
      return 0;
  }
});

export const pagingMeta = derived(pagingType, computePagingMeta);

export const page = derived(
  [quran, pagingType, pagingIndex],
  ([$quran, $pagingType, $pagingIndex]) => {
    const index = $pagingIndex < pagingTotals[$pagingType] ? $pagingIndex : 1;
    return $quran.then(array => computePage(array, $pagingType, index));
  } 
);
