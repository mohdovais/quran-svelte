const documentLocation = document.location;
const HASHBANG = "#!/";
const regexr = /#!\/(page|sura)\/(\d+)/;
const DEFAULT_PATH = "page/1";

function onLocationChange(store) {
  return function() {
    const change = validate(documentLocation.hash);
    if (change) {
      store.gotoPage({
        pagingType: change[1],
        pagingIndex: parseInt(change[2], 10)
      });
    }
  };
}

function navigate(path) {
  const loc = path === undefined ? getCookie() || DEFAULT_PATH : path;
  setCookie(loc);
  return (documentLocation.hash = HASHBANG + loc);
}

function validate(hash) {
  return regexr.exec(hash) || (navigate() && false);
}

export function initiateRouter(store) {
  let count = 0;
  const onHashChange = onLocationChange(store);
  onHashChange();
  const unsubscribeStore = store.subscribe(state => {
    if (count !== 0) {
      navigate(state.pagingType + "/" + state.pagingIndex);
    } else {
      count++;
    }
  });
  window.addEventListener("hashchange", onHashChange);

  return function unsubscribe() {
    unsubscribeStore();
    window.removeEventListener("hashchange", onHashChange);
  };
}

const COOKIE_REGEX = /^location=(.+)/;
function getCookie() {
  const cookie = document.cookie
    .split(";")
    .map(x => x.trim())
    .filter(x => COOKIE_REGEX.test(x))
    .join("");

  if (cookie !== "") {
    return decodeURIComponent(COOKIE_REGEX.exec(cookie)[1]);
  }

  return cookie;
}

function setCookie(loc) {
  document.cookie = `location=${encodeURIComponent(loc)}`;
}
