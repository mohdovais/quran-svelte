import {
  assign
} from './object';
import byteSize from './byte-size.js';

export default function ajax(config) {
  return doAJAX(getXHR(), applyConfig(config));
}

function readyStateDone(progressEvent, config) {
  return progressEvent.target.status < 400 ?
    config.success(progressEvent) :
    config.error(progressEvent);
}

function onReadyStateChange(progressEvent, config) {
  return (
    progressEvent.target.readyState === 4 &&
    readyStateDone(progressEvent, config)
  )
}

function applyConfig(config) {
  return assign({}, config);
}

function getXHR() {
  return new XMLHttpRequest();
}

function doAJAX(xhr, config) {
  xhr.onprogress = config.progress;
  xhr.onreadystatechange = function onreadystatechange(progressEvent){
    onReadyStateChange(progressEvent, config);
  };
  xhr.open(config.method || 'GET', config.url, true);
  xhr.send(config.data);
  return xhr;
}

export function getProgress(loaded, total) {
  return total === 0 ?
    byteSize(loaded) :
    `${Math.round(loaded * 100/ total)}%`;
}

export function getError(xhr) {
  return xhr.statusText + ': ' + xhr.responseURL
}