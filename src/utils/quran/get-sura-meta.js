import {
    Sura
} from './../../resources/data/quran-data';

export default function getSuraMeta(number) {
    return Sura[number];
}