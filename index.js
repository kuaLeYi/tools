var board;
function example(){
  inp.value = '020017905\n000602310\n000009007\n000020053\n003060700\n190050000\n800300000\n039108000\n504270030';
  main(inp.value);
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