function navigateBttm(x) {
  document.getElementsByClassName('visible')[0].classList.remove('visible');
  x.classList.add('visible');
}

function fcs() { outp.focus(); }

function outplines() { return outp.value.split`\n`; }

function abt() { navigateBttm(bttmdefault); }

function handleFileSelect(evt) {
  var targele = document.getElementById(this.id.slice(5));
  var f = evt.target.files[0], reader = new FileReader();
  reader.onload = (function(x) {
    return e => {
      targele.value = e.target.result;
      targele.focus();
      targele.click();
    };
  })(f);
  reader.readAsText(f);
}
var className = document.getElementsByClassName('customupload');
for (var i = 0; i < className.length; ++i) className[i].addEventListener('change', handleFileSelect, !1);

function download(data, filename) {
  if (!filename && !confirm('Filename not specified. Continue?')) return;
  var file = new Blob([data]);
  if (window.navigator.msSaveOrOpenBlob)
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    var a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

function ctrla() { outp.select(); }
function clearoutp() {
  if (!confirm('Really clear the main field?')) return;
  outp.value = '';
  outp.focus();
}

var TLN={eventList:{},update_line_numbers:function(a,b){var c=a.value.split`\n`.length-b.children.length;if(0<c){for(var d=document.createDocumentFragment();0<c;){var e=document.createElement('span');e.className='tln-line';d.appendChild(e);c--}b.appendChild(d)}for(;0>c;)b.removeChild(b.firstChild),c++},append_line_numbers:function(a){var b=document.getElementById(a);if(null===b)return console.warn('[tln.js] Couldn\'t find textarea of id \''+a+'\'');b.classList.add('tln-active');b.style={};b.style.whiteSpace='pre';b.previousSibling.remove();var c=document.createElement('div');b.parentNode.insertBefore(c,b);c.className='tln-wrapper';TLN.update_line_numbers(b,c);TLN.eventList[a]=[];for(var d=['propertychange','input','keydown','keyup'],e=function(b,c){return function(a){if(10==+b.scrollLeft&&(37==a.keyCode||37==a.which||'ArrowLeft'==a.code||'ArrowLeft'==a.key)||36==a.keyCode||36==a.which||'Home'==a.code||'Home'==a.key||13==a.keyCode||13==a.which||'Enter'==a.code||'Enter'==a.key||'NumpadEnter'==a.code)b.scrollLeft=0;TLN.update_line_numbers(b,c)}}(b,c),f=d.length-1;0<=f;f--)b.addEventListener(d[f],e),TLN.eventList[a].push({evt:d[f],hdlr:e});d=['change','mousewheel','scroll'];c=function(a,b){return function(){b.scrollTop=a.scrollTop}}(b,c);for(e=d.length-1;0<=e;e--)b.addEventListener(d[e],c),TLN.eventList[a].push({evt:d[e],hdlr:c})},remove_line_numbers:function(a){var b=document.getElementById(a);if(null===b)return console.warn('[tln.js] Couldn\'t find textarea of id \''+a+'\'');if(-1==b.className.indexOf('tln-active'))return console.warn('[tln.js] textarea of id \''+a+'\' isn\'t numbered');b.style.whiteSpace='normal';b.previousSibling.innerHTML='';if(TLN.eventList[a]){for(var c=TLN.eventList[a].length-1;0<=c;c--){var d=TLN.eventList[a][c];b.removeEventListener(d.evt,d.hdlr)}delete TLN.eventList[a]}}};
function wrapoutp(x){
  if (x) TLN.remove_line_numbers('outp');
  else TLN.append_line_numbers('outp');
}
wrapoutp(!1);