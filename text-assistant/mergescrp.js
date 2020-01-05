mergenduma.onclick = e => {
  e = mergenduma.value;
  mergecounta.innerHTML = e ? e.split`\n`.length : 0;
}
mergendumb.onclick = e => {
  e = mergendumb.value;
  mergecountb.innerHTML = e ? e.split`\n`.length : 0;
}
mergenduma.oninput = mergenduma.click;
mergendumb.oninput = mergendumb.click;
function merge() {
  var a = x => x.value, pre = a(mergepre), duma = a(mergenduma).split`\n`, lena = duma.length, dlm = a(mergedlm), dumb = a(mergendumb).split`\n`, lenb = dumb.length, suf = a(mergesuf), v = a(mergev), joinw = a(mergejoinw).replace(/\\x/g,'\n'), result = [];
  for (var i = 0; i < lena || i < lenb; ++i) result.push(pre+(i < lena ? duma[i] : v)+dlm+(i < lenb ? dumb[i] : v)+suf);
  outp.value = result.join(joinw);
  fcs();
}