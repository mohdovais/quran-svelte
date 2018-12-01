import getSuraMeta from './get-sura-meta';
import {
    Page,
    Sura
} from './../../resources/data/quran-data';

function getAyaIndex(sura, aya) {
    return doGetAyaIndex(getSuraMeta(sura), aya);
}

function doGetAyaIndex(suraMeta, aya) {
    return suraMeta[0] + Math.min(suraMeta[1], aya - 1);
}

function getPageStart(pagingType, index) {
    switch (pagingType) {
        case 'page':
            return getAyaIndex.apply(null, Page[index]);
        case 'sura':
            return Sura[index][0];
        default:
            return -1;
    }
}

function getPageEnd(pagingType, index) {
    switch (pagingType) {
        case 'page':
            return getAyaIndex.apply(null, Page[index + 1]);
        case 'sura':
            return Sura[index][0] + Sura[index][1];
        default:
            return -1;
    }
}

export default function getPage(array, pagingType, pagingIndex) {
    switch (pagingType) {
        case 'page':
        case 'sura':
            return array.slice(
                getPageStart(pagingType, pagingIndex),
                getPageEnd(pagingType, pagingIndex)
            );
        default:
            return [];
    }

}