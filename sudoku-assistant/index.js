var dg = "123456789".split``, mx = [...Array(9)].map(e => [...Array(9)]),
  // standard indices for box
  sBIs = [["00", "10", "20"], ["01", "11", "21"], ["01", "12", "22"]],
  dupCs, // array of duplicate cells' positions
  posX, posY,
  nModeBool = !1, selBool = !1, nTog = () => {
    if (!selBool) return;
    if (a3("nml").hasClass("lkd")) return;
    nModeBool = !nModeBool;
    $("#tlbarN").toggleClass("lit");
    f();
  };
$(".tipTog").click(function() {
  $(".tipTog").toggleClass("tipTogH");
  $(".tips").toggle();
});
function a() { return "#cl"+posX+""+posY; }
function a2() { return a()+" div div"; }
function a3(x) { return $(a()+" div ."+x); }
instaC.onclick = () => {
  $(".nml").each(function() {
    $(this).removeClass("lkd").html("");
  });
  cMx();
  $(".nt").each(function() {
    $(this).show();
    $("span.noted").removeClass("noted");
  });
  f();
};
ntAsst.onclick = () => {
  console.clear();
  $(".noted").removeClass("noted");
  var dg_ = dg.map(e => +e),
    // func to return specified 1 of 3 horizontal strips in specified box
    m = (x, y, z) => {
      var l = ~~(x/3)*3, n = ~~(y/3)*3;
      return mx[l+z].slice(n, n+3);
    },
    // func to return non-candidates for cell at given position
    nays = (n, o) => [
      mx[n], mx.map(e => e[o]), m(n, o, 0), m(n, o, 1), m(n, o, 2)
    ].flat().filter((e, k, a) => k === a.indexOf(e) && e);
  // loop through game matrix and get notes for cells not filled
  for (var j = 0; j < 9; ++j) {
    for (var i = 0; i < 9; ++i) {
      var ele = mx[i][j];
      if (ele == void 0) {
        var gendNt = dg_.filter(e => !~nays(i, j).indexOf(e))
          .map(e => "#incl"+(j+1)+""+(i+1)+""+e);
        console.log(gendNt);
        $(gendNt.join`,`).addClass("noted");
      }
    }
  }
  f();
};
$('#tlbar').html(
  dg.map(e =>
    `<button class="tlbarS dgtbtn" id="tlbar${e}" disabled>${e}</button>`
  ).join``+`<button class='tlbarS' id='tlbarN' \
title='Notes mode (N)' disabled>N</button>`
);
$(".dgtbtn").click(function() {
  var te = $(this).text();
  processDgt(te);
  setMx(posX, posY, te);
});
$("#tlbarN").click(nTog);
function gHCntt() { // set skeleton HTML content for grid
  return dg.map((f, j) => `<tr>${dg.map((e, i) =>
  `<td class="gridtd${
    (~~(i/3)+~~(j/3)) % 2 ? " sh" : ""
  }" id="cl${dg[i]}${dg[j]}"><div><div class="nt">${
    [[1,2,3],[4,5,6],[7,8,9]].map(g =>
      g.map(h =>
        `<span id="incl${dg[i]}${dg[j]}${h}">${h}</span>`
      ).join`&nbsp;`
    ).join`<br>`
  }</div></div><div><div class="nml"></div></div></td>`
)}</tr>`);
}
$("#grid").html(gHCntt());
function drawThicR(){
  $("#thicR").remove();
  $(a()).prepend("<div id='thicR'></div>");
  f();
}
$("td").each(function() {
  this.onclick = function() {
    selBool = !0;
    $(".tlbarS").removeAttr("disabled");
    [posX, posY] = [+this.id[2], +this.id[3]];
    drawThicR();
  };
});
$(".nt span").each(function() {
  this.onclick = function() {
    var i = this.id.slice(2, 6), t = $(`#${i} div .nml`).text();
    // OK if not filled 'normally'; not OK if changes cell
    if (!t && +i[2] === posX && +i[3] === posY) {
      $(this).toggleClass("noted");
      f();
    }
  };
});
$(document).keydown(function(e) {
  switch (e.keyCode) {
    /* change position on a / ArrowLeft, w / ArrowUp,
     d / ArrowRight, s / ArrowDown respectively */
    case 37:
    case 65:
      posX--;
      if (posX < 1) posX += 9;
      drawThicR();
      break;
    case 38:
    case 87:
      posY--;
      if (posY < 1) posY += 9;
      drawThicR();
      break;
    case 39:
    case 68:
      posX++;
      if (posX > 9) posX -= 9;
      drawThicR();
      break;
    case 40:
    case 83:
      posY++;
      if (posY > 9) posY -= 9;
      drawThicR();
      break;
    case 78: // n; toggle indicator of whether currently in notes mode
      nTog();
      break;
    // toggle note status of digit OR insert it as 'normal' digit
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      processDgt(e.key);
      setMx(posX, posY, e.key);
      break;
    // remove 'normal' (non-note) digit
    case 8:
    case 46:
      a3("nml").removeClass("lkd").html("");
      setMx(posX, posY, !1);
      a3("nt").show();
      $(".dgtbtn.lit").removeClass("lit");
      $(".mag").removeClass("mag");
      break;
    case 13: // enter; lock 'normal' digit
      if (!nModeBool) a3("nml").addClass("lkd");
      break;
  }
});
function f() {
  $(".dgtbtn.lit").removeClass("lit");
  if (nModeBool) {
    $(a2()+".nt span").each(function() {
      if ($(this).hasClass("noted"))
        $("#tlbar"+$(this).text()).addClass("lit");
    });
  } else {
    var t = a3("nml").text();
    if (t) $("#tlbar"+t).addClass("lit");
  }
}
function processDgt(x) {
  var nml = a3("nml"), nt = a3("nt");
  if (!nModeBool) {
    nml.removeClass("lkd").html(x);
    nt.hide();
    $(".dgtbtn").removeClass("lit");
    $("#tlbar"+x).addClass("lit");
  } else if (!nml.hasClass("lkd")) {
    $(a2()+" #incl"+posX+""+posY+""+x).toggleClass("noted");
    nml.html("");
    nt.show();
  }
  f();
}
function cMx() { mx = [...Array(9)].map(e => [...Array(9)]);}
// update game matrix (2D array) at position x, y with value v
function setMx(x, y, v) {
  if (nModeBool) return;
  dupCs = [];
  mx[y-1][x-1] = v === !1 ? undefined : +v;
  var i, j, k;
  // check each row, col, box for duplicates, mark all anywhere in #f0f
  for (i = 0; i < 9; ++i)
    updDup(mx[i].map((e, l) =>
      [e ? e : "x", l+1, i+1]).filter(e => e[0] != "x")
    );
  for (i = 0; i < 9; ++i)
    updDup(mx.map((e, l) =>
      [e[i] ? e[i] : "x", i+1, l+1]).filter(e => e[0] != "x")
    );
  for (i = 0; i < 9; ++i) {
    [j, k] = [~~(i/3), i%3];
    updDup(mx.slice(j*3, j*3+3)
      .map(e => e.slice(k*3, k*3+3))
      .flat().map((e, l) =>
        [e ? e : "x", l%3+k*3+1, ~~(l/3)+j*3+1]
      ).filter(e => e[0] != "x")
    );
  }
  $(".mag").removeClass("mag");
  $.each(dupCs, (i, v) => {
    $("#cl"+v+" div div.nml").addClass("mag");
  });
}
// get duplicates in array x, its 1st-level eles being arrays themselves
function getDup(x) {
  var dup = {}, dup2 = [], getDupF = x => x.map(e => e[0]);
  for (var i = 0; i < x.length; i++) {
    if (dup.hasOwnProperty(x[i][0])) dup[x[i][0]].push(i);
    else if (getDupF(x).lastIndexOf(x[i][0]) !== i) dup[x[i][0]] = [i];
  }
  $.each(dup, (i, v) => { dup2.push(v); });
  return x.filter((e,i)=>~dup2.flat().indexOf(i)).map(e=>e[1]+""+e[2]);
};
function updDup(arr) {
  var du = getDup(arr);
  for (let ele of du) if (!~dupCs.indexOf(ele)) dupCs.push(ele);
}