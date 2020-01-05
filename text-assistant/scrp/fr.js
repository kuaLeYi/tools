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