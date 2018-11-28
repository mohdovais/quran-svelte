import App from './components/App.html';
import store from './store.js';
import ajax from './ajax.js';
import byteSize from './byte-size.js';
import router from './router.js'

const preloader = document.getElementById('preloader');

function showMessage(message) {
  preloader.innerHTML = message;
};

showMessage('connecting server to load data...');

ajax({
  url: 'data/quran-simple.txt',
  progress: function onProgress(progressEvent) {
    var message;
    if (progressEvent.lengthComputable) {
      message = `${Math.round(progressEvent.loaded * 100/ progressEvent.total)}%`;
    } else {
      message = byteSize(progressEvent.loaded);
    }
    showMessage(`loading data ${message}`);
  },
  success: function onSuccess(progressEvent) {
    store.updateQuran(progressEvent.target.responseText.replace(/\r?\n|\r/g, '|').split('|'));
    preloader.remove();

    new App({
      target: document.body,
      store
    });
  },
  error: function onError(progressEvent) {
    const xhr = progressEvent.target;
    showMessage(xhr.statusText + ': ' + xhr.responseURL);
  }
});

router.init(store);
