var unescape = require('lodash/unescape');
module.exports = function innerText(el, options) {
  options = options || {};
  var tags = options.tags || { p : '\n', br: '\n' };
  var html = el.innerHTML;
  html = html.replace(/&nbsp;/g, ' ');
  Object.keys( tags ).forEach(function(tag) {
    // https://regex101.com/r/EtQdlD/3
    html = html.replace( new RegExp( '<' + tag + '(>|.*?[^?]>)' , 'gi' ) , tags[tag] );
  });
  html = html.replace(/<(\/|.)*?>/gi, '');
  return unescape( html );
};