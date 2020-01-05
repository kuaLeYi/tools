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
    for (i = y.length-1; ~i; --i) {
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