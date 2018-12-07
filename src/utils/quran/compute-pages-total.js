import {
    totals
} from './get-bound-index';

export default function computePagesTotal(pagingType){
    return totals[pagingType] || 0;
}