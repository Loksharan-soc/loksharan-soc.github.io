// ===== MOBILE NAVIGATION =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
    if(navLinks.classList.contains('active')) navLinks.classList.remove('active');
  });
});

// ===== METRICS ANIMATION =====
const metrics = document.querySelectorAll('.metric-value');
metrics.forEach(metric => {
  const target = +metric.dataset.target;
  let count = 0;
  const increment = target / 100;
  const interval = setInterval(() => {
    count += increment;
    if(count >= target){metric.textContent = target; clearInterval(interval);}
    else metric.textContent = Math.ceil(count);
  }, 15);
});

// ===== SKILL BARS ANIMATION ON SCROLL =====
const skillLevels = document.querySelectorAll('.skill-level');
const skillSection = document.querySelector('#skills');
window.addEventListener('scroll', () => {
  const trigger = skillSection.offsetTop - window.innerHeight + 100;
  if(window.scrollY > trigger){
    skillLevels.forEach(bar => bar.style.width = bar.style.width);
  }
});
