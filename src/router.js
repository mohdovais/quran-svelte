import {
    hasOwnProperty
} from './object.js';

const location = document.location;
const hashbang = '#!/';
const regexr = /#!\/((page)|(sura))\/(\d+)/;
const defaultPath = 'page/1';

function onLocationChange(store) {
    return function(hashchange){
        var change = validate(location.hash);
        if(change){
            store.set({
                pagingType: change[1],
                pagingIndex: parseInt(change[4], 10)
            })
        }
    }
}

function navigate(path) {
    return (location.hash = hashbang + path);
}

function validate(hash) {
    return regexr.exec(location.hash) || (navigate(defaultPath) && false);
}

function onStateChange(state) {
    const changed = state.changed;
    const current = state.current;
    if (
        hasOwnProperty(changed, 'pagingIndex') ||
        hasOwnProperty(changed, 'pagingType')
    ) {
        navigate(current.pagingType + '/' + current.pagingIndex);
    }
}

function init(store) {
    const onHashChange = onLocationChange(store);
    window.addEventListener('hashchange', onHashChange);
    store.on('state', onStateChange);
    onHashChange();
}

const Router = {
    init,
    navigate
}

export default Router;