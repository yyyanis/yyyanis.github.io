(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  // CV choice: ?cv=data in the link picks the profile, remembered for the visit
  try{
    var p = new URLSearchParams(location.search).get('cv');
    if(p && window.CV_FILES && window.CV_FILES[p]) sessionStorage.setItem('cv', p);
    var key = sessionStorage.getItem('cv');
    if(key && window.CV_FILES[key]){
      document.querySelectorAll('[data-cv]').forEach(function(a){
        a.setAttribute('data-umami-event-profile', key);
        a.href = window.SITE_ROOT + 'cv/Yanis_Bendehane_CV_' + window.CV_FILES[key] + '_' + a.dataset.cv + '.pdf';
      });
    }
  }catch(e){}
  if(reduce){ root.classList.add('no-anim'); return; }
  var blocks = document.querySelectorAll('.hero, .log, .case-head, .crumb + .title, .fig-panel, h1.title');
  blocks.forEach(function(b){ b.classList.add('anim'); });
  function play(el){ el.classList.remove('play'); void el.offsetWidth; el.classList.add('play'); }
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ play(en.target); io.unobserve(en.target); } });
    },{threshold:0.12});
    blocks.forEach(function(b){ io.observe(b); });
  } else { blocks.forEach(play); }
  document.querySelectorAll('.replay').forEach(function(btn){
    btn.addEventListener('click', function(){ play(btn.closest('.fig-panel')); });
  });
})();
