let footer = document.querySelector('#youare-footer');

function removeFooter() {
  if (footer) footer.remove();
}

(function initCleanup() {
  function setup() {
    const containerEl = document.getElementById('youare-container');
    if (!containerEl) {
      console.warn('cleanup.js: #youare-container not found — footer removal listener not attached');
      return;
    }

    containerEl.addEventListener('click', removeFooter);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();