document.addEventListener('DOMContentLoaded', () => {
    const btnAddObjetivo = document.getElementById('btnAddObjetivo');
    const modal = document.getElementById('modalObjetivo');
    const closeModal = document.getElementById('closeModal');
    const formObjetivo = document.getElementById('formObjetivo');
    const listaObjetivos = document.getElementById('listaObjetivos');

    let objetivos = [];

    btnAddObjetivo.addEventListener('click', () => {
        modal.classList.remove('hidden');
        formObjetivo.reset();
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

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
}


