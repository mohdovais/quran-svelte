import getSuraMeta from './get-sura-meta';

function doGetAyaIndex(suraMeta, aya) {
    return suraMeta[0] + Math.min(suraMeta[1], aya - 1);
}

export default function getAyaIndex(sura, aya) {
    return doGetAyaIndex(getSuraMeta(sura), aya);
}