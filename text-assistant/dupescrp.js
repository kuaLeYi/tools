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