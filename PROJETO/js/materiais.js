// js/materiais.js

document.addEventListener('DOMContentLoaded', () => {
    const btnAddCategoria = document.getElementById('btnAddCategoria');
    const modalCategoria = document.getElementById('modalCategoria');
    const closeModalCategoria = document.getElementById('closeModalCategoria');
    const formCategoria = document.getElementById('formCategoria');

    const btnAddMaterial = document.getElementById('btnAddMaterial');
    const modalMaterial = document.getElementById('modalMaterial');
    const closeModalMaterial = document.getElementById('closeModalMaterial');
    const formMaterial = document.getElementById('formMaterial');
    const categoriaSelect = document.getElementById('categoriaSelect');

    const listaCategorias = document.getElementById('listaCategorias');

    let categorias = [];

    // Abrir modal categoria
    btnAddCategoria.addEventListener('click', () => {
        modalCategoria.classList.remove('hidden');
        formCategoria.reset();
    });

    // Fechar modal categoria
    closeModalCategoria.addEventListener('click', () => {
        modalCategoria.classList.add('hidden');
    });

    modalCategoria.addEventListener('click', (e) => {
        if (e.target === modalCategoria) {
            modalCategoria.classList.add('hidden');
        }
    });

    // Abrir modal material
    btnAddMaterial.addEventListener('click', () => {
        if (categorias.length === 0) {
            alert('Adicione ao menos uma categoria antes de adicionar materiais.');
            return;
        }
        modalMaterial.classList.remove('hidden');
        formMaterial.reset();
        preencherSelectCategorias();
    });

    // Fechar modal material
    closeModalMaterial.addEventListener('click', () => {
        modalMaterial.classList.add('hidden');
    });

    modalMaterial.addEventListener('click', (e) => {
        if (e.target === modalMaterial) {
            modalMaterial.classList.add('hidden');
        }
    });

    // Adicionar categoria
    formCategoria.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = formCategoria.nomeCategoria.value.trim();
        if (nome.length === 0) {
            alert('Por favor, insira o nome da categoria.');
            return;
        }
        if (categorias.some(c => c.nome.toLowerCase() === nome.toLowerCase())) {
            alert('Categoria já existe.');
            return;
        }
        categorias.push({ id: Date.now(), nome, materiais: [] });
        renderCategorias();
        modalCategoria.classList.add('hidden');
    });

    // Adicionar material
    formMaterial.addEventListener('submit', (e) => {
        e.preventDefault();
        const categoriaId = categoriaSelect.value;
        const nomeMaterial = formMaterial.nomeMaterial.value.trim();
        if (nomeMaterial.length === 0) {
            alert('Por favor, insira o nome do material.');
            return;
        }
        const categoria = categorias.find(c => c.id.toString() === categoriaId);
        if (!categoria) {
            alert('Categoria inválida.');
            return;
        }
        if (categoria.materiais.some(m => m.toLowerCase() === nomeMaterial.toLowerCase())) {
            alert('Material já existe nessa categoria.');
            return;
        }
        categoria.materiais.push(nomeMaterial);
        renderCategorias();
        modalMaterial.classList.add('hidden');
    });

    // Renderiza categorias e seus materiais
    function renderCategorias() {
        listaCategorias.innerHTML = '';
        categorias.forEach(cat => {
            const li = document.createElement('li');
            li.classList.add('categoria-item');
            const titulo = document.createElement('h3');
            titulo.textContent = cat.nome;
            li.appendChild(titulo);

            if (cat.materiais.length > 0) {
                const ulMateriais = document.createElement('ul');
                ulMateriais.classList.add('materiais-lista');
                cat.materiais.forEach(mat => {
                    const liMat = document.createElement('li');
                    liMat.textContent = mat;
                    ulMateriais.appendChild(liMat);
                });
                li.appendChild(ulMateriais);
            } else {
                const p = document.createElement('p');
                p.textContent = 'Nenhum material adicionado.';
                li.appendChild(p);
            }

            listaCategorias.appendChild(li);
        });
    }

    // Preenche select do modal de material com categorias
    function preencherSelectCategorias() {
        categoriaSelect.innerHTML = '';
        categorias.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.nome;
            categoriaSelect.appendChild(option);
        });
    }
});
