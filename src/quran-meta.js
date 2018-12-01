import {
    Sajda,
    Ruku
} from './resources/data/quran-data';

function reducer(meta) {
    return meta.reduce(function (accum, meta, index) {
        index && (accum[uniqueAyaKey(meta[0], meta[1])] = meta[2] || true);
        return accum;
    }, {});
}

export function uniqueAyaKey(sura, aya) {
    return `${sura}-${aya}`;
}

export const ruku = reducer(Ruku);
export const sajda = reducer(Sajda);
