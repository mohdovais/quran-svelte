import {
    Page,
    Sura
} from './../../resources/data/quran-data';
import {
    PAGE, SURA
} from './../../constants';

export default function computePagesTotal(pagingType){
    switch(pagingType){
        case PAGE:
            return Page.length - 1;
        case SURA:
            return Sura.length - 1;
        default:
            return 0;
    }
}