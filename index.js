var unescape = require('lodash.unescape');

module.exports = function innerText(source, options) {
  options = options || {};
  var tags = options.tags || { p : '\n', br: '\n' };
  var html = typeof source === 'string' ? source : source.innerHTML;
  html = html.replace(/&nbsp;/g, ' ');
  Object.keys( tags ).forEach(function(tag) {
    // NOTE: replace selected tags with new lines
    //       https://regex101.com/r/Re5LGS/1
    html = html.replace( new RegExp( `<${tag}[^>]*>` , 'gmi' ) , tags[tag] );
  });
  // NOTE: remove all closing tags and any other tags
  //       https://regex101.com/r/UJrBXH/1
  html = html.replace(/<\/?[^>]*>/gmi, '');
  return unescape( html );
};
