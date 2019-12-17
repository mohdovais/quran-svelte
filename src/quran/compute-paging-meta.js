import { Page, Sura } from "./quran-data";
import { PAGE, SURA } from "./constants";

var pageMeta, suraMeta;

export default function computePagingMeta(pagingType) {
  switch (pagingType) {
    case PAGE:
      return (
        pageMeta ||
        (pageMeta = Page.reduce(function(accum, item, i, items) {
          if (item.length && i + 1 !== items.length) {
            accum.push(i.toString());
          }
          return accum;
        }, []))
      );
    case SURA:
      return (
        suraMeta ||
        (suraMeta = Sura.reduce(function(accum, item, i) {
          var val = item[5];
          if (val) {
            accum.push(val);
          }
          return accum;
        }, []))
      );
    default:
      return [];
  }
}
