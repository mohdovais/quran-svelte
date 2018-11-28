import {removeBismillah} from './bismillah';
import {
    Sura,
    Page
} from './resources/data/quran-data';

function array2Object(array) {
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

export default function (ayas){
    return {
        quran: array2Object(ayas),
        pagingType: 'page',
        pagingIndex: 597,
        page: []
    }
}
