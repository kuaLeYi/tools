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

var TLN={eventList:{},update_line_numbers:function(a,b){var c=a.value.split`\n`.length-b.children.length;if(0<c){for(var d=document.createDocumentFragment();0<c;){var e=document.createElement('span');e.className='tln-line';d.appendChild(e);c--}b.appendChild(d)}for(;0>c;)b.removeChild(b.firstChild),c++},append_line_numbers:function(a){var b=document.getElementById(a);if(null==b)return console.warn('[tln.js] Couldn\'t find textarea of id \''+a+'\'');b.classList.add('tln-active');b.style={};b.style.whiteSpace='pre';b.previousSibling.remove();var c=document.createElement('div');b.parentNode.insertBefore(c,b);c.className='tln-wrapper';TLN.update_line_numbers(b,c);TLN.eventList[a]=[];for(var d=['propertychange','input','keydown','keyup'],e=function(b,c){return function(a){if(10==+b.scrollLeft&&(37==a.keyCode||37==a.which||'ArrowLeft'==a.code||'ArrowLeft'==a.key)||36==a.keyCode||36==a.which||'Home'==a.code||'Home'==a.key||13==a.keyCode||13==a.which||'Enter'==a.code||'Enter'==a.key||'NumpadEnter'==a.code)b.scrollLeft=0;TLN.update_line_numbers(b,c)}}(b,c),f=d.length-1;0<=f;f--)b.addEventListener(d[f],e),TLN.eventList[a].push({evt:d[f],hdlr:e});d=['change','mousewheel','scroll'];c=function(a,b){return function(){b.scrollTop=a.scrollTop}}(b,c);for(e=d.length-1;0<=e;e--)b.addEventListener(d[e],c),TLN.eventList[a].push({evt:d[e],hdlr:c})},remove_line_numbers:function(a){var b=document.getElementById(a);if(null==b)return console.warn('[tln.js] Couldn\'t find textarea of id \''+a+'\'');if(-1==b.className.indexOf('tln-active'))return console.warn('[tln.js] textarea of id \''+a+'\' isn\'t numbered');b.style.whiteSpace='normal';b.previousSibling.innerHTML='';if(TLN.eventList[a]){for(var c=TLN.eventList[a].length-1;0<=c;c--){var d=TLN.eventList[a][c];b.removeEventListener(d.evt,d.hdlr)}delete TLN.eventList[a]}}};
function wrapoutp(x){
  if (x) TLN.remove_line_numbers('outp');
  else TLN.append_line_numbers('outp');
}
wrapoutp(!1);

frenrgx.onclick = () => {
  yscontainer.innerHTML = frenrgx.checked ? `<input class='gdinp gdinp80p'id='frfindys'>` : `<textarea class='nicerarea'id='frfindys'></textarea>`;
  frrgxhelp.classList.toggle('invis');
}
function findReplace() {
  var n, v = frfindys.value, x = new RegExp(frenrgx.checked ? v : v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), (frglobm.checked ? 'g' : '')+(frcass.checked ? '' : 'i'));
  frnum.innerHTML = (n = outp.value.match(x) || '').length+' instance(s) found and replaced';
  outp.value = outp.value.replace(x, frrplcw.value);
  fcs();
}

var txtcouclls = document.getElementsByClassName('txtcoucll'), txtcoufreqInfo = [], wCouKeys;
function getTxtUpToCurAndSelAndAll() {
  var o = outp.value, t = '', acE = document.activeElement, acETag = acE ? acE.tagName.toLowerCase() : null;
  if (acE == 'textarea') t = acE.value.slice(acE.selectionStart, acE.selectionEnd);
  else if (window.getSelection) t = window.getSelection().toString();
  return [o.slice(0, outp.selectionStart), t, o];
}
outp.oninput = outp.onclick = outp.onselectionchange = txtcounospc.onclick = txtcounobrk.onclick = txtcousplck.onclick = () => {
  var x, y, couW = (z, Z) => {
    z = z.match(new RegExp(`[\\w${addnlwch.value.replace(/\s/g, '')}]+`, 'g'));
    if (Z) y = z;
    return z ? z.length : 0;
  }, couL = x => x ? x.split`\n`.length : 0, texts = getTxtUpToCurAndSelAndAll(), wCous = {};
  outp.spellcheck = txtcousplck.checked ? !0 : !1;
  result = texts.map((e, i) => {
    if (txtcounotag.checked) e = e.replace(/<.+>/g, '');
    var one = e.length;
    if (txtcounospc.checked) {
      let q = e.match(/\s/g);
      one -= q ? q.length : 0;
    }
    if (txtcounobrk.checked) {
      let q = e.match(/\n/g);
      one -= q ? q.length : 0;
    }
    return [one, i > 1 ? couW(e, 1) : couW(e), couL(e)];
  }).flat();
  result.splice(3, 0, texts[0].split`\n`.slice(-1)[0].length);
  for (var i = 0; i < txtcouclls.length; ++i) txtcouclls[i].innerHTML = result[i];
  if (y) {
    for (var i = y.length-1; ~i; --i) {
      var m = y[i];
      wCous[m] = wCous[m] ? wCous[m]+1 : 1;
    }
    txtcoufreqInfo = Object.keys(wCous).map(e => [e, wCous[e]]).sort((a, b) => b[1]-a[1]).map((e, i) => [i, e[0], e[1], (e[1]/y.length*100).toFixed(2)]);
    wCouKeys = txtcoufreqInfo.map(e => e[1]);
  }
  txtcoufreq.innerHTML = y ? txtcoufreqInfo.map(e => `<li class='freqcounted'id='freqcounted${e[0]}'>${e[1]} ${e[2]} ${e[3]}%</li>`).join`` : '';
};
txtcoucust.oninput = txtcoucustcass.onclick = () => {
  var v = txtcoucust.value, res, matches;
  if (!v) res = 'N/A';
  else {
    matches = outp.value.match(new RegExp(txtcoucust.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), txtcoucustcass.checked ? 'g' : 'gi'));
    res = matches ? matches.length : 0;
  }
  txtcoucustres.innerHTML = res;
}
function findInWordFreq() {
  var i = wCouKeys.indexOf(txtcoufreqsrch.value), lifchl;
  if (i < 0) return;
  lifchl = document.querySelector('li.freqcounted.hilite');
  if (lifchl) lifchl.classList.remove('hilite');
  document.getElementById('freqcounted'+txtcoufreqInfo[i][0]).classList.add('hilite');
}

function extractDlmCol() {
  navigateBttm(bttmdlmcolxtrac);
  var n = dlmcolxtracnum.value, d = colxtracdlmr.value;
  dlmcolxtracres.value = outplines().map(e => n > 0 && n%1 == 0 ? e.split(d)[n-1] : '').join`\n`;
}

function undupe() {
  var s = dupesensitive.checked, rE = dupermvempty.checked, o = outplines(), ocopy = o.slice(0), result = [], tempidx;
  for (var i in o) {
    tempidx = (s ? o : o.map(e => e.toLowerCase())).indexOf(s ? o[i] : o[i].toLowerCase());
    if (rE && o[i] === '') result.push((+i+1)+' empty: ');
    if (i != tempidx) if (o[i] !== '') result.push((+i+1)+' duplicate of '+(tempidx+1)+': '+o[i]);
  }
  if (!s) o = o.map(e => e.toLowerCase());
  if (rE) o = o.filter(e => e !== '');
  outp.value = o.filter((e, i, a) => i === a.indexOf(e) || e === '').join`\n`;
  fcs();
  dupedisp.value = result.length+' line(s) removed.\n'+result.join`\n`;
}

function removeEmpAndWspLin() { outp.value = outplines().filter(e => !e.match(/^(\s+|)$/)).join`\n`; }

function sortTextLines(n) {
  var o = outplines(), comp;
  if (n < 5) {
    switch (n) {
      case 1:
      comp = (a, b) => (a = a.toLowerCase()) < (b = b.toLowerCase()) ? -1 : (a > b ? 1 : 0);
      break;
    case 2:
      comp = (a, b) => a < b ? -1 : (a > b ? 1 : 0);
      break;
    case 3:
    case 4:
      var x = o.map(e => {
        var E = e.match(/\d+/g);
        if (E) return E.map(f => f.length);
        else return [0];
      }).flat().sort((a, b) => b-a)[0],
        pad = n => ('0'.repeat(x)+n).slice(-x),
        expand = a => a.replace(/\d+/g, pad);
      comp = (a, b) => {
        var A = expand(a), B = expand(b);
        if (n < 4) [A, B] = [A.toLowerCase(), B.toLowerCase()];
        return A < B? -1 : (A > B ? 1 : 0);
      };
    }
  } else comp = (a, b) => a.length-b.length;
  outp.value = o.sort(comp).join`\n`;
  fcs();
}
function shuffleTextLines() {
  var array = outplines();
  for (let i = array.length-1; i > 0; --i) {
    const j = ~~(Math.random()*(i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  outp.value = array.join`\n`;
  fcs();
}
function reverseTextLines() {
  outp.value = outplines().reverse().join`\n`;
  fcs();
}

var defaultMap = [
  {'b':'A', 'l':'\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F'},
  {'b':'AA','l':'\uA732'},
  {'b':'AE','l':'\u00C6\u01FC\u01E2'},
  {'b':'AO','l':'\uA734'},
  {'b':'AU','l':'\uA736'},
  {'b':'AV','l':'\uA738\uA73A'},
  {'b':'AY','l':'\uA73C'},
  {'b':'B', 'l':'\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181'},
  {'b':'C', 'l':'\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E'},
  {'b':'D', 'l':'\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\u00D0'},
  {'b':'DZ','l':'\u01F1\u01C4'},
  {'b':'Dz','l':'\u01F2\u01C5'},
  {'b':'E', 'l':'\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E'},
  {'b':'F', 'l':'\u0046\u24BB\uFF26\u1E1E\u0191\uA77B'},
  {'b':'G', 'l':'\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E'},
  {'b':'H', 'l':'\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D'},
  {'b':'I', 'l':'\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197'},
  {'b':'IJ','l':'\u0132'},
  {'b':'J', 'l':'\u004A\u24BF\uFF2A\u0134\u0248'},
  {'b':'K', 'l':'\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2'},
  {'b':'L', 'l':'\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780'},
  {'b':'LJ','l':'\u01C7'},
  {'b':'Lj','l':'\u01C8'},
  {'b':'M', 'l':'\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C'},
  {'b':'N', 'l':'\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4'},
  {'b':'NJ','l':'\u01CA'},
  {'b':'Nj','l':'\u01CB'},
  {'b':'O', 'l':'\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C'},
  {'b':'OI','l':'\u01A2'},
  {'b':'OO','l':'\uA74E'},
  {'b':'OU','l':'\u0222'},
  {'b':'OE','l':'\u008C\u0152'},
  {'b':'oe','l':'\u009C\u0153'},
  {'b':'P', 'l':'\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754'},
  {'b':'Q', 'l':'\u0051\u24C6\uFF31\uA756\uA758\u024A'},
  {'b':'R', 'l':'\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782'},
  {'b':'S', 'l':'\u0053\u24C8\uFF33\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784'},
  {'b':'SS','l':'\u1E9E'},
  {'b':'T', 'l':'\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786'},
  {'b':'TZ','l':'\uA728'},
  {'b':'U', 'l':'\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244'},
  {'b':'V', 'l':'\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245'},
  {'b':'VY','l':'\uA760'},
  {'b':'W', 'l':'\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72'},
  {'b':'X', 'l':'\u0058\u24CD\uFF38\u1E8A\u1E8C'},
  {'b':'Y', 'l':'\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE'},
  {'b':'Z', 'l':'\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762'},
  {'b':'a', 'l':'\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250'},
  {'b':'aa','l':'\uA733'},
  {'b':'ae','l':'\u00E6\u01FD\u01E3'},
  {'b':'ao','l':'\uA735'},
  {'b':'au','l':'\uA737'},
  {'b':'av','l':'\uA739\uA73B'},
  {'b':'ay','l':'\uA73D'},
  {'b':'b', 'l':'\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253'},
  {'b':'c', 'l':'\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184'},
  {'b':'d', 'l':'\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A\u00F0'},
  {'b':'dz','l':'\u01F3\u01C6'},
  {'b':'e', 'l':'\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD'},
  {'b':'f', 'l':'\u0066\u24D5\uFF46\u1E1F\u0192\uA77C'},
  {'b':'g', 'l':'\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F'},
  {'b':'h', 'l':'\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265'},
  {'b':'hv','l':'\u0195'},
  {'b':'i', 'l':'\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131'},
  {'b':'ij','l':'\u0133'},
  {'b':'j', 'l':'\u006A\u24D9\uFF4A\u0135\u01F0\u0249'},
  {'b':'k', 'l':'\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3'},
  {'b':'l', 'l':'\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747'},
  {'b':'lj','l':'\u01C9'},
  {'b':'m', 'l':'\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F'},
  {'b':'n', 'l':'\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5'},
  {'b':'nj','l':'\u01CC'},
  {'b':'o', 'l':'\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275'},
  {'b':'oi','l':'\u01A3'},
  {'b':'ou','l':'\u0223'},
  {'b':'oo','l':'\uA74F'},
  {'b':'p','l':'\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755'},
  {'b':'q','l':'\u0071\u24E0\uFF51\u024B\uA757\uA759'},
  {'b':'r','l':'\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783'},
  {'b':'s','l':'\u0073\u24E2\uFF53\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B'},
  {'b':'ss','l':'\u00DF'},
  {'b':'t','l':'\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787'},
  {'b':'tz','l':'\uA729'},
  {'b':'u','l': '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289'},
  {'b':'v','l':'\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C'},
  {'b':'vy','l':'\uA761'},
  {'b':'w','l':'\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73'},
  {'b':'x','l':'\u0078\u24E7\uFF58\u1E8B\u1E8D'},
  {'b':'y','l':'\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF\u028F'},
  {'b':'z','l':'\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'}
];
var map = {};
for (var i = 0; i < defaultMap.length; ++i){
  var l = defaultMap[i].l;
  for (var j = 0; j < l.length; ++j){
    map[l[j]] = defaultMap[i].b;
  }
}
function removeDiacritics() {
  var numReplcd = 0;
  outp.value = outp.value.replace(/[^\u0000-\u007E]/g, a => { numReplcd++; return map[a] || a; });
  navigateBttm(bttmdiacritic);
  bttmdiacritic.innerHTML = `${numReplcd} character(s) replaced`;
  fcs();
}

function spaceRemoval() {
  var o = outp.value,
    len = o.length,
    how = +document.querySelectorAll('input[name=rmvspchow]:checked')[0].value,
    leadtrail = rmvspcleadtrail.checked;
  if (how) o = o.replace(/\s/g, '');
  else o = o.replace(/\s{2,}/g, ' ');
  o = o.split`\n`;
  if (leadtrail) o = o.map(e => e.trim());
  outp.value = o = o.join`\n`;
  fcs();
  bttmbadspaceend.innerHTML = `${len-o.length} space(s) removed`;
}

function ordinalInt() {
  var res = '', x = +ordinallow.value, y = +ordinalhigh.value, z;
  if (x > y) [x, y] = [y, x];
  if (y-x < 1e4) {
    for (var i = Math.ceil(+x); i <= Math.floor(y); ++i)
      res += i+((z = Math.abs(i)) <= 13 && z >= 11 ? 'th' : 'thstndrdthththththth'.match(/.{1,2}/g)[Math.abs(i%10)])+'\n';
  } else res = 'Range too big';
  outp.value = res;
  fcs();
}

var stopwatch, ti, baseti, splittis = [];
function zerolp(x, num) { return ('0'.repeat(num-1)+x).slice(-num); }
function strngfytime(x) {
  return `${zerolp((x/1000|0)/60|0, 2)} min ${zerolp((x/1000|0)%60, 2)} s ${zerolp(x%1000, 3)} ms`;
}
timewatch.innerHTML = strngfytime(0);
function strtwatch() {
  outp.readonly = !0;
  splitwc.disabled = !1;
  baseti = +new Date();
  stopwatch = setInterval(function(){
    timewatch.innerHTML = strngfytime(ti = +new Date()-baseti);
  });
}
function spltwatch() {
  splittis.unshift(strngfytime(ti));
  outp.value = splittis.join`\n`;
}
function rstwatch() {
  clearInterval(stopwatch);
  outp.value = '';
  outp.readonly = !1;
  splitwc.disabled = !0;
  timewatch.innerHTML = strngfytime(0);
}

function preSufAdd() {
  outp.value = outplines().map(e => presufa.value + e + presufb.value).join`\n`;
  fcs();
}

function preSufRmv() {
  outp.value = outplines().map(e => e.replace(new RegExp('^'+presufc.value), '').replace(new RegExp(presufd.value+'$'), '')).join`\n`;
  fcs();
}

function letterCase(n) {
  var o = outp.value, p, res;
  switch (n) {
    case 1:
      res = o.toUpperCase();
      break;
    case 2:
      res = o.toLowerCase();
      break;
    case 3:
      res = o.split``.map(e => Math.random() < .5 ? e.toUpperCase() : e.toLowerCase()).join``;
      break;
    case 4:
      res = o.replace(new RegExp(`[\\w${addnlwch.value.replace(/\s/g, '')}]+`, 'g'), e => e.charAt().toUpperCase()+e.slice(1));
  }
  outp.value = res;
  fcs();
}

mergenduma.onclick = e => {
  e = mergenduma.value;
  mergecounta.innerHTML = e ? e.split`\n`.length : 0;
}
mergendumb.onclick = e => {
  e = mergendumb.value;
  mergecountb.innerHTML = e ? e.split`\n`.length : 0;
}
mergenduma.oninput = mergenduma.click;
mergendumb.oninput = mergendumb.click;
function merge() {
  var a = x => x.value, pre = a(mergepre), duma = a(mergenduma).split`\n`, lena = duma.length, dlm = a(mergedlm), dumb = a(mergendumb).split`\n`, lenb = dumb.length, suf = a(mergesuf), v = a(mergev), joinw = a(mergejoinw).replace(/\\x/g,'\n'), result = [];
  for (var i = 0; i < lena || i < lenb; ++i) result.push(pre+(i < lena ? duma[i] : v)+dlm+(i < lenb ? dumb[i] : v)+suf);
  outp.value = result.join(joinw);
  fcs();
}

ctningenrgx.onclick = () => {
  var ch = ctningenrgx.checked;
  ctningrgxhelp.classList.toggle('invis');
  ctningcontainer.innerHTML = ch ? `<input class='gdinp gdinp80p'id='ctningsearch'>` : `<textarea class='nicerarea'id='ctningsearch'></textarea><br>Search items must be delimited by a newline.<br>How to combine the search items: <label><input type='radio'name='ctningsearchow'value=0 checked>AND</label><label><input type='radio'name='ctningsearchow'value=1>OR</label>`;
}
function ctningDo(n) {
  var q = document.querySelectorAll('input[name=ctningsearchow]:checked').length, how, v = ctningsearch.value, x, o = outplines(), dispResult = [], lend, leno = o.length;
  if (q) how = +document.querySelectorAll('input[name=ctningsearchow]:checked')[0].value;
  x = new RegExp(ctningenrgx.checked ? v : (how ? '' : '(?=.*')+v.split`\n`.map(e => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).join(how ? '|' : ')(?=.*')+(how ? '' : ').*'), ctningcass.checked ? '' : 'i');
  o = o.filter(e => {
    var truthy = x.test(e);
    if (!n) truthy = !truthy;
    if (!truthy) dispResult.push(e);
    return truthy;
  });
  lend = dispResult.length;
  outp.value = o.join`\n`;
  ctningdisp.value = dispResult.join`\n`;
  ctningdonenum.innerHTML = `${lend} removed, ${leno-lend} remaining. `;
}