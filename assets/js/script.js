// Fonctionnalités :
// 1. Navigation active + bouton « haut de page »
// 2. Ouverture des cartes Compétences
// 3. Ouverture indépendante des cartes Projets
// 4. Envoi du formulaire de contact via fetch → Formspree
// 5. Défilement doux pour les ancres

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------
   * 1. Navigation active + bouton « Haut de page »
   * ----------------------------------------------------------*/
  const sections     = document.querySelectorAll('section[id]');
  const navLinks     = document.querySelectorAll('#navbar a');
  const backToTopBtn = document.querySelector('.back-to-top');

  function updateNav() {
    const pos = window.pageYOffset;
    let currentId = '';

    sections.forEach(sec => {
      if (pos >= sec.offsetTop - 300) currentId = sec.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.hash === `#${currentId}`);
    });

    backToTopBtn?.classList.toggle('active', pos > 300);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // état initial

  /* ------------------------------------------------------------
   * 2. Blocs Compétences 
   * ----------------------------------------------------------*/
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.skill-card').forEach(c => c.classList.add('is-open'));
    });
  });

  /* ------------------------------------------------------------
   * 3. Blocs Projets
   * ----------------------------------------------------------*/
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('a')) return; // clic sur un lien interne → on laisse faire
      card.classList.toggle('is-open');
    });
  });

  /* ------------------------------------------------------------
   * 4. Formulaire de contact
   * ----------------------------------------------------------*/
  const contactForm = document.getElementById('form-contact');

  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const endpoint = contactForm.action || 'https://formspree.io/f/manjjypg';

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          alert('Merci ! Votre message a bien été envoyé.');
          contactForm.reset();
        } else {
          alert("Oups ! Une erreur est survenue. Veuillez réessayer plus tard.");
        }
      } catch (err) {
        console.error(err);
        alert("Impossible d'envoyer le message. Vérifiez votre connexion ou réessayez plus tard.");
      }
    });
  }

  /* ------------------------------------------------------------
   * 5. Défilement 
   * ----------------------------------------------------------*/
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]:not([href="#"])');
    if (!link) return;

    const target = document.querySelector(link.hash);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    }
  });
});
