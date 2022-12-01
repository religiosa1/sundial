
export const handlerMap = new Map<Element, (el: Element) => void>();

export const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cb = handlerMap.get(entry.target);
        if (cb instanceof Function ) {
          cb(entry.target);
        }
      }
    });
  },
  {
    root: document.querySelector('body'),
    rootMargin: '0px',
    threshold: 1.0
  }
);