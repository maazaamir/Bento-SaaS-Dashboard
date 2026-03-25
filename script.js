// 1. Initialize Chart.js with Neon Gradient
const ctx = document.getElementById('revenueChart').getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 0, 200);
gradient.addColorStop(0, 'rgba(0, 242, 255, 0.4)');
gradient.addColorStop(1, 'rgba(0, 242, 255, 0)');

const revenueChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
            data: [12000, 18500, 14000, 26000, 21000, 29000, 32950],
            borderColor: '#00f2ff',
            borderWidth: 3,
            fill: true,
            backgroundColor: gradient,
            tension: 0.4,
            pointRadius: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.2)' } },
            y: { display: false }
        },
        animation: { duration: 2500, easing: 'easeOutQuart' }
    }
});

// 2. GSAP: Gummy Entrance Animation
gsap.from(".card", {
    duration: 1.2,
    y: 50,
    scale: 0.9,
    opacity: 0,
    stagger: 0.15,
    ease: "elastic.out(1, 0.6)"
});

// 3. GSAP: Counter Logic
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    gsap.to(counter, {
        innerText: target,
        duration: 2.5,
        snap: { innerText: 1 },
        ease: "power3.out",
        onUpdate: function() {
            let val = Math.floor(this.targets()[0].innerText);
            if(target > 1000) {
                this.targets()[0].innerText = "$" + val.toLocaleString();
            } else {
                this.targets()[0].innerText = val;
            }
        }
    });
});

// 4. GSAP: Gummy Hover Effect
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { 
            scale: 1.03, 
            borderColor: "rgba(0, 242, 255, 0.4)", 
            duration: 0.4, 
            ease: "back.out(2)" 
        });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, { 
            scale: 1, 
            borderColor: "rgba(255, 255, 255, 0.08)", 
            duration: 0.5, 
            ease: "elastic.out(1, 0.3)" 
        });
    });
});
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuLinks = document.querySelectorAll('.menu-links li');

let isMenuOpen = false;

navToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    navToggle.classList.toggle('active');
    
    if(isMenuOpen) {
        // Open Menu
        gsap.to(mobileMenu, { autoAlpha: 1, duration: 0.5 });
        gsap.from(menuLinks, { 
            y: 30, 
            opacity: 0, 
            stagger: 0.1, 
            duration: 0.4, 
            ease: "back.out(1.7)" 
        });
    } else {
        // Close Menu
        gsap.to(mobileMenu, { autoAlpha: 0, duration: 0.3 });
    }
});