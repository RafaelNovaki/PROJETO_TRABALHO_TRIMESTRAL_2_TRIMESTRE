document.addEventListener('DOMContentLoaded', () => {

  const conquistaCards = document.querySelectorAll('.conquista-card');

  conquistaCards.forEach(card => {
    if (!card.classList.contains('vazio')) {
      card.addEventListener('click', () => {
        alert(`Detalhes da conquista: ${card.querySelector('h3').textContent}`);
      });
    }
  });
});

