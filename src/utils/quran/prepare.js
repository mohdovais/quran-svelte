import {
    Sura
} from './../../resources/data/quran-data';
import {
    removeBismillah
} from './bismillah';

export default function prepare(array) {
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