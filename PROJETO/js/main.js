// js/main.js

// Protect private pages
const privatePages = [
    "dashboard.html", "objetivos.html", "materiais.html",
    "tarefas.html", "perfil.html", "conquistas.html",
    "notificacoes.html", "historico.html"
];

const currentPage = window.location.pathname.split("/").pop();

if (privatePages.includes(currentPage)) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = "login.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    // Pega o tema salvo, se não existir usa light-theme
    const savedTheme = localStorage.getItem('theme') || 'light-theme';

    // Aplica o tema
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(savedTheme);

    // Configura botão de toggle tema
    const toggleBtn = document.getElementById('toggleThemeBtn');
    if (toggleBtn) {
        toggleBtn.textContent = savedTheme === 'dark-theme' ? 'Alternar para Tema Claro' : 'Alternar para Tema Escuro';

        toggleBtn.addEventListener('click', () => {
            if (body.classList.contains('light-theme')) {
                body.classList.replace('light-theme', 'dark-theme');
                localStorage.setItem('theme', 'dark-theme');
                toggleBtn.textContent = 'Alternar para Tema Claro';
                showToast('Modo escuro ativado!');
            } else {
                body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme', 'light-theme');
                toggleBtn.textContent = 'Alternar para Tema Escuro';
                showToast('Modo claro ativado!');
            }
        });
    }
});

// Toast system
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.body.appendChild(toastContainer);

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

// Confirmation for critical actions
function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
        showToast("Ação confirmada com sucesso!");
    } else {
        showToast("Ação cancelada.");
    }
}

// Login simulation
function loginUser() {
    localStorage.setItem('isLoggedIn', 'true');
    showToast("Login realizado com sucesso!");
    window.location.href = "dashboard.html";
}

// Cadastro simulation
function registerUser() {
    localStorage.setItem('isLoggedIn', 'true');
    showToast("Cadastro realizado com sucesso!");
    window.location.href = "dashboard.html";
}

// Logout function
function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    showToast("Você saiu da conta.");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
}
