import {
    Page,
    Sura
} from './quran-data';
import {
    PAGE,
    SURA
} from './constants';
import getAyaIndex from './get-aya-index';

function getPageStart(pagingType, index) {
    switch (pagingType) {
        case PAGE:
            return getAyaIndex.apply(null, Page[index]);
        case SURA:
            return Sura[index][0];
        default:
            return -1;
    }
}

function getPageEnd(pagingType, index) {
    switch (pagingType) {
        case PAGE:
            return getAyaIndex.apply(null, Page[index + 1]);
        case SURA:
            return Sura[index][0] + Sura[index][1];
        default:
            return -1;
    }
}

export default function getPage(array, pagingType, pagingIndex) {
    switch (pagingType) {
        case PAGE:
        case SURA:
            return array.slice(
                getPageStart(pagingType, pagingIndex),
                getPageEnd(pagingType, pagingIndex)
            );
        default:
            return [];
    }
}