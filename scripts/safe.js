// https://github.com/Endermanch/youareanidiot.cc 🤪
(function initSafe() {
  // Initialize after DOM is ready and be defensive about missing nodes/audio.

  function audioAvailable(el) {
    return el && el.src && el.readyState > 0;
  }

  function tryPlay(el) {
    if (!el || !el.src) return Promise.reject(new Error('no-audio'));
    return el.play().catch(() => Promise.reject(new Error('play-failed')));
  }

  function setup() {
    const audio = document.getElementById('youare-audio');
    const ovlap = document.getElementById('youare-overlap');
    const micon = document.getElementById('youare-micon');

    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('youare-container');
        if (!container) {
          console.warn('safe.js: #youare-container not found — click behavior will be disabled');
          return;
        }

        let overlap = false;

        function audioOverlap() {
          try {
            if (!overlap && audio && audio.duration > 0 && audio.currentTime > audio.duration - 0.45) {
              if (ovlap) { ovlap.currentTime = 0; tryPlay(ovlap).catch(() => {}); }
              overlap = true;
            }

            if (overlap && ovlap && ovlap.duration > 0 && ovlap.currentTime > ovlap.duration - 0.5) {
              if (audio) { audio.currentTime = 0; tryPlay(audio).catch(() => {}); }
              overlap = false;
            }
          } catch (e) {
            console.debug('audioOverlap safe guard:', e);
          }
        }

        function audioPlay() {
          if (!overlap) {
            if (audio) tryPlay(audio).catch(() => {});
          } else {
            if (ovlap) tryPlay(ovlap).catch(() => {});
          }

          container.removeEventListener('click', audioPlay);

          if (audio) audio.addEventListener('timeupdate', audioOverlap);
          if (ovlap) ovlap.addEventListener('timeupdate', audioOverlap);

          container.classList.remove('clicky');
          if (micon) micon.src = '/images/speaker.avif';
        }

        function audioStop() {
          if (audio) { audio.currentTime = 0; audio.pause(); }
          if (ovlap) { ovlap.currentTime = 0; ovlap.pause(); }

          container.addEventListener('click', audioPlay);

          if (audio) audio.removeEventListener('timeupdate', audioOverlap);
          if (ovlap) ovlap.removeEventListener('timeupdate', audioOverlap);

          container.classList.add('clicky');
          if (micon) micon.src = '/images/speakerm.avif';
        }

        function audioSwitch() {
          if (
            audioAvailable(audio) && audio.paused &&
            audioAvailable(ovlap) && ovlap.paused
          ) {
            audioPlay();
          } else {
            audioStop();
          }
        }

        // Wire events safely
        container.addEventListener('click', () => {
          container.classList.remove('clicky');
        });

        container.addEventListener('click', audioPlay);

        if (micon) {
          micon.addEventListener('click', audioSwitch);
        }
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
