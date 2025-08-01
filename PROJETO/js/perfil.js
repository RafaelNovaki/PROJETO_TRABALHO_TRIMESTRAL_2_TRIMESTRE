// js/perfil.js

document.addEventListener('DOMContentLoaded', () => {
    const formPerfil = document.getElementById('formPerfil');
    const toggleTema = document.getElementById('toggleTema');
    const labelTema = document.getElementById('labelTema');

    // Carregar dados fictícios do usuário - exemplo simples
    const usuario = {
        nome: "Usuário Teste",
        email: "teste@exemplo.com"
    };

    formPerfil.nomeUsuario.value = usuario.nome;
    formPerfil.emailUsuario.value = usuario.email;

    // Modo claro/escuro (sincronizar com main.js)
    // Carregar preferencia do localStorage
    const temaSalvo = localStorage.getItem('tema') || 'light';
    if (temaSalvo === 'dark') {
        document.body.classList.replace('light-theme', 'dark-theme');
        toggleTema.checked = true;
        labelTema.textContent = 'Modo Escuro';
    }

    toggleTema.addEventListener('change', () => {
        if (toggleTema.checked) {
            document.body.classList.replace('light-theme', 'dark-theme');
            labelTema.textContent = 'Modo Escuro';
            localStorage.setItem('tema', 'dark');
        } else {
            document.body.classList.replace('dark-theme', 'light-theme');
            labelTema.textContent = 'Modo Claro';
            localStorage.setItem('tema', 'light');
        }
    });

    formPerfil.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = formPerfil.nomeUsuario.value.trim();
        const email = formPerfil.emailUsuario.value.trim();
        const senhaAtual = formPerfil.senhaAtual.value;
        const novaSenha = formPerfil.novaSenha.value;
        const confirmarSenha = formPerfil.confirmarSenha.value;

        if (!nome || !email) {
            alert('Nome e email são obrigatórios.');
            return;
        }

        if (novaSenha !== confirmarSenha) {
            alert('A nova senha e a confirmação não coincidem.');
            return;
        }

        // Aqui você poderia salvar as alterações via backend
        alert('Alterações salvas com sucesso! (simulado)');
        formPerfil.senhaAtual.value = '';
        formPerfil.novaSenha.value = '';
        formPerfil.confirmarSenha.value = '';
    });
});
