// js/notificacoes.js

document.addEventListener('DOMContentLoaded', () => {
  const notificacoes = document.querySelectorAll('.notificacao-card');

  notificacoes.forEach(notif => {
    notif.addEventListener('click', () => {
      if (notif.classList.contains('nao-lida')) {
        notif.classList.remove('nao-lida');
        notif.classList.add('lida');
      }
    });
  });
});
