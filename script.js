// Haven - Global JavaScript

// Email notification form handler
if (document.getElementById('notifyForm')) {
    document.getElementById('notifyForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('emailInput').value;
        const button = this.querySelector('button[type="submit"]');
        const successMessage = document.getElementById('successMessage');
        
        button.disabled = true;
        button.textContent = 'Subscribing...';
        
        try {
            // Call your Cloudflare Worker/API to save email
            const response = await fetch('/api/subscribe-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            
            if (response.ok) {
                successMessage.style.display = 'block';
                this.reset();
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            button.disabled = false;
            button.textContent = 'Notify Me';
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation on scroll (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards for fade-in effect
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
