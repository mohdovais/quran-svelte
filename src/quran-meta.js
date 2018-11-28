import {
    Sajda,
    Sura,
    Page,
    Ruku
} from './resources/data/quran-data';
import {removeBismillah} from './bismillah';

function getAyaIndex(sura, aya) {
    return doGetAyaIndex(getSuraMeta(sura), aya);
}

function doGetAyaIndex(suraMeta, aya) {
    return suraMeta[0] + Math.min(suraMeta[1], aya - 1);
}

function getPageStart(index) {
    return getAyaIndex.apply(null, Page[index]);
}

function getPageEnd(index) {
    return getAyaIndex.apply(null, Page[index + 1]);
}

function reducer(meta){
    return meta.reduce(function (accum, meta, index) {
        index && (accum[uniqueAyaKey(meta[0], meta[1])] = meta[2] || true);
        return accum;
    }, {});
}

export function getPage(array, page) {
    return array.slice(getPageStart(page), getPageEnd(page))
}

export const totalPages = Page.length - 1;

export function getSuraMeta(number) {
    return Sura[number];
}

export function uniqueAyaKey(sura, aya) {
    return `${sura}-${aya}`;
}

export function array2Object(array) {
    return Array.prototype.concat.apply([], Sura.map(function (item, suraIndex) {
        return array.slice(item[0], item[0] + item[1])
            .map(function (text, ayaIndex) {
                return Object.create(null, {
                    text: {
                        value: ayaIndex === 0 ? removeBismillah(text) : text
                    },
                    aya: {
                        value: ayaIndex + 1
                    },
                    sura: {
                        value: suraIndex
                    }
                })
            })
    }));
}

export const ruku = reducer(Ruku);
export const sajda = reducer(Sajda);
