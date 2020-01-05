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