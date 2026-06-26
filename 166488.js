/* ══════════════════════════════════════════
   wildlife.js — Save Our Wildlife Scripts
   ══════════════════════════════════════════ */

// ── DOM References ──
const video     = document.getElementById('wildlifeVideo');
const wrapper   = document.getElementById('videoWrapper');
const toggleBtn = document.getElementById('toggleBtn');
const btnLabel  = document.getElementById('btnLabel');
const btnIcon   = document.getElementById('btnIcon');

// ── SVG icon paths for Play and Hide states ──
const ICONS = {
  play: '<path d="M8 5v14l11-7z"/>',
  hide: '<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 00-2.79.588l.77.771A5.944 5.944 0 018 2.5c5 0 7.5 5.5 7.5 5.5S14 10.5 12.5 12c-.304.22-.618.42-.941.6l.8.8zM8 4.5a3.5 3.5 0 013.5 3.5c0 .41-.083.804-.23 1.166l.848.848A4.5 4.5 0 008 3.5c-.32 0-.63.034-.93.097l.943.943A3.5 3.5 0 018 4.5zM3.35 5.47L2 4.12 1 5.12l1.5 1.5C1.547 7.774 1 8 1 8s2.5 5.5 7.5 5.5c.98 0 1.9-.168 2.742-.47l1.428 1.428 1-1-10.32-10.32zM8 12.5A4.5 4.5 0 014.5 8c0-.577.111-1.127.312-1.631L6.17 7.727A2.5 2.5 0 008 10.5c.228 0 .45-.03.662-.087l1.357 1.357A4.474 4.474 0 018 12.5z"/>'
};

/**
 * updateButton(state)
 * Updates the toggle button's icon, label, and ARIA attributes
 * to reflect the current video state.
 * @param {'play' | 'hide'} state
 */
function updateButton(state) {
  btnIcon.innerHTML = ICONS[state];

  if (state === 'play') {
    btnLabel.textContent = 'Play Video';
    toggleBtn.setAttribute('aria-pressed', 'false');
    toggleBtn.setAttribute('aria-label', 'Play the wildlife video');
  } else {
    btnLabel.textContent = 'Hide Video';
    toggleBtn.setAttribute('aria-pressed', 'true');
    toggleBtn.setAttribute('aria-label', 'Hide the wildlife video');
  }
}

/**
 * Toggle Button Click Logic:
 * - If video is hidden  → reveal it and play
 * - If video is visible and NOT playing → play it
 * - If video is visible and IS playing  → pause and hide it
 */
toggleBtn.addEventListener('click', () => {
  const isHidden = wrapper.classList.contains('is-hidden');

  if (isHidden) {
    // Reveal the video and start playing
    wrapper.classList.remove('is-hidden');
    video.play();
    updateButton('hide');
  } else if (video.paused) {
    // Video is visible but paused — play it
    video.play();
    updateButton('hide');
  } else {
    // Video is playing — pause and hide it
    video.pause();
    wrapper.classList.add('is-hidden');
    updateButton('play');
  }
});

// ── Keep button in sync with native video controls ──
video.addEventListener('play',  () => updateButton('hide'));
video.addEventListener('pause', () => {
  // Only update if the video wasn't hidden by the toggle button
  if (!wrapper.classList.contains('is-hidden')) {
    updateButton('play');
  }
});
video.addEventListener('ended', () => updateButton('play'));