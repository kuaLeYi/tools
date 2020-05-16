window.onbeforeunload = e => { e.returnValue = 1; };
firebase.initializeApp({
  apiKey: 'AIzaSyDUZr1KVPQ8drUtwUL8HoiT6ya9u22_G-M',
  projectId: 'frustratiles',
  databaseURL: 'https://frustratiles.firebaseio.com',
  storageBucket: 'nam5.appspot.com'
});
var db = firebase.database(), auth = firebase.auth(), unomv, pwv,
  rspAcc = (x, wic) => { $('#rsp-'+wic).html(x); },
  lgnBool = false,
  bod = $('body'),
  htmlRp = x => x.replace(/&/g, '&amp;').replace(/</g, '&lt;'),
  iShowingOld = '', iShowing = '',
  userId, poast = [], weeki = [], darkM,
  root = e => 'planner/'+userId+(e?(e>1?'/wikients':'/posts'):''),
  partTyp = 'ins com adv ans his pre'.split` `,
  fullPri = 'Very low,Low,Medium,High,Very high'.split`,`,
  partPri = 'vl l m h vh'.split` `,
  getPrioriStr = o => fullPri[partPri.indexOf(o.priority)],
  getTagStr = o => htmlRp(o.tags).split` `.map(e =>
      `<a class='tg' href='javascript:'>${e.replace(/_/g,' ')}</a>`
    ).join`, `,
  getLkStr = o => o.links.split` `.map(e =>
      `<a class='lkinpvu' href='javascript:'>${e}</a>`
    ).join`, `,
  parseDescription = x => x.split`\n\n`.map(e => `<p>${e}</p>`).join``
    .replace(/\*\*(.+?)\*\*/g, (a, b) => `<b>${b}</b>`)
    .replace(/\/\/(.+?)\/\//g, (a, b) => `<i>${b}</i>`)
    .replace(/\^\^(.+?)\^\^/g, (a, b) => `<sup>${b}</sup>`)
    .replace(/,,(.+?),,/g, (a, b) => `<sub>${b}</sub>`)
    .replace(/\n/g, e => '<br>'),
  clnSpc = (x, y) => {
    x = x.trim().replace(/_{2,}/g, '_').replace(/\n/g, ' ').split` `;
    if (y) x = x.map(e => e.replace(/^_|_$|\\n/g, ''));
    return x.filter((e, i, a) => e && i === a.indexOf(e)).join` `;
  },
  g = 'editexstg-';
function flipTo(i) {
  $('#main > div').hide();
  $('#main-'+i).show();
  iShowingOld = iShowing;
  iShowing = i;
}
$('#snav a').each(function() {
  $(this).on('click', function() {
    if (iShowing == 'pnu') {
      $('#savnup-warn').html(`Please enter a suitable address and \
save your post before leaving. Otherwise, cancel.`);
      return;
    }
    $('.nav-cur').removeClass('nav-cur');
    $(this).addClass('nav-cur');
    flipTo(this.id);
  });
});
acc.click();
function clearFields(x) {
  x.children('input,textarea').val('');
  x.children('select').val('vl');
}
$('.cnl').each(function() {
  $(this).on('click', function() {
    $('.wrn').empty();
    flipTo(iShowingOld);
    clearFields($(this).parent());
  });
});
$('.des-cmnt-sh').on('click', function() { $('.des-cmnt-blk').toggle(); });
$('.nup').each(function() {
  $(this).on('click', function() {
    if (lgnBool) {
      var typ = $(this).parent()[0].id.slice(-3);
      $('#savnuptyp').html(typ[0].toUpperCase()+typ.slice(1));
      flipTo('pnu');
    }
  });
});
savnup.onclick = () => {
  var adrv = adr.value, snWr = $('#savnup-warn'), snWrComplaints = [];
  snWr.empty();
  if (lnk.value.match(/[^a-z0-9- ]/)) {
    snWrComplaints.push(`The contents of the Links field may not \
include characters other than small letters (a–z), digits (0–9), \
hyphens (-) or spaces.`);
  }
  if (!adrv) {
    snWrComplaints.push('Please enter an address');
  } else if (adrv.match(/[^a-z0-9-]/)) {
    snWrComplaints.push(`The address may not contain characters \
other than small letters (a–z), digits (0–9) or hyphens (-).`);
  }
  if (snWrComplaints.length) snWr.html(snWrComplaints.join`<br>`);
  else {
    var updt = {};
    updt['/'+adrv] = {
      priority: prisel.value,
      title: ti.value.trim(),
      description: htmlRp(des.value.trim()),
      tags: clnSpc(tg.value, 1),
      links: clnSpc(lnk.value),
      type: $('#snav a.nav-cur')[0].innerHTML
    };
    db.ref(root(1)).update(updt);
    flipTo(iShowingOld);
    clearFields($('#main-pnu'));
  }
};
$('#main-pvu').html(`Viewing post at address <span id='pvuadr'></span> |
<a class='delet' href='javascript:'>Instant delete</a> | \
<a class='edmd' id='pvuenem' href='javascript:'>Enter edit mode</a>\
<a class='edmd hid' id='pvusaexem' href='javascript:'>\
Save and exit edit mode</a><div><b id='savvup-wrn'></b></div><hr>
<div class='pvucntnt' id='pvucntnta'><p><b>Priority:</b> \
<span id='pvupri'></span></p><hr>
<p><b>Title:</b> <span id='pvuti'></span></p><hr>
<p><b>Description:</b> <span id='pvudes'></span></p><hr>
<p><b>Tags:</b> <span id='pvutg'></span></p><hr>
<p><b>Links:</b> <span id='pvulnk'></span></p></div>\
<div class='pvucntnt hid' id='pvucntntb'>${
  $('#priselti-blobby').html()
    .replace(/"(prisel|ti)"/g, (a, b) => `"${g}${b}"`)
}${
  $('#destglnk-blobby').html()
    .replace(/des-/g, g+'des-')
    .replace(/"(des|tg|lnk)"/g, (a, b) => `"${g}${b}"`)
}</div>`);
function nuUserData(i, e) {
  db.ref('planner/'+i).set({
    email: e, posts: {}, wikients: {}, drkm: false
  }).catch(err => { rspAcc(err.message, 'e'); });
}
dolgn.onclick = () => {
  unomv = unom.value;
  pwv = pw.value;
  auth.signInWithEmailAndPassword(unomv, pwv)
    .catch(err => { rspAcc(err.message, 'e'); });
};
cracc.onclick = () => {
  unomv = unom.value;
  pwv = pw.value;
  auth.createUserWithEmailAndPassword(unomv, pwv)
    .then(function() { nuUserData(auth.currentUser.uid, unomv); })
    .catch(err => { rspAcc(err.message, 'e'); });
};
dolgt.onclick = () => {
  auth.signOut().then(function() {
    $('.main-sth-lis').empty();
    bod.removeClass('darkmode');
    $('#dmtgltarg').html('dark');
    $('#rsp-e').html('NIL');
    $('.acc-sth').hide();
    $('#acc-enter').show();
  }).catch(err => { rspAcc(err.message, 'l'); });
};
dmtgl.onclick = () => {
  bod.toggleClass('darkmode');
  var updt = {};
  updt['/drkm'] = darkM = !darkM;
  db.ref(root()).update(updt);
  $('#dmtgltarg').text(darkM ? 'light' : 'dark');
};
auth.onAuthStateChanged(u => {
  lgnBool = !!u;
  $('#scbtn,#wscbtn').attr('disabled', !u);
  if (u) {
    userId = u.uid;
    db.ref(root()).on('value', s => {
      s = s.val();
      if (s.hasOwnProperty('posts')) {
        poast = s.posts;
        listPoast();
      } else $('.main-sth-lis').empty();
      if (s.hasOwnProperty('wikients')) {
        weeki = s.wikients;
      }
      darkM = s.drkm;
      if (darkM) {
        bod.addClass('darkmode');
        $('#dmtgltarg').html('light');
      } else bod.removeClass('darkmode');
      $('#acc-leave-eml').html(s.email);
      $('.acc-sth').hide();
      $('#acc-leave').show();
    });
  } else {
    $('.acc-sth').hide();
    $('#acc-enter').show();
  }
});
function lisAppend(x, y, z) {
  $(`#main-${x}-lis`).append(processPost(y, z));
}
function processPost(p, a) {
  return `<div><hr>\
Priority: ${getPrioriStr(p)}<br>\
Title: <a class='ti' id='${a}' href='javascript:'>${
  p.title ? p.title : 'NONE'
}</a><br>\
Tags: <span class='gat'>${getTagStr(p)}</span></div>`;
}
scbtn.onclick = () => {
  var navcurId = $('.nav-cur')[0].id;
  if (!partTyp.includes(navcurId)) return;
  var scFull = $('input[name=sc]').val().trim().replace(/\\n/g, '\n')
    .split` `.filter((e, i, a) => e && i === a.indexOf(e)),
    scWild = [], scTame = [], scPos = [], scNeg = [];
  for (let e of scFull) {
    if (/\n/.test(e)) scWild.push(new RegExp(`^${e
      .replace(/\n/g, '.+?')}$`));
    else scTame.push(e);
  }
  for (let f of scTame) {
    if (f.charAt() != '_') scPos.push(f);
    else scNeg.push(f.slice(1));
  }
  $(`#main-${navcurId}-lis .gat`).each(function() {
    $(this).parent().show();
    var sgat = this.textContent.split`, `, mac = true;
    if (scNeg.length) mac = mac && !scNeg.some(e => sgat.includes(e));
    if (scPos.length) mac = mac && scPos.every(e => sgat.includes(e));
    if (scWild.length) mac = mac && scWild.every(e => e.test(sgat));
    if (!mac) $(this).parent().hide();
  });
}
function listPoast() {
  $('.main-sth-lis').empty();
  for (var i in poast) {
    var addre = i;
    e = poast[i];
    switch (e.type) {
      case 'Instruction':
        lisAppend('ins', e, addre);
        break;
      case 'Command':
        lisAppend('com', e, addre);
        break;
      case 'Advisory':
        lisAppend('adv', e, addre);
        break;
      case 'Answer':
        lisAppend('ans', e, addre);
        break;
      case 'Historical':
        lisAppend('his', e, addre);
        break;
      case 'Predictive':
        lisAppend('pre', e, addre);
    }
  }
  $('.ti').each(function() {
    this.onclick = () => { vuPost(this.id); };
  });
  wikCnxtTags();
}
function vuPost(x) {
  var p, hvXCec = false, twoHidChg = n => {
    var s = 'em,#pvucntnt', arr = [`#pvuen${s}a`, `#pvusaex${s}b`];
    $(arr[n]).addClass('hid');
    $(arr[1-n]).removeClass('hid');
  },
  jG = x => $('#'+g+x), jU = x => $('#pvu'+x);
  for (var i in poast) {
    if (i == x) {
      p = poast[i];
      hvXCec = true;
      $('.nav-cur').removeClass('nav-cur');
      $('#'+p.type.slice(0, 3).toLowerCase()).addClass('nav-cur');
      break;
    }
  }
  if (!hvXCec) return;
  var dfV = () => {
    jU('adr').html(x);
    jU('pri').html(getPrioriStr(p));
    jU('ti').html(p.title ? p.title : 'NONE');
    jU('des')
      .html(p.description ? parseDescription(p.description) : 'NONE');
    jU('tg').html(getTagStr(p));
    wikCnxtTags();
    jU('lnk').html(getLkStr(p));
  };
  dfV();
  $('.lkinpvu').each(function() {
    this.onclick = () => { vuPost($(this).html()); };
  });
  flipTo('pvu');
  $('#main-pvu .delet').on('click', function() {
    db.ref(root(1)+'/'+x).remove();
    flipTo($('.nav-cur')[0].id);
  });
  pvuenem.onclick = () => {
    twoHidChg(0);
    $(`.${g}des-cmnt-sh`).on('click', function() {
      $(`.${g}des-cmnt-blk`).toggle();
    });
    jG('prisel').val(p.priority);
    jG('ti').val(p.title);
    jG('des').val(p.description);
    jG('tg').val(p.tags);
    jG('lnk').val(p.links);
  };
  pvusaexem.onclick = () => {
    if (jG('lnk').val().match(/[^a-z0-9- ]/)) {
      $('#savvup-wrn').html(`The contents of the Links field may not \
include characters other than small letters (a–z), digits (0–9), \
hyphens (-) or spaces.`);
      return;
    }
    var updt = {};
    updt['/'+x] = {
      priority: p.priority = jG('prisel').val(),
      title: p.title = jG('ti').val().trim(),
      description: p.description = htmlRp(jG('des').val().trim()),
      tags: p.tags = clnSpc(jG('tg').val(), 1),
      links: p.links = clnSpc(jG('lnk').val()),
      type: $('#snav a.nav-cur')[0].innerHTML
    };
    db.ref(root(1)).update(updt);
    dfV();
    twoHidChg(1);
  };
}
function makeWikiPage(x) {
  $('#wikph').html(x);
  $('#wikpprob,#wikpbac-alert').empty();
  wikpb.value = weeki.hasOwnProperty(x) ? weeki[x] : '';
  flipTo('wikp');
  wikpbac.onclick = () => {
    flipTo(iShowingOld);
    $('#wikpbac-alert').html(' &lt; trying to return to '+iShowingOld);
  };
  wikps.onclick = () => {
    var updt = {};
    updt['/'+x] = wikpb.value;
    db.ref(root(2)).update(updt);
  };
  wikpr.onclick = () => {
    if (weeki.hasOwnProperty(x)) {
      db.ref(root(2)+'/'+x).remove();
      wikpbac.click();
    } else $('#wikpprob').html('Can\'t delete a nonexistent entry');
  };
}
function wikCnxtTags() {
  $('.tg').each(function() {
    $(this).on('click', function() {
      var tC = this.textContent.replace(/ /g,'_');
      makeWikiPage(tC);
    });
  });
}
wscbtn.onclick = () => {
  var wscvBasic = $('input[name=wsc]').val().trim(),
    wscvFull = wscvBasic.replace(/\\n/g, '\n').replace(/_{2,}/g, '_')
      .split` `.map(e => e.replace(/^_|_$/g, ''))
      .filter((e, i, a) => e && i === a.indexOf(e)),
    r, results = [];
  if (!/ /.test(wscvBasic) && wscvBasic.slice(0, 2) == '__') {
    makeWikiPage(wscvBasic.slice(2));
    return;
  }
  for (var i in wscvFull) {
    var e = wscvFull[i];
    if (/\n/.test(e))
      wscvFull[i] = `^${e.replace(/\n/g, '.+?')}$`;
    else wscvFull[i] = `^${e}$`;
  }
  r = new RegExp(wscvFull.join`|`);
  for (var e in weeki) if (r.test(e)) results.push(e);
  $('#wscresbod').html(
    results.map(e => `<div><a class='tg' href='javascript:'>${
      e.replace(/_/g, ' ')
    }</a></div>`));
  wikCnxtTags();
  flipTo('wscres');
};