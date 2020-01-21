var board,
  substit = '123456789'.split``.map(e => [e, Math.random()]).sort((a, b) => a[1]-b[1]).map(e => e[0]),
  rotat = arr => arr.map((e, i, a) => a.map(e => e[e.length-i-1]).join``),
  transform = arr => {
    var rotMode = Math.random(), mirrMode = Math.random();
    if (rotMode < .75) arr = rotat(arr);
    if (rotMode < .5) arr = rotat(arr);
    if (rotMode < .25) arr = rotat(arr);
    if (mirrMode < .5) arr = arr.map(e => e.split``.reverse().join``);
    return arr;
  },
  l = transform('000700000 100000000 000430200 000000006 000509000 000000418 000081000 002000050 040000300'.replace(/[1-9]/g, e => substit.indexOf(e)+1).split` `);
function example(){
  main(inp.value = l.join`\n`);
  b.click();
}
function zeroesInsrtd(x){
  var res = [0,0,0,0,0,0,0,0,0];
  for (var i = 0; i < 9; ++i) if (~x.indexOf(i+1)) res[i] = i+1;
  return res;
}
function presentNotes(x){
  return`<table class='i'>${zeroesInsrtd(x).join``.match(/.{1,3}/g).map(e=>`<tr>${e.split``.map(f=>`<td>${f!=0?`<b>${f}</b>`:'·'}</td>`).join``}</tr>`).join``}</table>`
}
function process(x){return x.split(/[ \n]/g).map(e=>e.split``.map(f=>+f));}
function display(x){
  a.innerHTML=`<table class='o'>${x.map((e,i)=>`<tr>${e.map((f,j)=>`<td${(~~(i/3)+~~(j/3))%2?" class='g'":''}>${f!=0?(f.length>1?presentNotes(f):`<b>${f}</b>`):''}</td>`).join``}</tr>`).join``}</table>`;
}
function initNotes(w, x, y){
  var X = ~~(x/3)*3,
  Y = ~~(y/3)*3,
  sli = idx => w[idx].slice(Y, Y+3),
  nays = [
    w[x],
    w.map(e => e[y]),
    sli(X),
    sli(X+1),
    sli(X+2)
  ].flat().filter((e,i,a) => i === a.indexOf(e) && e);
  return [1,2,3,4,5,6,7,8,9].filter(e => nays.indexOf(e) < 0);
}
function main(input){
  if (!input || input.replace(/(\d{9}[ \n]){8}\d{9}/,'').length) {
    b.disabled = true;
    return;
  } else b.disabled = false;
  board = process(input);
  board = board.map(
    (e,i) => e.map(
      (f,j) => f != 0 ? f : initNotes(board, i, j)
    )
  );
}