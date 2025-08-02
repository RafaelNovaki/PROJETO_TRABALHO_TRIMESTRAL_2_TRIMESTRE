document.addEventListener('DOMContentLoaded', () => {
    const btnAddTarefa = document.getElementById('btnAddTarefa');
    const modalTarefa = document.getElementById('modalTarefa');
    const closeModalTarefa = document.getElementById('closeModalTarefa');
    const formTarefa = document.getElementById('formTarefa');
    const modalTarefaTitle = document.getElementById('modalTarefaTitle');
    const listaTarefas = document.getElementById('listaTarefas');

    let tarefas = [];
    let editandoTarefaId = null;

    btnAddTarefa.addEventListener('click', () => {
        modalTarefa.classList.remove('hidden');
        modalTarefaTitle.textContent = 'Adicionar Nova Tarefa';
        formTarefa.reset();
        editandoTarefaId = null;
    });

    closeModalTarefa.addEventListener('click', () => {
        modalTarefa.classList.add('hidden');
    });

    modalTarefa.addEventListener('click', (e) => {
        if (e.target === modalTarefa) {
            modalTarefa.classList.add('hidden');
        }
    });

    formTarefa.addEventListener('submit', (e) => {
        e.preventDefault();

        const titulo = formTarefa.tituloTarefa.value.trim();
        const descricao = formTarefa.descricaoTarefa.value.trim();
        const prioridade = formTarefa.prioridadeTarefa.value;
        const status = formTarefa.statusTarefa.value;

        if (titulo === '') {
            alert('O título da tarefa é obrigatório.');
            return;
        }

        if (editandoTarefaId) {
            const index = tarefas.findIndex(t => t.id === editandoTarefaId);
            if (index !== -1) {
                tarefas[index] = { id: editandoTarefaId, titulo, descricao, prioridade, status };
            }
        } else {
            tarefas.push({
                id: Date.now(),
                titulo,
                descricao,
                prioridade,
                status
            });
        }

        renderTarefas();
        modalTarefa.classList.add('hidden');
    });

    function renderTarefas() {
        listaTarefas.innerHTML = '';

        if (tarefas.length === 0) {
            listaTarefas.innerHTML = '<p>Nenhuma tarefa cadastrada.</p>';
            return;
        }

        tarefas.forEach(tarefa => {
            const li = document.createElement('li');
            li.classList.add('tarefa-item');

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('tarefa-info');

            const titulo = document.createElement('h3');
            titulo.textContent = tarefa.titulo;
            infoDiv.appendChild(titulo);

            if(tarefa.descricao) {
                const descricao = document.createElement('p');
                descricao.textContent = tarefa.descricao;
                infoDiv.appendChild(descricao);
            }

            const prioridade = document.createElement('p');
            prioridade.innerHTML = `<span class="tarefa-prioridade">Prioridade:</span> ${tarefa.prioridade}`;
            infoDiv.appendChild(prioridade);

            const status = document.createElement('p');
            status.innerHTML = `<span class="tarefa-status">Status:</span> ${tarefa.status}`;
            infoDiv.appendChild(status);

            li.appendChild(infoDiv);

            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('tarefa-actions');

            const btnEditar = document.createElement('button');
            btnEditar.title = 'Editar';
            btnEditar.innerHTML = '✏️';
            btnEditar.addEventListener('click', () => abrirEdicao(tarefa.id));
            actionsDiv.appendChild(btnEditar);

            const btnExcluir = document.createElement('button');
            btnExcluir.title = 'Excluir';
            btnExcluir.innerHTML = '🗑️';
            btnExcluir.addEventListener('click', () => excluirTarefa(tarefa.id));
            actionsDiv.appendChild(btnExcluir);

            li.appendChild(actionsDiv);

            listaTarefas.appendChild(li);
        });
    }

    function abrirEdicao(id) {
        const tarefa = tarefas.find(t => t.id === id);
        if (!tarefa) return;

        modalTarefa.classList.remove('hidden');
        modalTarefaTitle.textContent = 'Editar Tarefa';
        formTarefa.tituloTarefa.value = tarefa.titulo;
        formTarefa.descricaoTarefa.value = tarefa.descricao;
        formTarefa.prioridadeTarefa.value = tarefa.prioridade;
        formTarefa.statusTarefa.value = tarefa.status;
        editandoTarefaId = id;
    }

    function excluirTarefa(id) {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            tarefas = tarefas.filter(t => t.id !== id);
            renderTarefas();
        }
    }

    renderTarefas();
});

function completeTask(id) {
    showToast(`Tarefa ${id} concluída!`);
}

