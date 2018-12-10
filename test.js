var test = require('tape');
var innerText = require('./index');


test('should replace <br/> tag with newline', function(t){

  var el = document.querySelector('body');

  el.innerHTML = 'hello<br/>world';

  var text = innerText(el);

  t.equal(text, 'hello\nworld');

  t.end();
});


test('should not replace <div> if div tag is not specified', function(t){

  var el = document.querySelector('body');

  el.innerHTML = 'hello<div>world</div>';

  var text = innerText(el);

  t.equal(text, 'helloworld');

  t.end();
});

test('should not replace <p> if second param is defined but p tag is excluded', function(t){

  var el = document.querySelector('body');

  el.innerHTML = 'hello<p>world</p>';

  var text = innerText(el, { div : '\n' });

  t.equal(text, 'helloworld');

  t.end();
});

test('should replace <div> if second param is defined and div tag is included', function(t){

  var el = document.querySelector('body');

  el.innerHTML = 'hello<div>world</div>';

  var text = innerText(el,{ div : '\n\n\n' });

  t.equal(text, 'hello\n\n\nworld');

  t.end();
});

test('should replace <div> and <p> if second param is defined and both div and p taga are included', function(t){

  var el = document.querySelector('body');

  el.innerHTML = 'hello<div>world</div>hi<p>there</p>';

  var text = innerText(el,{ div : '\n', p : '\n' });

  t.equal(text, 'hello\nworldhi\nthere');

  t.end();
});

test('should replace <p> with newline', function(t){

  var el = document.querySelector('body');

  el.innerHTML = 'hello<p>world</p>';

  var text = innerText(el);

  t.equal(text, 'hello\nworld');

  t.end();
});

test('should replace <p> with newline when multiple p tags', function(t){

  var el = document.querySelector('body');

  el.innerHTML = 'hello<p>world</p><p>hi</p>';

  var text = innerText(el);

  t.equal(text, 'hello\nworld\nhi');

  t.end();
});

test('should remove "&nbsp;" with space', function(t){

  var el = document.querySelector('body');

  el.innerHTML = 'hello&nbsp;world';

  var text = innerText(el);

  t.equal(text, 'hello world');

  t.end();
});


test('should remove remaining html tags', function(t){

  var el = document.querySelector('body');

  el.innerHTML = 'hello<div>world</div><br><span class="important"><em>inner</em>Text</span>';

  var text = innerText(el);

  t.equal(text, 'helloworld\ninnerText');

  t.end();
});