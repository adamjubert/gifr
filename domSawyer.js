/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DomSawyer {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  addClass(className) {
    this.htmlElements.forEach(el => {
      el.classList.add(className);
    });
  }

  removeClass(className) {
    this.htmlElements.forEach(el => {
      el.classList.remove(className);
    });
  }

  hasClass(className) {
    return this.htmlElements[0].classList.contains(className);
  }

  classList(className) {
    return this.htmlElements[0].classList;
  }




  append(arg) {
    if (typeof arg === "string") {
      this.each((el) => ( el.innerHTML += arg ));
    } else if (typeof arg === "object") {
      this.each((el) => (
        arg.each((argument) => ( el.innerHTML += argument.outerHTML ) )
      ));
    }
  }

  attr(key, val) {
    if (typeof val === "string") {
      this.each( el => el.setAttribute(key, val) );
    } else {
      return this.htmlElements[0].getAttribute(key);
    }
  }

  children() {
    let children = [];
    this.each(el => {
      const childElementList = el.children;
      children = children.concat(Array.from(childElementList));
    });
    return new DomSawyer(children);
  }

  toggleClass(className) {
    this.htmlElements.forEach(el => {
      el.classList.toggle(className);
    });
  }

  each(callback) {
    this.htmlElements.forEach(callback);
  }

  elements() {
    return this.htmlElements;
  }


  empty() {
    this.each((el) => (el.innerHTML = ""));
  }

  find(selector) {
    let foundElements = [];
    this.each(el => {
      const elList = el.querySelectorAll(selector);
      foundElements = foundElements.concat(Array.from(elList));
    });
    return new DomSawyer(foundElements);
  }

  first() {
    let children = [];
    this.htmlElements.forEach(el => {
      children = children.concat(Array.from(el.children));
    });
    return new DomSawyer(children.slice(0, 1));
  }

  html(str) {
    if (str) {
      this.each((el) => (el.innerHTML = str));
    } else {
      return this.htmlElements[0].innerHTML;
    }
  }

  last() {
    let children = [];
    this.htmlElements.forEach(el => {
      children = children.concat(Array.from(el.children));
    });
    return new DomSawyer(children.slice(-1));
  }

  length() {
    return this.htmlElements.length;
  }

  on(eventName, callback) {
    this.each(el => {
      el.addEventListener(eventName, callback);
      const key = `DomSawyerEvents-${eventName}`;
      if (typeof el[key] === "undefined") {
        el[key] = [];
      }
      el[key].push(callback);
    });
  }

  off(eventName) {
    this.each(el => {
      const eventKey = `DomSawyerEvents-${eventName}`;
      if (el[eventKey]) {
        el[eventKey].forEach(callback => {
          el.removeEventListener(eventName, callback);
        });
      }
      el[eventKey] = [];
    });
  }

  parent() {
    const parentElements = [];

    this.each(( el ) => {
      if (el.parentElement.visited === undefined) {
        parentElements.push(el.parentElement);
        el.parentElement.visited = true;
      }
    });

    parentElements.forEach((el) => (el.visited = false));
    return new DomSawyer(parentElements);
  }

  remove() {
    this.each(el => el.parentElement.removeChild(el));
  }

}

module.exports = DomSawyer;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DomSawyer = __webpack_require__(0);

const _eventQueue = [];
let _docReady = false;

window.$ds = (arg) => {
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

$ds.extend = (...args) => {
  const firstObject = args[0];
  args.slice(1).forEach(arg => {
    Object.keys(arg).forEach(key => {
      firstObject[key] = arg[key];
    });
  });
  return firstObject;
};



$ds.ajax = function (options) {

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
    $ds.extend(defaults, options);

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


/***/ })
/******/ ]);