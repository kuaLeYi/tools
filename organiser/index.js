window.onbeforeunload = e => { e.returnValue = 1; };
firebase.initializeApp({
  apiKey: 'AIzaSyDUZr1KVPQ8drUtwUL8HoiT6ya9u22_G-M',
  projectId: 'frustratiles',
  databaseURL: 'https://frustratiles.firebaseio.com',
  storageBucket: 'nam5.appspot.com'
});
/* Loose doc:
  lgnBool is whether logged in
  iShowing and iShowingOld hold last chars of pp now and prev
  poast and weeki shall be lists of objects
  getPrioriStr &c process data for disp in non-input/textarea eles
  clnSpc works on the properties tags and links of a post */
var db = firebase.database(), auth = firebase.auth(), unomv, pwv,
  rspAcc = (x, wic) => { $('#rsp-'+wic).html(x); },
  lgnBool = false,
  bod = $('body'), hjs = '\' href=\'javascript:\'>',
  htmlRp = x => x.replace(/&/g, '&amp;').replace(/</g, '&lt;'),
  iShowingOld = '', iShowing = '',
  userId, poast = [], weeki = [], darkM,
  root = e => 'organiser/'+userId+(e?(e>1?'/wikients':'/posts'):''),
  partTyp = 'ins com adv ans his pre'.split` `,
  fullPri = 'Very low,Low,Medium,High,Very high'.split`,`,
  partPri = 'vl l m h vh'.split` `,
  getPrioriStr = o => fullPri[partPri.indexOf(o.priority)],
  getTagStr = o => htmlRp(o.tags).split` `.map(e =>
      `<a class='tg${hjs}${e.replace(/_/g,' ')}</a>`
    ).join`, `,
  getLkStr = o => o.links.split` `.map(e =>
      `<a class='lkinpvu${hjs}${e}</a>`
    ).join`, `,
  parseDescription = x => htmlRp(x).split`\n\n`.map(e => `<p>${e}</p>`)
    .join``.replace(/\*\*(.+?)\*\*/g, (a, b) => `<b>${b}</b>`)
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
function flipTo(i) { // Disp given 'page' only, update ids prev & now
  $('#main > div').hide();
  $('#main-'+i).show();
  iShowingOld = iShowing;
  iShowing = i;
}
/* Loose doc:
  Only needs to happen once
  All links in side navbar point to relevant 'page'
  Such links will be bolded iff their 'page' is chosen
  BUT can't change 'page' if currently new-posting */
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
acc.click(); // Go to Account 'page' by clicking its btn
function clearFields(x) { // For new-posting and post viewing
  x.find('input,textarea').val('');
  x.find('select').val('vl');
}
/* Loose doc:
  Only needs to happen once
  Set up lstnrs for instant cancellation of post creation OR viewing,
  clearing div to hold any warnings */
$('.cnl').each(function() {
  $(this).on('click', function() {
    $('.wrn').empty();
    flipTo(iShowingOld);
    clearFields($(this).parent());
  });
});
// Toggle mkup help. Class-wide applicability -> toggles at both nup & pvu
$('.des-cmnt-sh').on('click', function() { $('.des-cmnt-blk').toggle(); });
/* Loose doc:
  Affects 'New Post' btns on six side-navbar-linked pages: ins, com &c
  Only needs to happen once
  Can make a new post, which means open new-post page, iff logged in */
$('.nup').each(function() {
  $(this).on('click', function() {
    if (lgnBool) {
      var typ = $(this).parent()[0].id.slice(-3);
      $('#savnuptyp').html(typ[0].toUpperCase()+typ.slice(1));
      flipTo('pnu');
    }
  });
});
/* Loose doc:
  Simply add lstnr to btn savnup
  Reject saving of new post & disps complaints, or
  clean field values & save in db then
  exit new-post page & empty it for future convenience */
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
      description: des.value.trim(),
      tags: clnSpc(tg.value, 1),
      links: clnSpc(lnk.value),
      type: $('#snav a.nav-cur')[0].innerHTML
    };
    db.ref(root(1)).update(updt);
    flipTo(iShowingOld);
    clearFields($('#main-pnu'));
  }
};
// Fill up post-viewing 'page'; take adv of similarity to nup
$('#main-pvu').html(`Viewing post at address <span id='pvuadr'></span> |
<a class='delet${hjs}Instant delete</a> | \
<a class='edmd' id='pvuenem${hjs}Enter edit mode</a>\
<a class='edmd hid' id='pvusaexem${hjs}\
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
// To db add a new user w given email & some default values
function nuUserData(i, e) {
  db.ref('organiser/'+i).set({
    email: e, posts: {}, wikients: {}, drkm: false
  }).catch(err => { rspAcc(err.message, 'e'); });
}
// Low-fuss login or account creation
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
/* Loose doc:
  Simple signout ending by setting things to how would be
  before ever having logged in */
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
/* Loose doc:
  Listen for change in authen'n state and
  if login, grab user's ID in order to show posts, prep
  wiki, have dark or light mode as preferred;
  if logout show login fields &c instead of welcome.
  Might b gd to merge change-state-to-logged-out actions
  into dolgt.onclick */
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
function processPost(p, a) { // Not full post, but summary
  return `<div><hr>\
Priority: ${getPrioriStr(p)}<br>\
Title: <a class='ti' id='${a}${hjs}${
  p.title ? p.title : 'NONE' }</a><br>\
Tags: <span class='gat'>${getTagStr(p)}</span></div>`;
}
/* Loose doc:
  Search posts. Currently simple
  Deal w wildcard terms or wildcard-less terms, only ye latter
  breaking down into - and +. HIDE posts yt do NOT match ye terms. */
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
/* Loose doc:
  Show post summaries based on address.
  Connect their tags to the wiki.
  Make each post able to be visited and looked at in full. */
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
  /* If post doesn't exist, stop. Else make sure the correct link
    on the side navbar is bolded.
  */
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
  var dfV = () => { // Populate eles w post data, not editing
    jU('adr').html(x);
    jU('pri').html(getPrioriStr(p));
    jU('ti').html(p.title ? p.title : 'NONE');
    jU('des')
      .html(p.description ? parseDescription(p.description) : 'NONE');
    jU('tg').html(getTagStr(p));
    wikCnxtTags(); // Activate the tags on this post-viewing page
    jU('lnk').html(getLkStr(p));
  };
  dfV();
  // Activate links in pvu
  $('.lkinpvu').each(function() {
    this.onclick = () => { vuPost($(this).html()); };
  });
  flipTo('pvu');
  $('#main-pvu .delet').on('click', function() {
    db.ref(root(1)+'/'+x).remove();
    flipTo($('.nav-cur')[0].id);
  });
  pvuenem.onclick = () => { // Populate fields w post data. Editing
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
  // Db-save, exit edit mode, switch to view-with-option-to-edit
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
      description: p.description = jG('des').val().trim(),
      tags: p.tags = clnSpc(jG('tg').val(), 1),
      links: p.links = clnSpc(jG('lnk').val()),
      type: $('#snav a.nav-cur')[0].innerHTML
    };
    db.ref(root(1)).update(updt);
    dfV();
    twoHidChg(1);
  };
}
/* Loose doc:
  Always in edit mode. Can db-save instantly. Deletion is instant.
  Can try to go to the previous 'page'.
  Notify if trouble going back, or trying to delete nothingness.
*/
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
/* Loose doc:
  Search the wiki of post tags. Currently simple
  On ye dedicated result page, show ye matching tag wiki-entries */
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
    results.map(e => `<div><a class='tg${hjs}${
      e.replace(/_/g, ' ') }</a></div>`)
  );
  wikCnxtTags();
  flipTo('wscres');
};