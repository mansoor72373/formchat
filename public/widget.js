/*!
 * FormChat embeddable widget
 * Usage: <script src="https://YOUR-APP/widget.js" data-form="FORM_SLUG" async></script>
 * Optional: data-color="#157b6c" (overrides the colour configured in the dashboard)
 */
(function () {
  'use strict';

  var script =
    document.currentScript ||
    document.querySelector('script[data-form][src*="widget.js"]');
  if (!script) return;

  var slug = script.getAttribute('data-form');
  if (!slug) return console.warn('[FormChat] Missing data-form attribute.');
  if (window.__formchatMounted) return; // never mount twice
  window.__formchatMounted = true;

  var origin = new URL(script.src, location.href).origin;
  var colorOverride = script.getAttribute('data-color');

  // Look up the form first: unpublished/unknown forms render nothing on the host site.
  fetch(origin + '/api/v1/public/forms/' + encodeURIComponent(slug))
    .then(function (res) { return res.status === 404 ? null : res.json(); })
    .then(function (body) {
      if (body === null) return console.warn('[FormChat] Form not found or not published.');
      var color = colorOverride || (body && body.data && body.data.settings.primaryColor) || '#157b6c';
      mount(color);
    })
    .catch(function () { mount(colorOverride || '#157b6c'); });

  function mount(color) {
    var css =
      '.fc-launcher{position:fixed;right:20px;bottom:20px;z-index:2147483000;width:58px;height:58px;border:0;border-radius:50%;' +
      'background:' + color + ';color:#fff;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;' +
      'transition:transform .15s ease}' +
      '.fc-launcher:hover{transform:scale(1.06)}.fc-launcher:focus-visible{outline:3px solid #fff;outline-offset:2px;box-shadow:0 0 0 5px ' + color + '}' +
      '.fc-panel{position:fixed;right:20px;bottom:92px;z-index:2147483001;width:380px;height:min(640px,calc(100vh - 116px));' +
      'border-radius:16px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.28);background:#fff;display:none}' +
      '.fc-panel.fc-open{display:block}.fc-panel iframe{width:100%;height:100%;border:0;display:block}' +
      '@media (max-width:480px){.fc-panel{inset:0;width:100%;height:100%;border-radius:0}.fc-launcher.fc-hidden{display:none}}';

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var panel = document.createElement('div');
    panel.className = 'fc-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Chat');

    var launcher = document.createElement('button');
    launcher.className = 'fc-launcher';
    launcher.type = 'button';
    launcher.setAttribute('aria-label', 'Open chat');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.innerHTML =
      '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

    var iframe = null;

    function setOpen(open) {
      if (open && !iframe) { // load lazily on first open
        iframe = document.createElement('iframe');
        iframe.src = origin + '/embed/' + encodeURIComponent(slug);
        iframe.title = 'Chat';
        panel.appendChild(iframe);
      }
      panel.classList.toggle('fc-open', open);
      launcher.classList.toggle('fc-hidden', open);
      launcher.setAttribute('aria-expanded', String(open));
      if (!open) launcher.focus();
    }

    launcher.addEventListener('click', function () { setOpen(true); });
    window.addEventListener('message', function (e) {
      if (e.origin === origin && e.data && e.data.type === 'formchat:close') setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('fc-open')) setOpen(false);
    });

    document.body.appendChild(panel);
    document.body.appendChild(launcher);
  }
})();
