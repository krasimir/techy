module.exports = function(funcs, scope) {
    (function next() {
          if(funcs.length > 0) {
              funcs.shift().apply(scope || {}, [next].concat(Array.prototype.slice.call(arguments, 0)));
          }
    })();
};