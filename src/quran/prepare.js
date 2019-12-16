import {
    Sura,
    Sajda,
    Ruku
} from './quran-data';
import {
    removeBismillah
} from './bismillah';
import getAyaIndex from './get-aya-index';

function applySura(array) {
    return Array.prototype.concat.apply([], Sura.map(function suraMap(item, suraIndex) {
        return array.slice(item[0], item[0] + item[1])
            .map(function (text, ayaIndex) {
                return {
                    text: ayaIndex === 0 ? removeBismillah(text) : text,
                    aya: ayaIndex + 1,
                    sura: suraIndex
                }
            })
    }));
}

function applySajda(array) {
    Sajda.forEach(function (sajda, i) {
        i && (
            array[getAyaIndex(sajda[0], sajda[1])].sajda = sajda[2]
        );
    });

    return array;
}

function applyRuku(array) {
    Ruku.forEach(function (ruku, i) {
        i > 1 && (
            array[getAyaIndex(ruku[0], ruku[1]) - 1].ruku = i - 1
        );
    });
    array[array.length - 2].ruku = Ruku.length;

    return array;
}

export default function prepare(array) {
    return applyRuku(applySajda(applySura(array)));
}