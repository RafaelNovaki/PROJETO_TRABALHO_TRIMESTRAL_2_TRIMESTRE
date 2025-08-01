// js/objetivos.js

document.addEventListener('DOMContentLoaded', () => {
    const btnAddObjetivo = document.getElementById('btnAddObjetivo');
    const modal = document.getElementById('modalObjetivo');
    const closeModal = document.getElementById('closeModal');
    const formObjetivo = document.getElementById('formObjetivo');
    const listaObjetivos = document.getElementById('listaObjetivos');

    // Array para guardar objetivos (simulação local)
    let objetivos = [];

    // Abrir modal
    btnAddObjetivo.addEventListener('click', () => {
        modal.classList.remove('hidden');
        formObjetivo.reset();
    });

    // Fechar modal
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Fechar modal clicando fora do conteúdo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Adicionar objetivo
    formObjetivo.addEventListener('submit', (e) => {
        e.preventDefault();
        const titulo = formObjetivo.tituloObjetivo.value.trim();
        const descricao = formObjetivo.descricaoObjetivo.value.trim();

        if (titulo.length === 0) {
            alert('Por favor, insira o título do objetivo.');
            return;
        }

        const novoObjetivo = {
            id: Date.now(),
            titulo,
            descricao
        };

        objetivos.push(novoObjetivo);
        renderObjetivos();
        modal.classList.add('hidden');
    });

    // Renderiza os objetivos na lista
    function renderObjetivos() {
        listaObjetivos.innerHTML = '';
        objetivos.forEach(obj => {
            const li = document.createElement('li');
            const titulo = document.createElement('h3');
            titulo.textContent = obj.titulo;
            const descricao = document.createElement('p');
            descricao.textContent = obj.descricao || '';
            li.appendChild(titulo);
            li.appendChild(descricao);
            listaObjetivos.appendChild(li);
        });
    }
});

function deleteObjective(id) {
    showToast(`Objetivo ${id} excluído!`);
    // Aqui você poderia remover o objetivo da lista
}

