// Menu Mobile Simple
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        if(navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = '#1a1a1a';
            navLinks.style.padding = '20px 0';
            navLinks.style.alignItems = 'center';
        }
    });
}

// Année du footer
document.getElementById('year').textContent = new Date().getFullYear();

// Active class sur la navigation au scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// --- Soumission du formulaire en AJAX sans quitter la page ---
const form = document.getElementById('contact-form');

if(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche le rechargement de la page
        
        const btn = form.querySelector('button[type="submit"]');
        const originalBtnText = btn.innerHTML;
        
        // Change le texte du bouton pendant l'envoi
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
        btn.disabled = true;

        const formData = new FormData(form);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                // Succès : Affiche le message de réussite
                btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
                btn.style.backgroundColor = '#28a745'; // Vert de succès
                btn.style.borderColor = '#28a745';
                form.reset(); // Vide le formulaire
                
                // Remet le bouton normal après 4 secondes
                setTimeout(() => {
                    btn.innerHTML = originalBtnText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.disabled = false;
                }, 4000);
            } else {
                // Erreur serveur Web3Forms
                console.error('Erreur:', data);
                btn.innerHTML = 'Erreur lors de l\'envoi';
                btn.style.backgroundColor = '#dc3545'; // Rouge d'erreur
                setTimeout(() => {
                    btn.innerHTML = originalBtnText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 4000);
            }
        })
        .catch(error => {
            console.error('Erreur réseau:', error);
            btn.innerHTML = 'Erreur réseau';
            btn.style.backgroundColor = '#dc3545';
            setTimeout(() => {
                btn.innerHTML = originalBtnText;
                btn.style.backgroundColor = '';
                btn.disabled = false;
            }, 4000);
        });
    });
}

