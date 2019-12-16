const location = document.location;
const hashbang = '#!/';
const regexr = /#!\/(page|sura)\/(\d+)/;
const defaultPath = 'page/1';

function onLocationChange(store) {
    return function (hashchange) {
        const change = validate(location.hash);
        if (change) {
            store.gotoPage({
                pagingType: change[1],
                pagingIndex: parseInt(change[2], 10)
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

export function init(store) {
    const onHashChange = onLocationChange(store);
    onHashChange();
    const unsubscribeStore = store.subscribe(state => {
        navigate(state.pagingType + '/' + state.pagingIndex);
    });
    window.addEventListener('hashchange', onHashChange);

    return function unsubscribe(){
        unsubscribeStore();
        window.removeEventListener('hashchange', onHashChange);
    }
}
