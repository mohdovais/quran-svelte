function megabytes(bytes){
  return `${Math.round(bytes * 100/1048576)/100} MB`;
}

function kilobytes(bytes){
  return bytes < 1048576 ? `${Math.round(bytes * 100/1024)/100} KB` : megabytes(bytes);
}

export default function bytes(bytes){
  return bytes < 1024 ? `${bytes} B` : kilobytes(bytes);
}
