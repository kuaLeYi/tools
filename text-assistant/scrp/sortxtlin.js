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