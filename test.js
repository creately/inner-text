const test = require('tape');
const innerText = require('./index');

[
  {
    title: 'should return an empty string for empty input',
    source: '',
    result: '',
  },
  {
    title: 'should replace <br/> tag with newline',
    source: 'hello<br/>world',
    result: 'hello\nworld',
  },
  {
    title: 'should replace <br/> tag with given replace empty string',
    source: 'hello<br/>world',
    options: { tags: { br : '' } },
    result: 'helloworld',
  },
  {
    title: 'should replace <br/> tag with given replace new lines',
    source: 'hello<br/>world',
    options: { tags: { br : '\n\n' } },
    result: 'hello\n\nworld',
  },
  {
    title: 'should not replace <div> if div tag is not specified',
    source: 'hello<div>world</div>',
    result: 'helloworld',
  },
  {
    title: 'should not replace <p> if second param is defined but p tag is excluded',
    source: 'hello<p style="width:23">world</p>',
    options: { tags: { div : '\n' } },
    result: 'helloworld',
  },
  {
    title: 'should replace <div> if second param is defined and div tag is included',
    source: 'hello<div style="width:23">world</div>',
    options: { tags: { div : '\n\n\n' }},
    result: 'hello\n\n\nworld',
  },
  {
    title: 'should replace <div> and <p> if second param is defined and both div and p taga are included',
    source: 'hello<div>world</div>hi<p style="width:23">there</p>',
    options: { tags: { div : '\n', p : '\n' } },
    result: 'hello\nworldhi\nthere',
  },
  {
    title: 'should replace <p> with newline',
    source: 'hello<p>world</p>',
    result: 'hello\nworld',
  },
  {
    title: 'should replace <p> with newline when multiple p tags',
    source: 'hello<p>world</p><p>hi</p>',
    result: 'hello\nworld\nhi',
  },
  {
    title: 'should remove "&nbsp;" with space',
    source: 'hello&nbsp;world',
    result: 'hello world',
  },

  {
    title: 'should remove remaining html tags',
    source: 'hello<div>world</div><br><span class="important"><em>inner</em>Text</span>',
    result: 'helloworld\ninnerText',
  },
  {
    title: 'complex html',
    source: '<p style="width:23">Hello<span style="color: red" >w</span></p><div id="some_id" class="some_class">World</div>',
    options: { tags: { div : '\n', p : '\n', br: '\n' }},
    result: '\nHellow\nWorld',
  },
  {
    title: 'complex html with entities that should be unescaped',
    source: '<p style="width:23">Hello<span style="color: red" >w</span></p><div id="some_id" class="some_class">!@#$%^&*()<>_+-={}|\:;"<>,./   `~</div>',
    options: { tags: { div : '\n', p : '\n', br: '\n' }},
    result: '\nHellow\n!@#$%^&*()<>_+-={}|\:;"<>,./   `~',
  },
].forEach( data => {
  test( data.title, t => {
    const args = data.options ? [ data.options ] : [];
    const body = document.querySelector('body');
    body.innerHTML = data.source;
    t.equal(innerText(data.source, ...args), data.result);
    t.equal(innerText(body, ...args), data.result);
    t.end();
  });
});
