import {
    Page,
    Sura
} from './../../resources/data/quran-data';
import {
    PAGE,
    SURA
} from './../../constants';

export const totals = {
    [PAGE]: Page.length - 1,
    [SURA]: Sura.length - 1
}

export function getBoundIndex(pagingType, index) {
    return Math.max(
        1,
        Math.min(
            totals[pagingType] - 1,
            parseInt(index, 10)
        )
    )
}