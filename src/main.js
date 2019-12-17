import App from "./component/App.svelte";
import get, { getError, getProgress } from "./utils/ajax";
import store from "./store";
import { initiateRouter } from "./router";

const target = document.getElementById("app");
let preloader = target.querySelector("svg");

function showMessage(message) {
  console.info(message);
}

initiateRouter(store);

new App({
  target,
  props: { store }
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
    store.setSource(progressEvent.target.responseText);
  },
  error: function onError(progressEvent) {
    showMessage(getError(progressEvent.target));
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");

  navigator.serviceWorker.ready.then(function() {
    //window.location.reload();
  });
}
