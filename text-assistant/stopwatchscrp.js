var stopwatch, ti, baseti, splittis = [];
function zerolp(x, num) { return ('0'.repeat(num-1)+x).slice(-num); }
function strngfytime(x) {
  return `${zerolp((x/1000|0)/60|0, 2)} min ${zerolp((x/1000|0)%60, 2)} s ${zerolp(x%1000, 3)} ms`;
}
timewatch.innerHTML = strngfytime(0);
function strtwatch() {
  outp.readonly = !0;
  splitwc.disabled = !1;
  baseti = +new Date();
  stopwatch = setInterval(function(){
    timewatch.innerHTML = strngfytime(ti = +new Date()-baseti);
  });
}
function spltwatch() {
  splittis.unshift(strngfytime(ti));
  outp.value = splittis.join`\n`;
}
function rstwatch() {
  clearInterval(stopwatch);
  outp.value = '';
  outp.readonly = !1;
  splitwc.disabled = !0;
  timewatch.innerHTML = strngfytime(0);
}