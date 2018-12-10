module.exports = function innerText(el, tags) {
  tags = tags || { p : '\n' };
  var html = el.innerHTML;
  html = html.replace(/&nbsp;/g, ' ');
  html = html.replace(/<(\/|br)*?>/gi, '\n');
  Object.keys( tags ).forEach(function(tag) {
    html = html.replace( new RegExp( '<' + tag + '>' , 'gi' ) , tags[tag] );
  });
  html = html.replace(/<(\/|.)*?>/gi, '');
  return html;
};