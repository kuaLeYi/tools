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

function removeEmpAndWspLin() { outp.value = outplines().filter(e => !e.match(/^(\s+|)$/)).join`\n`; }