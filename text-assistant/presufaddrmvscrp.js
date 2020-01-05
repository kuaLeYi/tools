function preSufAdd() {
  outp.value = outplines().map(e => presufa.value + e + presufb.value).join`\n`;
  fcs();
}

function preSufRmv() {
  outp.value = outplines().map(e => e.replace(new RegExp('^'+presufc.value), '').replace(new RegExp(presufd.value+'$'), '')).join`\n`;
  fcs();
}