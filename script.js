gsap.registerPlugin(ScrollTrigger);

// Reveal animations — skip elements that are inside a staggered grid,
// those are handled separately below so we don't double-animate them.
gsap.utils.toArray('.reveal').forEach((el)=>{
  if (el.closest('.bs-grid, .why-grid, .rev-grid, .process-row')) return;
  gsap.to(el, {
    opacity:1, y:0, duration:1, ease:'power3.out',
    scrollTrigger:{ trigger:el, start:'top 85%' }
  });
});

// Stagger cards within grids (this is now the ONLY animation touching them)
gsap.utils.toArray('.bs-grid, .why-grid, .rev-grid, .process-row').forEach(grid=>{
  gsap.set(grid.children, { opacity:0, y:50 }); // clean starting state, no fighting
  gsap.to(grid.children, {
    opacity:1, y:0, duration:.8, stagger:.12, ease:'power3.out',
    scrollTrigger:{ trigger:grid, start:'top 85%' }
  });
});

// Navbar shrink on scroll
const navEl = document.querySelector('nav');
ScrollTrigger.create({
  start: 50, end: 99999,
  onUpdate: self => {
    if (self.scroll() > 50) { navEl.style.padding = '8px 10px 8px 20px'; }
    else { navEl.style.padding = '12px 14px 12px 26px'; }
  }
});

// Hero mouse parallax
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
  document.querySelector('.hero').addEventListener('mousemove', (e)=>{
    const rect = heroVisual.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    gsap.to('.plate-wrap', {x: dx*18, y: dy*18, duration:.6, ease:'power2.out'});
    gsap.to('.card-bestseller', {x: dx*-14, y: dy*-14, duration:.6, ease:'power2.out'});
    gsap.to('.card-fresh', {x: dx*-10, y: dy*-10, duration:.6, ease:'power2.out'});
    gsap.to('.card-craft', {x: dx*-12, y: dy*-12, duration:.6, ease:'power2.out'});
  });
}

// Magnetic buttons
document.querySelectorAll('.btn-primary, .btn-white').forEach(btn=>{
  btn.addEventListener('mousemove', (e)=>{
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) * 0.25;
    const y = (e.clientY - r.top - r.height/2) * 0.4;
    gsap.to(btn, {x, y, duration:.3, ease:'power2.out'});
  });
  btn.addEventListener('mouseleave', ()=>{
    gsap.to(btn, {x:0, y:0, duration:.4, ease:'elastic.out(1,0.4)'});
  });
});