const DomSawyer = require('./dom_node_collection');

const _eventQueue = [];
let _docReady = false;

window.$d = (arg) => {
  switch(typeof arg) {
    case "function":
      return registerDocReadyCallback(arg);
    case "string":
      return getNodesFromDom(arg);
    case "object":
      if (arg instanceof HTMLElement) {
        return new DomSawyer(arg);
      }
  }
};

$d.extend = (...args) => {
  const firstObject = args[0];
  args.slice(1).forEach(arg => {
    Object.keys(arg).forEach(key => {
      firstObject[key] = arg[key];
    });
  });
  return firstObject;
};



$d.ajax = function (options) {

  return new Promise( (resolve, reject) => {
    const defaults = {
      method: 'get',
      url: '',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {},
      success: () => {},
      error: () => {},
      dataType: 'jsonp'
    };
    $d.extend(defaults, options);

    const xhr = new XMLHttpRequest();
    xhr.open(defaults.method, defaults.url);
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        defaults.success(xhr.response);
        resolve(xhr.response);
      } else {
        defaults.error(xhr.response);
        reject(xhr.responseText);
      }
    };
    xhr.send(JSON.stringify(defaults.data));
  });
};


toQueryString = obj => {
  let result = "";
  for(let prop in obj){
    if (obj.hasOwnProperty(prop)){
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};

getNodesFromDom = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodes_array = Array.from(nodes);
  return new DomSawyer(nodes_array);
};

registerDocReadyCallback = func => {
  if(!_docReady){
    _eventQueue.push(func);
  } else {
    func();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _eventQueue.forEach( func => func() );
});
