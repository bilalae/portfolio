const light = document.querySelector('.light');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const pointer = matchMedia('(pointer: fine)');
let frame = 0;
let x = innerWidth / 2, y = innerHeight / 2;
// Update once per frame only while the pointer moves; no idle animation loop.
addEventListener('pointermove', (event) => {
  if (motion.matches || !pointer.matches) return;
  x = event.clientX; y = event.clientY;
  if (!frame) frame = requestAnimationFrame(() => {
    light.style.transform = `translate(${x - 325}px, ${y - 325}px)`;
    frame = 0;
  });
}, { passive: true });

const loader = document.querySelector('.loader');
loader.addEventListener('click', () => {
  const paused = document.body.classList.toggle('paused');
  loader.setAttribute('aria-pressed', String(paused));
  loader.setAttribute('aria-label', paused ? 'Resume loading animation' : 'Pause loading animation');
  loader.title = paused ? 'Resume animation' : 'Pause animation';
});
// Suspend decorative animation in background tabs.
document.addEventListener('visibilitychange', () => {
  document.querySelectorAll('.loader span, .line > span').forEach(el => {
    el.style.animationPlayState = document.hidden ? 'paused' : '';
  });
});
