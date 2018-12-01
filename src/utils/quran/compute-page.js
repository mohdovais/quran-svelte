import getPage from './get-page';
import getSuraMeta from './get-sura-meta';

function groupBySura(array) {
    return array.reduce(function reducer(accumulator, item) {
        const groupName = item['sura'].toString();
        if (!Object.prototype.hasOwnProperty.call(accumulator, groupName)) {
            accumulator[groupName] = [];
        }
        accumulator[groupName].push(item);
        return accumulator;
    }, {});
}

function applySuraMeta(obj) {
    return Object.keys(obj).map(function (suraNumber) {
        return {
            meta: getSuraMeta(suraNumber),
            data: obj[suraNumber]
        }
    })
}

export default function computePage(quran, pagingType, pagingIndex) {
    return applySuraMeta(groupBySura(getPage(quran, pagingType, pagingIndex)));
}