module.exports = function innerText(el, tags) {
  tags = tags || ['p'];
  var html = el.innerHTML;
  html = html.replace(/&nbsp;/g, ' ');
  html = html.replace(/<(\/|br)*?>/gi, '\n');
  if ( tags && tags.length > 0 ) {
    tags.forEach(function(tag) {
      html = html.replace( new RegExp( '<' + tag + '>' , 'gi' ) , '\n');
    });
  }
  html = html.replace(/<(\/|.)*?>/gi, '');
  return html;
};