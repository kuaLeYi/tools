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