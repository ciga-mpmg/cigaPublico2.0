export function debounce(func, wait = 100, immediate) {
   let timeout = null;

   return (...args) => {
      const context = this;

      const later = () => {
         timeout = null;
         !immediate && func.apply(context, args);
      };

      const callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
   };
}
