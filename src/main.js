import App from './components/App.html';
import store from './store.js';
import ajax, {
  getProgress,
  getError
} from './utils/ajax.js';
import router from './router.js';
import prepare from './utils/quran/prepare';

var preloader = document.getElementById('preloader');

function showMessage(message) {
  preloader.childNodes[0].innerHTML = message;
};

showMessage('connecting server...');

ajax({
  url: 'data/quran-simple.txt',
  progress: function onProgress(progressEvent) {
    showMessage(
      `loading data ${getProgress(progressEvent.loaded, progressEvent.total)}`
    );
  },
  success: function onSuccess(progressEvent) {

    preloader.parentNode.removeChild(preloader);
    preloader = null;

    store.set({
      quran: prepare(
        progressEvent.target.responseText.replace(/\r?\n|\r/g, '|').split('|')
      )
    });

    router.init(store);

    new App({
      target: document.body,
      store
    });
  },
  error: function onError(progressEvent) {
    showMessage(getError(progressEvent.target));
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');

  navigator.serviceWorker.ready.then(function () {
    //window.location.reload();
  });
}