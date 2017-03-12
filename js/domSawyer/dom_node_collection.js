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
