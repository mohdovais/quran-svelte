import getPage from "./get-page";
import getSuraMeta from "./get-sura-meta";

function groupBySura(array) {
  return array.reduce(function reducer(accumulator, item) {
    const groupName = item["sura"].toString();
    if (!Object.prototype.hasOwnProperty.call(accumulator, groupName)) {
      accumulator[groupName] = [];
    }
    accumulator[groupName].push(item);
    return accumulator;
  }, {});
}

function toMetaObject(meta, position) {
  return [
    "start",
    "ayas",
    "order",
    "rukus",
    "name",
    "tname",
    "ename",
    "type"
  ].reduce(
    function(accum, propName, index) {
      accum[propName] = meta[index];
      return accum;
    },
    { position }
  );
}

function applySuraMeta(obj) {
  return Object.keys(obj).map(function(suraNumber) {
    const index = parseInt(suraNumber, 10);
    return {
      meta: toMetaObject(getSuraMeta(suraNumber), index),
      data: obj[index]
    };
  });
}

export default function computePage(quran, pagingType, pagingIndex) {
  return applySuraMeta(groupBySura(getPage(quran, pagingType, pagingIndex)));
}
