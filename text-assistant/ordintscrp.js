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