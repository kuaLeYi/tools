function extractDlmCol() {
  navigateBttm(bttmdlmcolxtrac);
  var n = dlmcolxtracnum.value, d = colxtracdlmr.value;
  dlmcolxtracres.value = outplines().map(e => n > 0 && n%1 === 0 ? e.split(d)[n-1] : '').join`\n`;
}