//https://github.com/GlobalQuran/site/tree/master/upload/img/font-quran
import { derived, writable } from "svelte/store";
import { PAGE, SURA } from "./constants";
import computePagingMeta from "./compute-paging-meta";
import computePage from "./compute-page";
import computePagesTotal from "./compute-pages-total";
import prepare from "./prepare";

const quran = writable([]);
const pagingTotalPage = computePagesTotal(PAGE);
const pagingTotalSura = computePagesTotal(SURA);

fetch("data/quran-uthmani.txt")
  .then(function(response) {
    if (response.ok) {
      return response.text();
    }
  })
  .then(function(text) {
    quran.set(prepare(text.replace(/\r?\n|\r/g, "|").split("|")));
  });

export const pagingType = writable(SURA);

export const pagingIndex = writable(2);

export const pagingTotal = derived(pagingType, $pagingType => {
  switch ($pagingType) {
    case PAGE:
      return pagingTotalPage;
    case SURA:
      return pagingTotalSura;
    default:
      return 0;
  }
});

export const pagingMeta = derived(pagingType, computePagingMeta);

export const page = derived(
  [quran, pagingType, pagingIndex],
  ([$quran, $pagingType, $pagingIndex]) =>
    computePage($quran, $pagingType, $pagingIndex)
);
