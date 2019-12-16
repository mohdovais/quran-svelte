import App from "./component/App.svelte";
import store, { ACTION_SET_SOURCE } from "./quran/store2";
import prepare from "./quran/prepare";
import get, { getError, getProgress } from "./utils/ajax";
import { init } from "./router";

const target = document.getElementById("app");
let preloader = target.querySelector("svg");

function showMessage() {}

init(store);

new App({
  target,
  props: {
    store
  }
});

get({
  url: "data/quran-uthmani.txt",
  progress: function onProgress(progressEvent) {
    showMessage(
      `loading data ${getProgress(progressEvent.loaded, progressEvent.total)}`
    );
  },
  success: function onSuccess(progressEvent) {
    preloader.parentNode.removeChild(preloader);
    preloader = null;

    store.dispatch({
      type: ACTION_SET_SOURCE,
      source: prepare(
        progressEvent.target.responseText.replace(/\r?\n|\r/g, "|").split("|")
      )
    });
  },
  error: function onError(progressEvent) {
    showMessage(getError(progressEvent.target));
  }
});

//@TODO
/*
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');

  navigator.serviceWorker.ready.then(function () {
    //window.location.reload();
  });
}
*/
